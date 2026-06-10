#!/bin/bash
# ==============================================
# AI Learning Hub V2 — 一条龙部署 (s.sh)
# 用法:
#   1. 上传 s.sh + ai-hub.tar.gz 到服务器同目录
#   2. bash s.sh
#   3. 打开 http://ds.xiaolu.ink
# ==============================================
set -e

APP_DIR="/www/wwwroot/ds.xiaolu.ink"
NODE_BIN="/root/.nvm/versions/node/v18.20.8/bin"
DOMAIN="ds.xiaolu.ink"
APP_PORT="3000"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SELF="$0"

# 如果传了 --export 参数，把嵌入的 tar.gz 导出
if [ "$1" = "--export" ]; then
    TAR_OUT="${2:-$SCRIPT_DIR/ai-hub.tar.gz}"
    sed '1,/^__ARCHIVE_BELOW__$/d' "$SELF" > "$TAR_OUT"
    echo "✅ 已导出: $TAR_OUT ($(wc -c < "$TAR_OUT") bytes)"
    exit 0
fi

echo ""
echo "  ╔═══════════════════════════════════════╗"
echo "  ║   AI Learning Hub V2 — 一条龙部署     ║"
echo "  ╚═══════════════════════════════════════╝"
echo ""
echo "  目录: $APP_DIR"
echo "  域名: $DOMAIN → :$APP_PORT"
echo ""

# ===========================================
# 1. 检测 Node.js
# ===========================================
echo "━━━ 1/9 检测 Node.js ━━━"

if [ ! -f "$NODE_BIN/node" ]; then
    NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    NODE_BIN="$(dirname "$(which node 2>/dev/null || echo '')")"
    if [ -z "$NODE_BIN" ] || [ ! -f "$NODE_BIN/node" ]; then
        echo "❌ 未安装 Node.js，请先安装:"
        echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
        echo "   source ~/.bashrc && nvm install 18"
        exit 1
    fi
fi
export PATH="$NODE_BIN:$PATH"
echo "✅ Node $(node -v) | npm $(npm -v)"

# ===========================================
# 2. 解压项目
# ===========================================
echo ""
echo "━━━ 2/9 解压项目 ━━━"

if [ ! -f "$TAR_FILE" ]; then
    echo "❌ 这不是自解压脚本，请用 deploy-all.sh"
    echo "   或先导出: bash $0 --export"
    exit 1
fi

echo "📦 解压内嵌项目 → $APP_DIR"
sed '1,/^__ARCHIVE_BELOW__$/d' "$SELF" | tar -xz -C "$APP_DIR"
mkdir -p "$APP_DIR/logs"
echo "✅ 解压完成"

# ===========================================
# 3. 安装依赖
# ===========================================
echo ""
echo "━━━ 3/9 安装依赖 ━━━"

cd "$APP_DIR/nextjs"
npm install 2>&1 | tail -3
echo "✅ 依赖安装完成"

# ===========================================
# 4. 构建 Next.js
# ===========================================
echo ""
echo "━━━ 4/9 构建 Next.js ━━━"

npm run build 2>&1 | tail -5
echo "✅ 构建完成"

# ===========================================
# 5. systemd 服务
# ===========================================
echo ""
echo "━━━ 5/9 配置 systemd 服务 ━━━"

cat > /etc/systemd/system/ai-hub.service << SYSTEMD
[Unit]
Description=AI Learning Hub V2
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$APP_DIR/nextjs
ExecStart=$NODE_BIN/npm start
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=$APP_PORT

[Install]
WantedBy=multi-user.target
SYSTEMD

systemctl daemon-reload
systemctl enable ai-hub
systemctl restart ai-hub
sleep 5

if systemctl is-active --quiet ai-hub; then
    echo "✅ ai-hub 服务已启动"
else
    echo "⚠️  ai-hub 未成功启动，查看: systemctl status ai-hub"
fi

# ===========================================
# 6. 定时同步 cron
# ===========================================
echo ""
echo "━━━ 6/9 配置每小时同步 ━━━"

cat > /etc/cron.d/ai-hub-sync << CRON
SHELL=/bin/bash
0 * * * * root $NODE_BIN/node $APP_DIR/scripts/sync-cron.sh >> $APP_DIR/logs/sync.log 2>&1
CRON

echo "✅ cron 已配置 (每小时同步 GitHub/X/Linux.do/新闻)"

# ===========================================
# 7. 检测 nginx 路径
# ===========================================
echo ""
echo "━━━ 7/9 检测 Nginx ━━━"

if [ -f /www/server/nginx/sbin/nginx ]; then
    NGINX_BIN="/www/server/nginx/sbin/nginx"
    NGINX_VHOST="/www/server/panel/vhost/nginx"
    echo "✅ 宝塔 nginx: $NGINX_BIN"
elif [ -f /usr/sbin/nginx ]; then
    NGINX_BIN="/usr/sbin/nginx"
    NGINX_VHOST="/etc/nginx/conf.d"
    echo "✅ 系统 nginx"
else
    echo "⚠️  未安装 nginx，跳过反代配置"
    echo "   手动安装: apt install -y nginx"
    NGINX_BIN=""
fi

# ===========================================
# 8. 配置 Nginx 反代
# ===========================================
if [ -n "$NGINX_BIN" ]; then
    echo ""
    echo "━━━ 8/9 配置 Nginx 反代 ━━━"

    CONF_FILE="$NGINX_VHOST/$DOMAIN.conf"
    mkdir -p "$NGINX_VHOST"

    cat > "$CONF_FILE" << NGINX
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

    # 删除可能冲突的旧配置
    rm -f /www/server/nginx/conf/vhost/$DOMAIN.conf 2>/dev/null || true

    if $NGINX_BIN -t 2>&1; then
        $NGINX_BIN -s reload
        echo "✅ Nginx 反代生效: $DOMAIN → :$APP_PORT"
    else
        echo "❌ Nginx 配置有误"
    fi
else
    echo ""
    echo "━━━ 8/9 Nginx 反代 ━━━ 跳过 (未安装 nginx)"
fi

# ===========================================
# 9. 验证
# ===========================================
echo ""
echo "━━━ 9/9 验证 ━━━"

sleep 3
HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$APP_PORT 2>/dev/null || echo "000")
if [ "$HTTP" = "200" ]; then
    echo "✅ Next.js 运行正常 (http://127.0.0.1:$APP_PORT)"
else
    echo "❌ Next.js 未响应 (HTTP $HTTP)"
    echo "   查看日志: tail -50 $APP_DIR/logs/server.error.log"
    tail -20 "$APP_DIR/logs/server.error.log" 2>/dev/null || true
fi

if [ -n "$NGINX_BIN" ]; then
    HTTP2=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN 2>/dev/null || echo "000")
    if [ "$HTTP2" = "200" ]; then
        echo "✅ 域名可访问: http://$DOMAIN"
    else
        echo "⚠️  域名返回 HTTP $HTTP2"
    fi
fi

# ===========================================
# 完成
# ===========================================
echo ""
echo "  ╔═══════════════════════════════════════╗"
echo "  ║   🎉 部署完成！                       ║"
echo "  ║                                      ║"
echo "  ║   网站: http://$DOMAIN               ║"
echo "  ║   重启: systemctl restart ai-hub       ║"
echo "  ║   日志: tail -f $APP_DIR/logs/server.log ║"
echo "  ║   同步: $NODE_BIN/node $APP_DIR/scripts/sync-cron.sh ║"
echo "  ╚═══════════════════════════════════════╝"
echo ""
