import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About waksoccer - Free Soccer Data",
  description: "Learn about waksoccer, the completely free soccer standings and data platform for 20+ major leagues worldwide.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">About waksoccer ⚽</h1>
        <p className="text-xl text-green-600 font-semibold">100% Free Soccer Data Platform</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Why waksoccer is Completely FREE</h2>
        <ul className="space-y-3 text-green-700">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span><strong>No subscriptions</strong> - Access all features without paying anything</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span><strong>No ads</strong> - Clean experience without distractions</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span><strong>No registration</strong> - Use immediately without creating accounts</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span><strong>No credit card</strong> - Never asked for payment information</span>
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4">🌍 What We Cover</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 20+ Major Soccer Leagues</li>
            <li>• Live Standings & Tables</li>
            <li>• Real-time Updates</li>
            <li>• Mobile & Web Access</li>
            <li>• Fast Loading Times</li>
            <li>• SEO Optimized</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">🎯 Our Mission</h3>
          <p className="text-gray-700 mb-4">
            Soccer data should be accessible to everyone. We believe that checking league standings, 
            fixtures, and results shouldn't cost money or require giving up your personal information.
          </p>
          <p className="text-gray-700">
            That's why waksoccer is and will always remain completely free for all users worldwide.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-4">🚀 Future Plans</h3>
        <div className="text-blue-700 space-y-2">
          <p>• Add more leagues from around the world</p>
          <p>• Include fixture schedules and results</p>
          <p>• Add player statistics and team information</p>
          <p>• Mobile app for iOS and Android</p>
          <p>• Notifications for your favorite teams</p>
          <p className="font-semibold mt-4">All features will remain 100% FREE!</p>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">💚 Support Free Soccer Data</h3>
        <p className="text-gray-600 mb-4">
          If you find waksoccer ⚽ useful, help us grow by sharing it with other soccer fans!
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            ⚽ Share on Twitter
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
            ⚽ Share with Friends
          </button>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>waksoccer ⚽ • Free Soccer Data • Made with ❤️ for soccer fans worldwide</p>
      </div>
    </main>
  );
}