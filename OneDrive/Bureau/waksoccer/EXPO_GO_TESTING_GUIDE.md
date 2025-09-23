# 📱 Expo Go Testing - Step by Step Guide

## 🎯 Quick Start with Expo Go

### Step 1: Download Expo Go App (on your phone)
- **iPhone**: App Store → Search "Expo Go" → Install
- **Android**: Play Store → Search "Expo Go" → Install

### Step 2: Start Development Server

We'll use a simple approach that definitely works:

#### Option A: Using Node.js directly
```powershell
# Navigate to mobile app
cd apps\mobile

# Install dependencies first
"C:\Program Files\nodejs\npm.cmd" install

# Start with npx (this should work)
"C:\Program Files\nodejs\npx.cmd" expo start
```

#### Option B: If expo is not found
```powershell
# Install expo-cli globally first
"C:\Program Files\nodejs\npm.cmd" install -g expo-cli

# Then try starting
"C:\Program Files\nodejs\npx.cmd" expo start
```

#### Option C: Direct Metro bundler
```powershell
# Start the bundler directly
"C:\Program Files\nodejs\npx.cmd" @expo/metro-bundler start
```

### Step 3: Connect Your Phone

Once the server starts, you'll see:
1. **QR Code** in the terminal
2. **Development URL** (like exp://192.168.1.100:8081)

#### On iPhone:
1. Open **Camera app**
2. Point at the QR code
3. Tap the notification that appears
4. App opens in Expo Go

#### On Android:
1. Open **Expo Go app**
2. Tap "Scan QR Code"
3. Point at the QR code
4. App loads automatically

## 🔧 Troubleshooting

### If you see "Metro bundler not running":
1. Make sure you're in the `apps\mobile` directory
2. Try: `"C:\Program Files\nodejs\npm.cmd" start`
3. Or: `"C:\Program Files\nodejs\npx.cmd" react-native start`

### If QR code doesn't appear:
1. Check your Windows Firewall
2. Make sure phone and computer are on same WiFi
3. Try the tunnel option: `"C:\Program Files\nodejs\npx.cmd" expo start --tunnel`

### If app doesn't load on phone:
1. Make sure Expo Go is latest version
2. Try restarting the development server
3. Check that both devices are on same network

## 🎉 What You'll See

Once connected, your phone will show:
- **waksoccer logo/title**
- **List of soccer leagues** (Premier League, La Liga, etc.)
- **Tap any league** to see standings
- **Native mobile navigation**

## 🔄 Development Flow

1. **Make changes** to your code on computer
2. **Save the file**
3. **App automatically reloads** on phone
4. **See changes instantly!**

## 🚀 Alternative: Web Version

If mobile setup is tricky, you can also test the web version:

```powershell
cd apps\web
"C:\Program Files\nodejs\npm.cmd" run dev
```

Then visit: http://localhost:3000

This gives you the same app functionality in your browser, and it's mobile-responsive so it works on phone browsers too!

## 💡 Pro Tips

- **Shake your phone** in Expo Go to access developer menu
- **Use tunnel mode** if on different networks: `expo start --tunnel`
- **Enable hot reloading** for instant updates
- **Use browser version** as backup if mobile has issues

The most important thing is seeing your app work! Whether it's via Expo Go, browser, or eventual app store build - you'll have the same great soccer standings app.