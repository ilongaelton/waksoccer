@echo off
echo 🎉 Final Expo Setup - This Should Work!
echo.

:: Set PATH
set "PATH=C:\Program Files\nodejs;%PATH%;%USERPROFILE%\AppData\Roaming\npm"

echo ✅ Node.js version:
"C:\Program Files\nodejs\node.exe" --version

echo.
echo 📱 Instructions for you:
echo 1. Download "Expo Go" app on your phone (if not done already)
echo 2. Wait for QR code to appear below
echo 3. Scan QR code with Expo Go app
echo 4. Your soccer app will load on your phone!
echo.

cd /d "%~dp0apps\mobile"

echo 🔧 Installing correct dependencies...
"C:\Program Files\nodejs\npm.cmd" install --force

echo.
echo 🚀 Starting Expo development server...
"C:\Program Files\nodejs\npx.cmd" expo start --clear

echo.
echo 📱 SCAN THE QR CODE ABOVE WITH EXPO GO!
pause