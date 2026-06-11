#!/bin/bash
# AI Learning Hub — 定时同步脚本
# cron 调用: 0 * * * * root bash /www/wwwroot/ds.xiaolu.ink/deploy/scripts/sync-cron.sh >> /www/wwwroot/ds.xiaolu.ink/logs/sync.log 2>&1

APP_DIR="/www/wwwroot/ds.xiaolu.ink"
SCRIPTS_DIR="$APP_DIR/deploy/scripts"
NODE_BIN="/root/.nvm/versions/node/v18.20.8/bin"
export PATH="$NODE_BIN:$PATH"
export DATABASE_URL="mysql://ds:brFHxS2Sa7J2XapM@127.0.0.1:3306/ds"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
mkdir -p "$APP_DIR/logs"

echo "═══════════════════════════════════════"
echo "[$TIMESTAMP] Sync Start"
echo "═══════════════════════════════════════"

cd "$SCRIPTS_DIR"

for script in sync-github.ts sync-news.ts sync-x.ts sync-linuxdo.ts sync-sentiment.ts; do
    echo "[$TIMESTAMP] ▶ $script..."
    if npx tsx "$SCRIPTS_DIR/$script" 2>&1; then
        echo "[$TIMESTAMP] ✅ $script OK"
    else
        echo "[$TIMESTAMP] ⚠️  $script failed"
    fi
done

# 清理 7 天前的旧日志
find "$APP_DIR/logs" -name "*.log" -mtime +7 -delete 2>/dev/null || true

echo "[$TIMESTAMP] ✅ Done"
echo ""
