#!/bin/bash
set -e
APP_DIR="/www/wwwroot/ds.xiaolu.ink"
LOG_DIR="$APP_DIR/logs"

echo "═══════════════════════════════════════"
echo "  AI Learning Hub V2 — Deploy"
echo "═══════════════════════════════════════"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install Node.js 18+ first."
    exit 1
fi
echo "✅ Node $(node -v)"

mkdir -p "$LOG_DIR"

echo "📦 Installing dependencies..."
cd "$APP_DIR/nextjs"
npm install 2>&1 | tail -3

echo "📊 Data files:"
for f in ai-news.json github-projects.json ai-tools.json mcp-servers.json ai-books.json knowledge-base.json x-posts.json linuxdo-posts.json; do
    fp="$APP_DIR/nextjs/data/$f"
    if [ -f "$fp" ]; then echo "  ✅ $f ($(wc -c < "$fp") bytes)"; else echo "  ⚠️  $f — missing"; fi
done

echo "🔨 Building Next.js..."
npm run build 2>&1 | tail -5

echo ""
echo "═══════════════════════════════════════"
echo "  ✅ Deploy OK"
echo "  Start: cd $APP_DIR/nextjs && npm start"
echo "  systemd: sudo cp $APP_DIR/scripts/ai-hub.service /etc/systemd/system/"
echo "  Cron: 0 * * * * $APP_DIR/scripts/sync-cron.sh >> $LOG_DIR/sync.log 2>&1"
echo "═══════════════════════════════════════"
