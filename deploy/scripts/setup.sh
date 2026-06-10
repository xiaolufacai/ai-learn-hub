#!/bin/bash
# ==============================================
# AI Learning Hub V2 — 一键部署 (ds.xiaolu.ink)
# ==============================================
set -e

APP_DIR="/www/wwwroot/ds.xiaolu.ink"
NODE_BIN="/root/.nvm/versions/node/v18.20.8/bin"

echo "═══════════════════════════════════════"
echo "  AI Learning Hub V2 — 一键部署"
echo "  $APP_DIR"
echo "═══════════════════════════════════════"
echo ""

# --- 1. 检查 Node ---
export PATH="$NODE_BIN:$PATH"
if ! command -v node &> /dev/null; then
    echo "❌ 找不到 node，请先安装 nvm + Node 18"
    exit 1
fi
echo "✅ Node $(node -v)  |  npm $(npm -v)"

# --- 2. 把 node/npm 链接到系统路径（www 用户可访问） ---
echo "🔗 链接 node/npm 到 /usr/local/bin..."
sudo ln -sf "$NODE_BIN/node" /usr/local/bin/node
sudo ln -sf "$NODE_BIN/npm" /usr/local/bin/npm
echo "✅ node: $(/usr/local/bin/node -v)"

# --- 3. 创建目录 + 权限 ---
mkdir -p "$APP_DIR/logs"
chown -R www:www "$APP_DIR" 2>/dev/null || true
echo "✅ 目录就绪"

# --- 4. 安装依赖 ---
echo ""
echo "📦 安装依赖..."
cd "$APP_DIR/nextjs"
/usr/local/bin/npm install 2>&1 | tail -5

# --- 5. 数据检查 ---
echo ""
echo "📊 数据文件:"
for f in ai-news.json github-projects.json ai-tools.json mcp-servers.json ai-books.json knowledge-base.json x-posts.json linuxdo-posts.json; do
    if [ -f "$APP_DIR/nextjs/data/$f" ]; then
        echo "  ✅ $f ($(wc -c < "$APP_DIR/nextjs/data/$f") bytes)"
    else
        echo "  ⚠️  $f 缺失"
    fi
done

# --- 6. 构建 ---
echo ""
echo "🔨 构建 Next.js..."
/usr/local/bin/npm run build 2>&1 | tail -8

# --- 7. 确保 www 用户有 .next 缓存权限 ---
chown -R www:www "$APP_DIR/nextjs" 2>/dev/null || true

# --- 8. 写 systemd 服务 ---
echo ""
echo "⚙️  配置 systemd 服务..."
sudo tee /etc/systemd/system/ai-hub.service > /dev/null << SYSTEMD
[Unit]
Description=AI Learning Hub V2
After=network.target

[Service]
Type=simple
User=www
WorkingDirectory=$APP_DIR/nextjs
ExecStart=/usr/local/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=PATH=/usr/local/bin:/usr/bin:/bin
StandardOutput=append:$APP_DIR/logs/server.log
StandardError=append:$APP_DIR/logs/server.error.log
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
SYSTEMD

# --- 9. 写定时同步 ---
sudo tee /etc/cron.d/ai-hub-sync > /dev/null << CRON
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin
0 * * * * www $APP_DIR/scripts/sync-cron.sh >> $APP_DIR/logs/sync.log 2>&1
CRON

# --- 10. 启动 ---
echo ""
echo "🚀 启动服务..."
sudo systemctl daemon-reload
sudo systemctl enable ai-hub
sudo systemctl restart ai-hub

sleep 3
sudo systemctl status ai-hub --no-pager -l
echo ""

# --- 11. 验证 ---
sleep 5
echo "🔍 验证..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ 网站运行正常: http://localhost:3000"
else
    echo "⚠️  HTTP $HTTP_CODE，查看日志:"
    echo "   tail -50 $APP_DIR/logs/server.error.log"
    tail -20 "$APP_DIR/logs/server.error.log" 2>/dev/null || echo "   (暂无日志)"
fi

echo ""
echo "═══════════════════════════════════════"
echo "  ✅ 部署完成"
echo ""
echo "  网站:    http://localhost:3000"
echo "  日志:    tail -f $APP_DIR/logs/server.log"
echo "  错误:    tail -f $APP_DIR/logs/server.error.log"
echo "  重启:    sudo systemctl restart ai-hub"
echo "  状态:    sudo systemctl status ai-hub"
echo "  同步:    bash $APP_DIR/scripts/sync-cron.sh"
echo "═══════════════════════════════════════"
