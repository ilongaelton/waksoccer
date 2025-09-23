# 🔧 App Store Submission Checklist

## ✅ Pre-Submission Requirements

### 📱 iOS App Store (Apple)
- [ ] **Apple Developer Account** ($99/year)
- [ ] **App Store Connect** setup
- [ ] **Bundle ID** registered: `com.waksoccer.app`
- [ ] **App icons** (1024x1024 PNG)
- [ ] **Screenshots** (iPhone 6.7", 6.5", 5.5" + iPad)
- [ ] **Privacy Policy** URL (required)
- [ ] **App description** and keywords

### 🤖 Google Play Store (Android)
- [ ] **Google Play Developer Account** ($25 one-time)
- [ ] **Play Console** setup
- [ ] **Package name** registered: `com.waksoccer.app`
- [ ] **App icons** (512x512 PNG)
- [ ] **Screenshots** (Phone + Tablet)
- [ ] **Privacy Policy** URL (required)
- [ ] **App description** and short description

## 🏗️ Build Commands

### Development Build (Testing):
```bash
cd apps/mobile
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Production Build (App Stores):
```bash
cd apps/mobile
eas build --profile production --platform ios
eas build --profile production --platform android
```

### Submit to Stores:
```bash
# iOS App Store
eas submit --platform ios

# Google Play Store  
eas submit --platform android
```

## 📝 App Store Listings

### App Name:
- **iOS**: `waksoccer ⚽`
- **Android**: `waksoccer ⚽ - Free Soccer Standings`

### Keywords (iOS):
`soccer,football,standings,league,premier,scores,free,live,table,results`

### Categories:
- **Primary**: Sports
- **Secondary**: News (iOS) / Sports (Android)

### Age Rating:
- **Everyone** / **4+**

## 📸 Required Assets

### App Icon (Both Stores):
```
• 1024x1024 PNG (high resolution)
• Green background (#22c55e)
• White "W" letter or waksoccer text
• Soccer ball element
• No transparency
• No rounded corners (system handles this)
```

### Screenshots Needed:

#### iPhone (iOS):
- **6.7"** (iPhone 14 Pro Max): 1290x2796
- **6.5"** (iPhone 14 Plus): 1242x2688  
- **5.5"** (iPhone 8 Plus): 1242x2208

#### Android (Play Store):
- **Phone**: 1080x1920 minimum
- **Tablet**: 1200x1920 minimum

### Screenshot Content:
1. **Home screen** with league list
2. **Premier League standings** 
3. **Multiple leagues** showing variety
4. **"100% FREE"** message prominent

## 🔐 Account Setup

### Apple Developer Account:
1. Go to [developer.apple.com](https://developer.apple.com)
2. Enroll in Apple Developer Program ($99/year)
3. Create Bundle ID: `com.waksoccer.app`
4. Generate certificates and provisioning profiles

### Google Play Developer:
1. Go to [play.google.com/console](https://play.google.com/console)
2. Pay $25 registration fee (one-time)
3. Create app with package name: `com.waksoccer.app`
4. Set up payment profile (even for free apps)

## 📋 Store Descriptions

### iOS App Store Description:
```
Get live soccer standings for 20+ major leagues worldwide - completely FREE!

⚽ FEATURES:
• Premier League, La Liga, Bundesliga, Serie A & more
• Real-time league standings and tables  
• 100% FREE - No subscription required
• No ads, no registration needed
• Fast, clean interface
• iPhone & iPad optimized

🌍 LEAGUES COVERED:
• English Premier League
• Spanish La Liga  
• German Bundesliga
• Italian Serie A
• French Ligue 1
• UEFA Champions League
• And 15+ more leagues!

Download now and never miss your team's position again!
```

### Google Play Store Description:
```
🏆 The #1 FREE Soccer App for Live Standings & Results

Get instant access to live soccer league standings for over 20 major leagues worldwide. No subscription, no ads, no registration required!

⚽ WHAT YOU GET:
• Live standings for Premier League, La Liga, Bundesliga, Serie A
• Real-time updates every few minutes
• Clean, fast interface  
• Works offline with cached data
• Completely FREE forever

Made with ❤️ for soccer fans worldwide.
```

## 🚀 Submission Steps

### iOS Submission:
1. **Build app**: `eas build --platform ios --profile production`
2. **Download IPA** from Expo dashboard
3. **Upload to App Store Connect** via Transporter app
4. **Fill app information** in App Store Connect
5. **Submit for review** (takes 1-3 days)

### Android Submission:
1. **Build app**: `eas build --platform android --profile production`
2. **Download AAB** from Expo dashboard  
3. **Upload to Play Console**
4. **Fill app information** in Play Console
5. **Submit for review** (takes few hours to 1 day)

## 📊 After Submission

### Monitor Performance:
- **App Store Connect Analytics** (iOS)
- **Play Console Statistics** (Android)
- **Search rankings** for keywords
- **User reviews and ratings**

### Optimization:
- **Update keywords** based on search data
- **Improve screenshots** if conversion is low
- **Respond to user reviews**
- **Regular app updates** with new features

## 💰 Cost Summary

### One-time Costs:
- **Apple Developer**: $99/year
- **Google Play**: $25 one-time
- **Total first year**: $124

### Ongoing Costs:
- **Apple Developer**: $99/year (renew annually)
- **Google Play**: $0 (one-time fee only)

## 🎯 Success Metrics

### Target Goals:
- **1000+ downloads** in first month
- **4.5+ star rating** on both stores
- **Top 100** in Sports category
- **Organic discovery** via search

Your app will be discoverable through:
✅ Brand searches ("waksoccer")
✅ Category browsing (Sports apps)  
✅ Keyword searches ("soccer standings")
✅ Featured sections (New & Updated)

Ready to launch waksoccer ⚽ to the world! 🌍