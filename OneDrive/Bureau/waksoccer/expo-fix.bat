@echo off
echo 🔧 Fixing Expo Dependencies and Starting Server
echo.

:: Add Node.js to PATH
set "PATH=C:\Program Files\nodejs;%PATH%;%USERPROFILE%\AppData\Roaming\npm"

echo 📦 Installing missing dependencies...
cd /d "%~dp0apps\mobile"

echo Installing metro and react-native properly...
"C:\Program Files\nodejs\npm.cmd" install metro react-native@0.74.5 react@18.2.0 --legacy-peer-deps

echo.
echo 📱 Starting Expo with modern CLI...
"C:\Program Files\nodejs\npx.cmd" @expo/cli@latest start --tunnel

pause