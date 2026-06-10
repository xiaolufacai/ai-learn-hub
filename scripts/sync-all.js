#!/usr/bin/env node
/**
 * AI Learning Hub — Master Sync Script
 *
 * Usage:
 *   node scripts/sync-all.js              # Run all syncs
 *   node scripts/sync-all.js --github-only # Only sync GitHub
 *   node scripts/sync-all.js --full        # Full sync including X & Linux.do
 */

const { execSync } = require("child_process");
const path = require("path");

const SCRIPTS_DIR = __dirname;
const LOG_FILE = path.join(SCRIPTS_DIR, "..", "sync.log");

function log(msg) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${msg}`;
  console.log(line);
}

function runStep(name, command) {
  log(`▶ ${name}...`);
  try {
    execSync(command, { cwd: SCRIPTS_DIR, stdio: "inherit", timeout: 120000 });
    log(`✅ ${name} — done`);
    return true;
  } catch (err) {
    log(`❌ ${name} — failed: ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const githubOnly = args.includes("--github-only");
  const fullSync = args.includes("--full");

  log("═══════════════════════════════════════");
  log("AI Learning Hub — Data Sync Start");
  log("═══════════════════════════════════════");

  let ok = true;

  // Step 1: GitHub Trending (always run)
  ok = runStep("GitHub Trending", "node sync-github.js") && ok;

  if (githubOnly) {
    log("═══ Sync complete (--github-only) ═══");
    process.exit(ok ? 0 : 1);
  }

  // Step 2: AI News (regenerate with fresh timestamps)
  ok = runStep("AI News", "node sync-news.js") && ok;

  // Step 3: X (Twitter) posts
  ok = runStep("X Posts", "node sync-x.js") && ok;

  // Step 4: Linux.do posts
  ok = runStep("Linux.do Posts", "node sync-linuxdo.js") && ok;

  log("═══════════════════════════════════════");
  log(`Sync complete — ${ok ? "ALL OK" : "SOME FAILURES"}`);
  log("═══════════════════════════════════════");

  process.exit(ok ? 0 : 1);
}

main();
