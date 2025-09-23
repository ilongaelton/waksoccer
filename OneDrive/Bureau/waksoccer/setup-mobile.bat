@echo off
echo 🚀 waksoccer Mobile App Setup for Windows
echo.

echo 📋 Checking prerequisites...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo 📥 Please download and install Node.js from: https://nodejs.org/
    echo 💡 Choose the LTS version for Windows
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js is installed
    node --version
)

:: Check if npm is available
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    echo 🔧 This should come with Node.js. Please reinstall Node.js
    pause
    exit /b 1
) else (
    echo ✅ npm is available
    npm --version
)

:: Install pnpm if not available
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing pnpm...
    npm install -g pnpm
) else (
    echo ✅ pnpm is already installed
    pnpm --version
)

:: Install EAS CLI
echo 📱 Installing Expo EAS CLI...
pnpm install -g eas-cli

:: Verify EAS installation
where eas >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ EAS CLI installation failed
    pause
    exit /b 1
) else (
    echo ✅ EAS CLI installed successfully
    eas --version
)

echo.
echo 🎉 Setup complete! Next steps:
echo.
echo 1. Create Expo account: https://expo.dev/signup
echo 2. Login to EAS: eas login
echo 3. Navigate to mobile app: cd apps\mobile
echo 4. Configure project: eas build:configure
echo 5. Build app: eas build --platform android
echo.
echo 📚 See MOBILE_BUILD_GUIDE.md for detailed instructions
pause