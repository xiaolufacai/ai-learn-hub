#!/bin/bash
# ==============================================
# AI Learning Hub — systemd 服务安装/重启
# 用法: bash sys.sh
# ==============================================

APP_DIR="/www/wwwroot/ds.xiaolu.ink/deploy/nextjs"
NODE_BIN="/root/.nvm/versions/node/v18.20.8/bin"

cat > /etc/systemd/system/ai-hub.service << EOF
[Unit]
Description=AI Learning Hub
After=network.target

[Service]
Type=simple
User=www
WorkingDirectory=$APP_DIR
Environment=PATH=$NODE_BIN:/usr/local/bin:/usr/bin:/bin
ExecStart=$NODE_BIN/npm start
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=DATABASE_URL=mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds

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
if [ "$HTTP" = "200" ] || [ "$HTTP" = "304" ]; then
    echo "✅ 网站运行正常: http://localhost:3000 (HTTP $HTTP)"
else
    echo "⚠️  HTTP $HTTP — 检查日志: journalctl -u ai-hub -n 30"
fi
