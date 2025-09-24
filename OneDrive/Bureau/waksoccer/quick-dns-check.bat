@echo off
echo.
echo ========================================
echo    FAST DOMAIN CHECK (NO TIMEOUT)
echo ========================================
echo.

echo Current DNS Status:
nslookup waksoccer.com

echo.
echo Should Point To (Working Vercel App):
nslookup waksoccer-final.vercel.app

echo.
echo ========================================
echo   DIAGNOSIS:
echo ========================================
echo.
echo If waksoccer.com shows 216.198.7.91 = OLD/BROKEN
echo If waksoccer.com shows 216.198.79.131 = CORRECT!
echo.
echo TO FIX:
echo 1. Go to Namecheap Advanced DNS
echo 2. Change A record from 216.198.7.91 to 216.198.79.131
echo 3. Save and wait 5-15 minutes
echo.
pause