@echo off
REM ============================================
REM AI Learning Hub — Hourly Sync (Windows)
REM ============================================
REM Place this file anywhere and point Task Scheduler at it.
REM
REM Setup via Task Scheduler:
REM   1. Open "Task Scheduler" (taskschd.msc)
REM   2. Create Basic Task → Name: "AI-Hub-Hourly-Sync"
REM   3. Trigger: Daily, repeat every 1 hour
REM   4. Action: Start a program → this .bat file
REM   5. Finish
REM
REM Or via command line (run as Administrator):
REM   schtasks /create /tn "AI-Hub-Hourly-Sync" /tr "D:\www\ai-news\scripts\sync-hourly.bat" /sc hourly /mo 1 /f
REM ============================================

set SCRIPT_DIR=%~dp0
set LOG_FILE=%SCRIPT_DIR%..\sync.log

echo [%date% %time%] Starting hourly sync... >> "%LOG_FILE%"
cd /d "%SCRIPT_DIR%.."

REM Run GitHub sync (real API data)
node scripts\sync-github.js >> "%LOG_FILE%" 2>&1

echo [%date% %time%] Sync complete. >> "%LOG_FILE%"
echo. >> "%LOG_FILE%"

REM Keep last 100 lines of log
powershell -Command "Get-Content '%LOG_FILE%' -Tail 100 | Set-Content '%LOG_FILE%.tmp'; Move-Item '%LOG_FILE%.tmp' '%LOG_FILE%' -Force"
