@echo off
echo 📱 Starting Expo Go Testing for waksoccer
echo.

:: Set up PATH
set PATH=%PATH%;C:\Program Files\nodejs;%USERPROFILE%\AppData\Roaming\npm

echo 🔍 Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please restart terminal.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

echo.
echo 📦 Installing Expo CLI...
npm install -g expo-cli

echo.
echo 📱 Starting mobile app...
cd apps\mobile

echo 🔧 Installing dependencies...
npm install --legacy-peer-deps

echo 🚀 Starting Expo development server...
echo.
echo 📝 Instructions:
echo 1. Download "Expo Go" app on your phone
echo 2. Scan the QR code that appears below
echo 3. Your app will load on your phone!
echo.

npx expo start

pause