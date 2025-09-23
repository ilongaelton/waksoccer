@echo off
echo 🌐 Getting waksoccer.com Live on Google!
echo.
echo 💰 COSTS BREAKDOWN:
echo ✅ Hosting: FREE (Vercel)
echo ✅ Domain: $12/year (waksoccer.com)
echo ✅ SSL: FREE (included)
echo ✅ TOTAL: $12/year only!
echo.

echo 🚀 DEPLOYMENT OPTIONS:
echo.
echo [1] Deploy FREE first (Recommended)
echo     Get: waksoccer.vercel.app
echo     Cost: $0
echo     Time: 5 minutes
echo.
echo [2] Buy domain + Deploy
echo     Get: waksoccer.com
echo     Cost: $12/year
echo     Time: 30 minutes
echo.

set /p choice=Choose option (1 or 2): 

if "%choice%"=="1" (
    echo.
    echo 🎯 OPTION 1: FREE DEPLOYMENT
    echo.
    echo STEP 1: Create GitHub Repository
    echo 1. Go to github.com
    echo 2. Create new repository: "waksoccer"
    echo 3. Upload your code
    echo.
    echo STEP 2: Deploy to Vercel
    echo 1. Go to vercel.com
    echo 2. Sign up with GitHub
    echo 3. Import "waksoccer" repository
    echo 4. Deploy automatically
    echo.
    echo RESULT: Your app will be live at:
    echo ✅ https://waksoccer.vercel.app
    echo ✅ Google can find it immediately
    echo ✅ Share with friends and test
    echo.
    echo 📈 After Success:
    echo Buy waksoccer.com domain and connect it
) else if "%choice%"=="2" (
    echo.
    echo 🛒 OPTION 2: BUY DOMAIN + DEPLOY
    echo.
    echo STEP 1: Buy Domain (~$12/year)
    echo Recommended sites:
    echo • namecheap.com (easiest)
    echo • godaddy.com (well-known)
    echo • cloudflare.com (cheapest)
    echo.
    echo Search for: "waksoccer.com"
    echo If taken, try: "waksoccer.app"
    echo.
    echo STEP 2: Deploy to Vercel (FREE)
    echo 1. Create GitHub repo with your code
    echo 2. Deploy to Vercel
    echo 3. Connect custom domain
    echo.
    echo STEP 3: DNS Setup
    echo Point domain to Vercel servers
    echo Wait 24 hours for activation
    echo.
    echo RESULT: 
    echo ✅ https://waksoccer.com
    echo ✅ Professional appearance
    echo ✅ Easy to remember and share
) else (
    echo Invalid choice. Showing both options...
    echo.
    echo 🎯 RECOMMENDED APPROACH:
    echo.
    echo WEEK 1: Start FREE
    echo ✅ Deploy to Vercel (get .vercel.app URL)
    echo ✅ Test with users
    echo ✅ Submit to Google Search Console
    echo ✅ Share on social media
    echo.
    echo WEEK 2: If Successful, Buy Domain
    echo ✅ Purchase waksoccer.com ($12)
    echo ✅ Connect to existing deployment
    echo ✅ Professional launch
)

echo.
echo 🔗 HELPFUL LINKS:
echo • Deploy FREE: vercel.com
echo • Buy Domain: namecheap.com
echo • GitHub: github.com
echo • Google Search: search.google.com/search-console
echo.
echo 📞 NEED HELP?
echo Check WHAT_TO_BUY_SETUP_GUIDE.md for detailed instructions
echo.
pause