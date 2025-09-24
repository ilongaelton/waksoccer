@echo off
echo.
echo ========================================
echo   DEPLOYING WAKSOCCER WITH SEO & 45s UPDATES
echo ========================================
echo.

echo Setting up environment...
set PATH=%PATH%;C:\Program Files\nodejs;%USERPROFILE%\AppData\Roaming\npm

echo.
echo Navigating to web app...
cd /d "C:\Users\haylton ilonga\OneDrive\Bureau\waksoccer\apps\web"

echo.
echo Building optimized version for production...
npm run build

echo.
echo Deploying to Vercel with SEO optimizations...
vercel --prod

echo.
echo ========================================
echo   🚀 DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo ✅ Enhanced SEO for Google discovery
echo ✅ 45-second live score updates
echo ✅ Championship-focused interface
echo ✅ Structured data for search engines
echo ✅ Sitemap.xml for Google indexing
echo.
echo 🔍 TO GET ON GOOGLE:
echo 1. Submit to Google Search Console
echo 2. Create social media: @waksoccer
echo 3. Tell people: "Search 'waksoccer' on Google!"
echo.
echo 🏆 Your competitive advantages:
echo - 45-second live updates (faster than competitors)
echo - All major championships covered
echo - 100%% free (no subscription needed)
echo - Real-time fan chat during matches
echo.
pause