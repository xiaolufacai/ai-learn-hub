#!/bin/bash
# ==============================================
# AI Learning Hub — 一键部署
# 用法: bash deploy.sh
# ==============================================
set -e

PROJECT_DIR="/www/wwwroot/ds.xiaolu.ink"
APP_DIR="$PROJECT_DIR/deploy/nextjs"
SCRIPTS_DIR="$PROJECT_DIR/deploy/scripts"
NODE_BIN="/root/.nvm/versions/node/v18.20.8/bin"
export PATH="$NODE_BIN:$PATH"
SERVICE_NAME="ai-hub"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; }

echo "=========================================="
echo "  AI Learning Hub 部署"
echo "=========================================="
log "Node.js $(node -v)"
echo ""

# ===== 1. 拉取最新代码 =====
echo "📥 拉取代码..."
cd "$PROJECT_DIR"
git pull 2>&1 | tail -3
log "代码已更新"

# ===== 2. .env =====
if [ ! -f "$APP_DIR/.env" ]; then
    echo "📝 创建 .env..."
    cat > "$APP_DIR/.env" << 'EOF'
DATABASE_URL=mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds
EOF
fi
log ".env 就绪"

# ===== 3. 安装依赖（仅 package.json 变动时） =====
PKG_HASH=$(md5sum "$APP_DIR/package.json" 2>/dev/null | cut -d' ' -f1)
CACHE_FILE="$PROJECT_DIR/.pkg_hash"

if [ -f "$CACHE_FILE" ] && [ "$(cat "$CACHE_FILE")" = "$PKG_HASH" ] && [ -d "$APP_DIR/node_modules" ]; then
    log "依赖未变动，跳过安装"
else
    echo "📦 安装依赖（package.json 有变动）..."
    cd "$APP_DIR"
    NODE_OPTIONS="--max-old-space-size=256" npm install --prefer-offline --no-audit --no-fund 2>&1 | tail -5
    echo "$PKG_HASH" > "$CACHE_FILE"
    log "依赖安装完成"
fi

# ===== 4. 数据库 =====
echo "🗄️  同步数据库..."
cd "$APP_DIR"
npx prisma generate 2>&1 | tail -2
npx prisma db push 2>&1 | tail -2
log "数据库就绪"

# ===== 5. 初始化数据（仅首次） =====
NEWS_COUNT=$(node -e "
const{PrismaClient}=require('@prisma/client');
(async()=>{
  const p=new PrismaClient();
  const c=await p.aiNews.count();
  console.log(c);
  await p.\$disconnect();
})().catch(()=>console.log(0));
" 2>/dev/null || echo "0")

if [ "$NEWS_COUNT" = "0" ]; then
    echo "📥 导入初始数据..."
    cd "$SCRIPTS_DIR"
    NODE_OPTIONS="--max-old-space-size=256" npm install --silent --prefer-offline --no-audit --no-fund 2>&1 | tail -2
    npx prisma generate --schema=./prisma/schema.prisma 2>&1 | tail -2
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-news.ts
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-x.ts
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-linuxdo.ts
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-github.ts
    cd "$APP_DIR"
    log "初始数据导入完成"
else
    log "数据库已有 $NEWS_COUNT 条新闻"
fi

# ===== 6. 构建（低内存：设 swap + 单线程） =====
echo "🔨 构建..."
cd "$APP_DIR"

# 临时 swap（如 server 内存 < 1GB）
if [ ! -f /swapfile ]; then
    fallocate -l 512M /swapfile 2>/dev/null && chmod 600 /swapfile && mkswap /swapfile 2>/dev/null && swapon /swapfile && log "已添加 512MB swap" || true
fi

# 关键：单线程 + 低内存避免 SIGBUS
NODE_OPTIONS="--max-old-space-size=192" \
NEXT_TELEMETRY_DISABLED=1 \
CI=true \
npm run build
BUILD_EXIT=$?

if [ "$BUILD_EXIT" -ne 0 ]; then
    echo ""
    err "构建失败 (exit=$BUILD_EXIT)，可能是内存不足。尝试:"
    echo "   free -h                       查看内存"
    echo "   swapon /swapfile              启用临时 swap"
    echo "   NODE_OPTIONS=--max-old-space-size=192 npm run build"
    exit 1
fi
log "构建完成"

# ===== 7. 安装 systemd 服务 =====
echo "🚀 启动服务..."
cat > /etc/systemd/system/$SERVICE_NAME.service << SERVICEEOF
[Unit]
Description=AI Learning Hub
After=network.target

[Service]
Type=simple
User=root
ExecStart=/bin/bash -c "cd $APP_DIR && PATH=$NODE_BIN:\$PATH NODE_ENV=production PORT=3000 DATABASE_URL=mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds $NODE_BIN/npm start"
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICEEOF

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"

sleep 5
echo ""
systemctl status "$SERVICE_NAME" --no-pager -l

# ===== 8. 验证 =====
HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
echo ""
if [ "$HTTP" = "200" ] || [ "$HTTP" = "304" ]; then
    echo "✅ 部署成功 — http://localhost:3000 (HTTP $HTTP)"
else
    err "HTTP $HTTP — 查看日志: journalctl -u $SERVICE_NAME -n 30"
    exit 1
fi
