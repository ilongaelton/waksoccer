@echo off
echo 🚀 Simple Expo Start Script
echo.

:: Add Node.js to PATH for this session
set "PATH=C:\Program Files\nodejs;%PATH%;%USERPROFILE%\AppData\Roaming\npm"

echo Testing Node.js...
"C:\Program Files\nodejs\node.exe" --version
if %errorlevel% neq 0 (
    echo ❌ Node.js not found at expected location
    echo 💡 Please check if Node.js is installed
    pause
    exit /b 1
)

echo ✅ Node.js is working

echo.
echo 📱 Starting Expo development server...
echo 📝 Make sure you have downloaded "Expo Go" app on your phone
echo.

cd /d "%~dp0apps\mobile"
"C:\Program Files\nodejs\npx.cmd" expo start --tunnel

echo.
echo 🎉 Expo server should be running!
echo 📱 Look for the QR code above and scan it with Expo Go
pause