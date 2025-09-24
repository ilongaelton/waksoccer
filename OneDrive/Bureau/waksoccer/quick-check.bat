@echo off
echo.
echo ========================================
echo   QUICK WAKSOCCER.COM STATUS CHECK
echo ========================================
echo.

echo [1/3] Checking DNS resolution...
nslookup waksoccer.com | findstr "Address:"

echo.
echo [2/3] Quick HTTP test (5 second timeout)...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer.com' -TimeoutSec 5 -ErrorAction Stop; Write-Host 'SUCCESS! waksoccer.com is LIVE!' -ForegroundColor Green; Write-Host 'Status Code:' $response.StatusCode -ForegroundColor Cyan } catch { Write-Host 'Not ready yet - still propagating or timeout' -ForegroundColor Yellow }"

echo.
echo [3/3] Testing working Vercel URL for comparison...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer-final.vercel.app' -TimeoutSec 5 -ErrorAction Stop; Write-Host 'Vercel app is working!' -ForegroundColor Green } catch { Write-Host 'Vercel app issue!' -ForegroundColor Red }"

echo.
echo ========================================
echo   QUICK STATUS
echo ========================================
echo.
echo If waksoccer.com shows success: YOU'RE LIVE! 🎉
echo If timeout/not ready: Wait 10 more minutes and try again
echo If DNS shows wrong IP: Update Namecheap DNS records
echo.
pause