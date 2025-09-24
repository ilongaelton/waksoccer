@echo off
echo 🔍 Testing waksoccer.com Domain Connection...
echo.

echo 🌐 Testing waksoccer.com...
curl -I https://waksoccer.com 2>nul
if %errorlevel% == 0 (
    echo ✅ waksoccer.com is WORKING!
) else (
    echo ⏳ waksoccer.com not ready yet (DNS propagation in progress)
)

echo.
echo 🌐 Testing www.waksoccer.com...
curl -I https://www.waksoccer.com 2>nul
if %errorlevel% == 0 (
    echo ✅ www.waksoccer.com is WORKING!
) else (
    echo ⏳ www.waksoccer.com not ready yet (DNS propagation in progress)
)

echo.
echo 📊 DNS Propagation Status:
echo Open this link to check worldwide propagation:
echo https://dnschecker.org/#A/waksoccer.com
echo.

echo 🎯 Next Steps:
echo 1. Wait 10-60 minutes for DNS propagation
echo 2. Run this script again to test
echo 3. When working, start sharing waksoccer.com!
echo.
pause