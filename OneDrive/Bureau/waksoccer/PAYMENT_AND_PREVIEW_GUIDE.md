# 💳 Payment Guide & App Preview Options

## 🆓 FREE Options (Start Here!)

### 1. Local Development (100% Free)
```powershell
# Start the web app locally
cd apps\web
pnpm dev
# Visit: http://localhost:3000

# Start the mobile app locally  
cd apps\mobile
pnpm start
# Use Expo Go app on your phone to scan QR code
```

### 2. Expo Go App (Free Preview)
1. **Download Expo Go** on your phone:
   - iOS: App Store → "Expo Go"
   - Android: Play Store → "Expo Go"

2. **Run your app**:
   ```powershell
   cd apps\mobile
   pnpm start
   ```

3. **Scan QR code** with your phone camera or Expo Go app
4. **See your app instantly** on your device!

### 3. Free EAS Builds
- **Development builds**: Free
- **Preview builds**: Free  
- **Monthly limit**: Generous free tier

## 💰 When You Need to Pay

### Google Play Store
- **Cost**: $25 (one-time payment)
- **What you get**: 
  - Publish apps to Google Play
  - Reach millions of Android users
  - App analytics and monetization
- **Payment**: Google Developer Console

### Apple App Store
- **Cost**: $99/year
- **What you get**:
  - Publish apps to App Store
  - TestFlight beta testing
  - App Store Connect analytics
- **Payment**: Apple Developer Program

### EAS Build (Expo)
- **Free Tier**: 
  - 30 builds/month for iOS
  - 30 builds/month for Android
  - 15 builds/month for iOS simulators
- **Paid Plans**: 
  - Production: $99/month (unlimited builds)
  - Teams: Custom pricing

## 📱 How to See Your App (Step by Step)

### Option 1: Instant Preview with Expo Go (Recommended)

1. **Install Expo Go**:
   - Open App Store (iOS) or Play Store (Android)
   - Search "Expo Go"
   - Install the free app

2. **Start your development server**:
   ```powershell
   cd apps\mobile
   pnpm start
   ```

3. **Connect your phone**:
   - iOS: Open Camera app, scan the QR code
   - Android: Open Expo Go app, scan the QR code

4. **Your app loads instantly!** 🎉

### Option 2: Build a Real App File

1. **Login to Expo**:
   ```powershell
   eas login
   ```

2. **Configure the project**:
   ```powershell
   cd apps\mobile
   eas build:configure
   ```

3. **Build for your platform**:
   ```powershell
   # For Android (free account)
   eas build --platform android --profile development
   
   # For iOS (requires Mac or cloud build)
   eas build --platform ios --profile development
   ```

4. **Download and install**:
   - EAS will provide a download link
   - Install the APK (Android) or IPA (iOS) on your device

### Option 3: Web Version

Your app also has a web version:

```powershell
cd apps\web
pnpm dev
```

Then visit: http://localhost:3000

## 🎯 Recommended Path (Start Free!)

### Week 1: Development (Free)
1. Use Expo Go for instant previews
2. Test all features locally
3. Get feedback from friends/family

### Week 2-3: Beta Testing (Free)
1. Build development/preview versions
2. Share with testers via EAS
3. Iterate and improve

### Week 4+: App Store (Paid)
1. Pay Google Play fee ($25) and/or Apple fee ($99/year)
2. Build production versions
3. Submit to app stores

## 💡 Pro Tips

### Save Money:
- **Start with Google Play** ($25 vs $99/year)
- **Use Expo Go** for development (free)
- **Test thoroughly** before paying store fees

### Free Testing Options:
- **Expo Go**: Instant preview
- **Share APK directly**: Android users can install without Play Store
- **TestFlight**: Free iOS beta testing (after paying Apple fee)

## 🔧 Current Setup Commands

Let me help you start seeing your app right now:

```powershell
# 1. Start the web version
cd apps\web
pnpm dev

# 2. In a new terminal, start mobile version
cd apps\mobile  
pnpm start
```

Then:
- **Web**: Open http://localhost:3000
- **Mobile**: Download Expo Go app and scan QR code

Would you like me to help you start the development servers now?