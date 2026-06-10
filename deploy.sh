#!/bin/bash
#
# AI Learning Hub — 一键部署脚本
# 前提：已完成 git clone 到 /www/wwwroot/ds.xiaolu.ink
# 用法：bash deploy.sh
#

set -e

# ========== 配置 ==========
PROJECT_DIR="/www/wwwroot/ds.xiaolu.ink"
APP_DIR="$PROJECT_DIR/deploy/nextjs"
SCRIPTS_DIR="$PROJECT_DIR/deploy/scripts"
NODE_BIN="/root/.nvm/versions/node/v18.20.8/bin"
export PATH="$NODE_BIN:$PATH"

NODE_VER=$(node -v)
echo "✅ Node.js $NODE_VER"
echo ""

# ========== 1. 创建 .env ==========
if [ ! -f "$APP_DIR/.env" ]; then
    echo "📝 创建 .env..."
    cat > "$APP_DIR/.env" << 'EOF'
DATABASE_URL=mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds
EOF
fi
echo "✅ .env 已就绪"

# ========== 2. 安装依赖（仅 package.json 变动时） ==========
PKG_HASH=$(md5sum "$APP_DIR/package.json" 2>/dev/null | cut -d' ' -f1)
CACHE_FILE="$PROJECT_DIR/.pkg_hash"

if [ -f "$CACHE_FILE" ] && [ "$(cat "$CACHE_FILE")" = "$PKG_HASH" ] && [ -d "$APP_DIR/node_modules" ]; then
    echo "✅ 依赖未变动，跳过安装"
else
    echo "📦 安装依赖（package.json 已变动）..."
    cd "$APP_DIR"
    NODE_OPTIONS="--max-old-space-size=256" npm install --prefer-offline --no-audit --no-fund 2>&1 | tail -5
    echo "$PKG_HASH" > "$CACHE_FILE"
    echo "✅ 安装完成"
fi

# ========== 3. 生成 Prisma + 同步表结构 ==========
echo "🗄️  同步数据库..."
cd "$APP_DIR"
npx prisma generate
npx prisma db push
echo "✅ 数据库表结构已同步"

# ========== 4. 初始化数据（仅空库时） ==========
echo "🔍 检查数据..."
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
    NODE_OPTIONS="--max-old-space-size=256" npm install --silent --prefer-offline --no-audit --no-fund 2>&1 | tail -3
    npx prisma generate --schema=./prisma/schema.prisma 2>&1 | tail -3
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-news.ts
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-x.ts
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-linuxdo.ts
    DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds" npx tsx sync-github.ts
    cd "$APP_DIR"
    echo "✅ 初始数据导入完成"
else
    echo "✅ 数据库已有 $NEWS_COUNT 条新闻，跳过初始化"
fi

# ========== 5. 权限 ==========
chown -R www:www "$PROJECT_DIR" 2>/dev/null || true

# ========== 6. 构建 ==========
echo "🔨 构建项目..."
cd "$APP_DIR"
NODE_OPTIONS="--max-old-space-size=384" npm run build 2>&1 | tail -10

# ========== 7. 安装 systemd 服务并启动 ==========
echo "🚀 启动服务..."
bash "$SCRIPTS_DIR/sys.sh"

echo ""
echo "=========================================="
echo "✅ 部署完成！"
echo ""
echo "  常用命令:"
echo "    systemctl status ai-hub    查看状态"
echo "    journalctl -u ai-hub -f    查看日志"
echo "    systemctl restart ai-hub   重启服务"
echo "    bash deploy.sh             重新部署"
echo "=========================================="
