#!/usr/bin/env node
/**
 * AI Learning Hub — Master Sync Script
 *
 * Usage:
 *   DATABASE_URL=mysql://... npx tsx sync-all.ts              # Run all syncs
 *   DATABASE_URL=mysql://... npx tsx sync-all.ts --github-only # Only sync GitHub
 *   DATABASE_URL=mysql://... npx tsx sync-all.ts --full        # Full sync including X & Linux.do
 */

import { execSync } from "child_process";
import path from "path";

const SCRIPTS_DIR = __dirname;

function log(msg: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${msg}`);
}

function runStep(name: string, script: string): boolean {
  log(`▶ ${name}...`);
  try {
    execSync(`npx tsx ${path.join(SCRIPTS_DIR, script)}`, {
      cwd: SCRIPTS_DIR,
      stdio: "inherit",
      timeout: 120000,
      env: { ...process.env },
    });
    log(`✅ ${name} — done`);
    return true;
  } catch (err: any) {
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
  ok = runStep("GitHub Trending", "sync-github.ts") && ok;

  if (githubOnly) {
    log("═══ Sync complete (--github-only) ═══");
    process.exit(ok ? 0 : 1);
  }

  // Step 2: AI News
  ok = runStep("AI News", "sync-news.ts") && ok;

  // Step 3: X (Twitter) posts
  ok = runStep("X Posts", "sync-x.ts") && ok;

  // Step 4: Linux.do posts
  ok = runStep("Linux.do Posts", "sync-linuxdo.ts") && ok;

  log("═══════════════════════════════════════");
  log(`Sync complete — ${ok ? "ALL OK" : "SOME FAILURES"}`);
  log("═══════════════════════════════════════");

  process.exit(ok ? 0 : 1);
}

main();
