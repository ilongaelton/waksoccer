@echo off
echo 🚀 Building waksoccer ⚽ for App Stores...
echo.

echo 📱 Step 1: Installing EAS CLI...
npm install -g @expo/eas-cli

echo 🔐 Step 2: Login to Expo...
echo Please login with your Expo account:
eas login

echo 🏗️ Step 3: Configure project...
eas build:configure

echo 📋 Step 4: Building for production...
echo Choose your build target:
echo [1] iOS (App Store)
echo [2] Android (Play Store) 
echo [3] Both iOS and Android
set /p choice=Enter your choice (1-3): 

if "%choice%"=="1" (
    echo Building iOS version for App Store...
    eas build --platform ios --profile production
) else if "%choice%"=="2" (
    echo Building Android version for Play Store...
    eas build --platform android --profile production
) else if "%choice%"=="3" (
    echo Building both iOS and Android versions...
    eas build --platform all --profile production
) else (
    echo Invalid choice. Building both platforms...
    eas build --platform all --profile production
)

echo.
echo ✅ Build complete! 
echo.
echo 📲 Next steps:
echo 1. Download the build files from Expo dashboard
echo 2. Submit to App Store Connect (iOS) or Play Console (Android)
echo 3. Fill in app store descriptions from APP_STORE_STRATEGY.md
echo.
echo 🔗 Useful links:
echo • Expo Dashboard: https://expo.dev/accounts/[your-username]/projects/waksoccer
echo • App Store Connect: https://appstoreconnect.apple.com
echo • Google Play Console: https://play.google.com/console
echo.
pause