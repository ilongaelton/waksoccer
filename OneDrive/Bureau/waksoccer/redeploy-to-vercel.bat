@echo off
echo.
echo ========================================
echo   REDEPLOYING WAKSOCCER TO VERCEL
echo ========================================
echo.

echo Setting up Node.js environment...
set PATH=%PATH%;C:\Program Files\nodejs;%USERPROFILE%\AppData\Roaming\npm

echo.
echo Navigating to web app directory...
cd /d "C:\Users\haylton ilonga\OneDrive\Bureau\waksoccer\apps\web"

echo.
echo Current directory:
cd

echo.
echo Installing Vercel CLI...
npm install -g vercel

echo.
echo Logging into Vercel (if needed)...
vercel login

echo.
echo Deploying to Vercel...
vercel --prod

echo.
echo ========================================
echo   POST-DEPLOYMENT STEPS
echo ========================================
echo.
echo After deployment completes:
echo 1. Copy the new production URL
echo 2. Go to Vercel dashboard
echo 3. Add your custom domain (waksoccer.com)
echo 4. Update DNS if needed
echo.
pause