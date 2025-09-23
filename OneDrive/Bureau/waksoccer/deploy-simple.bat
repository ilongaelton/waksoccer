@echo off
echo 🚀 Deploying waksoccer web app to Vercel...

echo 📦 Installing dependencies...
cd apps\web
npm install

echo 🔨 Building the app...
npm run build

echo ✅ Build complete! Ready for Vercel deployment.
echo.
echo 🔧 NEXT STEPS:
echo 1. Go to vercel.com
echo 2. Import project from GitHub: ilongaelton/waksoccer  
echo 3. Set Root Directory to: apps/web
echo 4. Framework: Next.js
echo 5. Click Deploy
echo.
echo 🌟 Your waksoccer app will be live at: https://waksoccer-[random].vercel.app

pause