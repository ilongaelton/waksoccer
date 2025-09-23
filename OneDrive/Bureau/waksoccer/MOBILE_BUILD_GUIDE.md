# Mobile App Build Guide

## Prerequisites
1. Install Node.js from nodejs.org
2. Install pnpm: `npm install -g pnpm`
3. Install EAS CLI: `pnpm install -g eas-cli`
4. Create Expo account at expo.dev

## Setup Steps

### 1. Login to Expo
```bash
eas login
```

### 2. Configure Project
```bash
cd apps/mobile
eas build:configure
```

### 3. Update app.json
Update the projectId in app.json with your Expo project ID:
```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "your-actual-project-id"
      }
    }
  }
}
```

### 4. Build for App Stores
```bash
# Build for iOS App Store
eas build --platform ios --profile production

# Build for Google Play Store  
eas build --platform android --profile production

# Build for both platforms
eas build --platform all --profile production
```

### 5. Submit to App Stores (Optional)
```bash
# Submit to iOS App Store
eas submit --platform ios

# Submit to Google Play Store
eas submit --platform android
```

## Build Profiles (eas.json)
The project will create an eas.json file with different build profiles:

- **development**: For testing on device
- **preview**: For internal testing
- **production**: For app store submission

## Requirements for App Store Submission

### iOS (Apple App Store)
- Apple Developer Account ($99/year)
- App icons and screenshots
- App Store listing information
- Review process (1-7 days)

### Android (Google Play Store)  
- Google Play Developer Account ($25 one-time)
- App icons and screenshots
- Play Store listing information
- Review process (few hours to 3 days)

## Testing Builds
```bash
# Create development build for testing
eas build --platform ios --profile development
eas build --platform android --profile development

# Install on device using Expo Development Build
```