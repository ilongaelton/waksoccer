@echo off
echo.
echo ========================================
echo   FORCE SSL CERTIFICATE REFRESH
echo ========================================
echo.

echo Forcing DNS cache refresh...
ipconfig /flushdns

echo.
echo Testing different DNS servers...
echo Testing with Google DNS (8.8.8.8)...
nslookup waksoccer.com 8.8.8.8

echo.
echo Testing with Cloudflare DNS (1.1.1.1)...
nslookup waksoccer.com 1.1.1.1

echo.
echo Forcing browser cache clear instructions:
echo 1. Press Ctrl+F5 in browser
echo 2. Try incognito/private window
echo 3. Clear browser cache completely

echo.
echo Testing HTTPS with curl alternative...
powershell -Command "try { [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; $response = Invoke-WebRequest -Uri 'https://waksoccer.com' -TimeoutSec 10; Write-Host 'SUCCESS! SSL is working!' -ForegroundColor Green } catch { Write-Host 'SSL still provisioning...' -ForegroundColor Yellow }"

echo.
pause