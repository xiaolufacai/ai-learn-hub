#!/bin/bash
# ==============================================
# AI Learning Hub V2 — systemd 服务安装/修复
# 用法: bash sys.sh
# ==============================================

APP_DIR="/www/wwwroot/ds.xiaolu.ink"

cat > /etc/systemd/system/ai-hub.service << EOF
[Unit]
Description=AI Learning Hub V2
After=network.target

[Service]
Type=simple
User=www
WorkingDirectory=$APP_DIR/nextjs
ExecStart=/usr/local/bin/npm start
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable ai-hub
systemctl restart ai-hub

sleep 5
systemctl status ai-hub --no-pager -l

echo ""
HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
if [ "$HTTP" = "200" ]; then
    echo "✅ 网站运行正常: http://localhost:3000"
else
    echo "⚠️  HTTP $HTTP"
    echo "tail -20 $APP_DIR/logs/server.error.log"
    tail -20 "$APP_DIR/logs/server.error.log" 2>/dev/null || true
fi
