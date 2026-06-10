#!/bin/bash
# ==============================================
# AI Learning Hub V2 — 宝塔/通用 Nginx 反代 (w.sh)
# 用法: bash w.sh
# ==============================================
set -e

DOMAIN="ds.xiaolu.ink"
APP_PORT="3000"

echo "═══════════════════════════════════════"
echo "  Nginx 反代: $DOMAIN → :$APP_PORT"
echo "═══════════════════════════════════════"

# ============================
# 1. 自动检测 nginx
# ============================
if [ -f /www/server/nginx/sbin/nginx ]; then
    NGINX_BIN="/www/server/nginx/sbin/nginx"
    # 宝塔真正的 vhost 目录是这个
    NGINX_VHOST="/www/server/panel/vhost/nginx"
    echo "✅ 宝塔 nginx: $NGINX_BIN"
    echo "   vhost 目录: $NGINX_VHOST"
elif [ -f /usr/sbin/nginx ]; then
    NGINX_BIN="/usr/sbin/nginx"
    NGINX_VHOST="/etc/nginx/conf.d"
    echo "✅ 系统 nginx"
else
    echo "❌ 未找到 nginx"
    exit 1
fi

# ============================
# 2. 写配置
# ============================
CONF_FILE="$NGINX_VHOST/$DOMAIN.conf"
mkdir -p "$NGINX_VHOST"

echo ""
echo "⚙️  写入: $CONF_FILE"

cat > "$CONF_FILE" << EOF
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
EOF

# 同时删掉其他位置可能冲突的配置
rm -f /www/server/nginx/conf/vhost/$DOMAIN.conf 2>/dev/null || true
echo "✅ 配置已写入，冲突配置已清理"

# ============================
# 3. 重载
# ============================
echo ""
if $NGINX_BIN -t 2>&1; then
    $NGINX_BIN -s reload
    echo "✅ nginx 已重载"
else
    echo "❌ 配置有误"
    exit 1
fi

# ============================
# 4. 验证
# ============================
echo ""
echo "🔍 验证..."
sleep 2

HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$APP_PORT 2>/dev/null || echo "000")
[ "$HTTP" = "200" ] && echo "✅ Next.js OK" || echo "❌ Next.js HTTP $HTTP"

HTTP2=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN 2>/dev/null || echo "000")
[ "$HTTP2" = "200" ] && echo "✅ http://$DOMAIN OK" || echo "⚠️  域名 HTTP $HTTP2"

echo ""
echo "═══════════════════════════════════════"
echo "  ✅ 完成: http://$DOMAIN"
echo "═══════════════════════════════════════"
