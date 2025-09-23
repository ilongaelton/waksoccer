import Link from "next/link";
import { LEAGUES } from "@/core/leagues";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">waksoccer ⚽</h1>
        <p className="text-lg text-green-600 font-semibold mb-2">100% FREE Soccer Data</p>
        <p className="text-gray-600">Live league standings for 20+ major soccer leagues worldwide</p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
        <p className="text-green-800 font-medium">🎉 No subscription required • No credit card needed • Always free!</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">⚽ Choose a League:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LEAGUES.map((l) => (
          <li key={l.key} className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm text-neutral-500 flex items-center">
              <span className="mr-1">🌍</span>{l.country}
            </div>
            <Link href={`/league/${l.key}`} className="text-lg font-semibold hover:underline text-blue-600 flex items-center">
              <span className="mr-2">⚽</span>{l.name}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          ⚡ Powered by real-time soccer data • Updated every few minutes ⚡
        </p>
      </div>
    </main>
  );
}