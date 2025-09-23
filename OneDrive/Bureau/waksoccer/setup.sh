#!/bin/bash

echo "🚀 Setting up waksoccer MVP..."

# Copy environment files
echo "📝 Setting up environment files..."
cp .env.example apps/web/.env.local
cp .env.example apps/mobile/.env

echo "📦 Installing dependencies..."
# Install root dependencies
pnpm install

echo "✅ Setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Update your API keys in apps/web/.env.local and apps/mobile/.env"
echo "2. Get API key from api-sports.io or football-data.org"
echo "3. Set up Stripe account and get your keys"
echo "4. Run 'cd apps/web && pnpm dev' to start the web app"
echo "5. Run 'cd apps/mobile && pnpm start' to start the mobile app"
echo ""
echo "🌐 Web app will be available at: http://localhost:3000"
echo "📱 Mobile app will open Expo development tools"