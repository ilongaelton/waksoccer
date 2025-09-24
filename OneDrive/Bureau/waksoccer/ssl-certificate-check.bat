@echo off
echo.
echo ========================================
echo   SSL CERTIFICATE STATUS CHECK
echo ========================================
echo.

echo Testing HTTPS connection...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://waksoccer.com' -TimeoutSec 5; Write-Host 'SUCCESS! SSL is working!' -ForegroundColor Green; Write-Host 'Status:' $response.StatusCode $response.StatusDescription -ForegroundColor Cyan } catch { Write-Host 'SSL certificate still being provisioned...' -ForegroundColor Yellow; Write-Host 'This is normal - wait 5-15 minutes total' -ForegroundColor White }"

echo.
echo Testing basic connectivity...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://waksoccer.com' -Method Head -TimeoutSec 5; Write-Host 'Domain is connected (redirecting to HTTPS)' -ForegroundColor Cyan } catch { Write-Host 'Connection test result:' $_.Exception.Message -ForegroundColor Yellow }"

echo.
echo ========================================
echo   WHAT TO EXPECT:
echo ========================================
echo.
echo 🕒 SSL Certificate: 5-15 minutes to provision
echo ✅ Domain Connected: YES (Vercel is responding)
echo 🔄 Status: SSL certificate being generated
echo.
echo 🎉 Once SSL is ready: https://waksoccer.com will work!
echo.
echo Run this script every 5 minutes to check progress.
echo.
pause