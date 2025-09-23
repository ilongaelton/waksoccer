@echo off
echo 🚀 Starting waksoccer Development Servers...
echo.

:: Set up PATH for this session
set PATH=%PATH%;C:\Program Files\nodejs;%USERPROFILE%\AppData\Roaming\npm;%USERPROFILE%\AppData\Local\pnpm

:: Test if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found in PATH
    echo 💡 Please restart your terminal or run setup-mobile.bat first
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

echo.
echo 🌐 Starting Web App (Next.js)...
echo 📱 Open: http://localhost:3000
echo.

cd apps\web
start cmd /k "npm run dev"

echo.
echo 📱 Starting Mobile App (Expo)...
echo 📲 Download 'Expo Go' app and scan QR code
echo.

cd ..\mobile
start cmd /k "npx expo start"

echo.
echo 🎉 Both servers are starting!
echo 📝 See PAYMENT_AND_PREVIEW_GUIDE.md for next steps
pause