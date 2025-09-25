@echo off
echo.
echo 🏆 WAKSOCCER - TESTING ALL LEAGUE PAGES
echo =====================================
echo.
echo 🔄 Deployment triggered! Testing in 30 seconds...
timeout /t 30 /nobreak > nul
echo.
echo 🎯 TESTING LEAGUE NAVIGATION:
echo.

echo Testing Premier League...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer-final.vercel.app/league/premier-league' -Method Get -TimeoutSec 10; Write-Host '✅ Premier League: Working' -ForegroundColor Green } catch { Write-Host '❌ Premier League: Not working yet' -ForegroundColor Red }"

echo Testing La Liga...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer-final.vercel.app/league/la-liga' -Method Get -TimeoutSec 10; Write-Host '✅ La Liga: Working' -ForegroundColor Green } catch { Write-Host '❌ La Liga: Not working yet' -ForegroundColor Red }"

echo Testing Serie A...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer-final.vercel.app/league/serie-a' -Method Get -TimeoutSec 10; Write-Host '✅ Serie A: Working' -ForegroundColor Green } catch { Write-Host '❌ Serie A: Not working yet' -ForegroundColor Red }"

echo Testing Bundesliga...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer-final.vercel.app/league/bundesliga' -Method Get -TimeoutSec 10; Write-Host '✅ Bundesliga: Working' -ForegroundColor Green } catch { Write-Host '❌ Bundesliga: Not working yet' -ForegroundColor Red }"

echo Testing Ligue 1...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer-final.vercel.app/league/ligue-1' -Method Get -TimeoutSec 10; Write-Host '✅ Ligue 1: Working' -ForegroundColor Green } catch { Write-Host '❌ Ligue 1: Not working yet' -ForegroundColor Red }"

echo Testing MLS...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer-final.vercel.app/league/mls' -Method Get -TimeoutSec 10; Write-Host '✅ MLS: Working' -ForegroundColor Green } catch { Write-Host '❌ MLS: Not working yet' -ForegroundColor Red }"

echo.
echo 🎯 TESTING RESULTS:
echo • If you see ✅ Working - the league pages are live!
echo • If you see ❌ Not working yet - deployment still in progress
echo.
echo 🚀 NEXT STEPS:
echo 1. Visit: https://waksoccer-final.vercel.app
echo 2. Click on any league (Premier League, La Liga, etc.)
echo 3. You should see:
echo    • Live matches updating every 45 seconds
echo    • Complete league table with team standings
echo    • Team form indicators (W/D/L)
echo    • League statistics
echo.
echo 🏆 All 20 championships should now be clickable and show live data!
echo.
pause