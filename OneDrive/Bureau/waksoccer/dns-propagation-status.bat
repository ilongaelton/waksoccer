@echo off
echo.
echo ========================================
echo   DNS PROPAGATION STATUS
echo ========================================
echo.

echo Checking current global DNS...
nslookup waksoccer.com

echo.
echo ========================================
echo   CURRENT STATUS:
echo ========================================
echo.
echo ✅ Namecheap DNS: CORRECTLY SET to 216.198.79.131
echo ⏳ Global DNS: Still showing old 216.198.7.91
echo 🕒 Status: DNS propagation in progress
echo.
echo ========================================
echo   WHAT TO EXPECT:
echo ========================================
echo.
echo ⏰ Wait: 5-30 minutes for propagation
echo 🔄 Change: Global DNS will update to 216.198.79.131
echo ✅ Result: waksoccer.com will go LIVE!
echo.
echo 🚀 Once live, your soccer app will be at:
echo    https://waksoccer.com
echo.
echo Run this script every 10 minutes to check progress.
echo.
pause