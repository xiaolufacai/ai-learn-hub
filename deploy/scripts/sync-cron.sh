#!/bin/bash
APP_DIR="/www/wwwroot/ds.xiaolu.ink"
NODE="/usr/local/bin/node"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
mkdir -p "$APP_DIR/logs"

echo "═══════════════════════════════════════"
echo "[$TIMESTAMP] Sync Start"
echo "═══════════════════════════════════════"

for script in sync-github.js sync-news.js sync-x.js sync-linuxdo.js; do
    echo "[$TIMESTAMP] ▶ $script..."
    if $NODE "$APP_DIR/scripts/$script" 2>&1; then
        echo "[$TIMESTAMP] ✅ $script OK"
    else
        echo "[$TIMESTAMP] ⚠️  $script failed"
    fi
done

find "$APP_DIR/logs" -name "*.log" -mtime +7 -delete 2>/dev/null || true
echo "[$TIMESTAMP] ✅ Done"
echo ""
