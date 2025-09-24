@echo off
echo.
echo ========================================
echo   CHECKING WAKSOCCER.COM STATUS
echo ========================================
echo.

echo Testing waksoccer.com...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer.com' -TimeoutSec 10; Write-Host 'SUCCESS! waksoccer.com is LIVE!' -ForegroundColor Green; Write-Host 'Status:' $response.StatusCode $response.StatusDescription -ForegroundColor Cyan } catch { Write-Host 'Not ready yet - DNS still propagating...' -ForegroundColor Yellow }"

echo.
echo Testing www.waksoccer.com...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://www.waksoccer.com' -TimeoutSec 10; Write-Host 'SUCCESS! www.waksoccer.com is LIVE!' -ForegroundColor Green; Write-Host 'Status:' $response.StatusCode $response.StatusDescription -ForegroundColor Cyan } catch { Write-Host 'Not ready yet - DNS still propagating...' -ForegroundColor Yellow }"

echo.
echo ========================================
echo   DNS PROPAGATION STATUS
echo ========================================
echo.
echo If both domains show "Not ready yet":
echo - This is normal! DNS takes 10-60 minutes
echo - Run this script again in 15 minutes
echo.
echo If ONE domain works:
echo - Great! Your domain is going live
echo - The other will work soon
echo.
echo If BOTH domains work:
echo - CONGRATULATIONS! Your domain is LIVE!
echo - Visit https://waksoccer.com to see your app
echo.
pause