@echo off
echo.
echo ========================================
echo   FINDING CORRECT VERCEL DNS RECORDS
echo ========================================
echo.

echo Checking your working Vercel deployment...
echo Your app currently works at: https://waksoccer-final.vercel.app

echo.
echo Getting IP address for Vercel deployment...
nslookup waksoccer-final.vercel.app

echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. The IP address shown above is what your
echo    waksoccer.com A record should point to
echo.
echo 2. Go to Namecheap Advanced DNS
echo.
echo 3. Update A record from 216.198.7.91 
echo    to the IP shown above
echo.
echo 4. Save changes and wait 10-30 minutes
echo.
echo 5. Run check-domain-live.bat to test
echo.
pause