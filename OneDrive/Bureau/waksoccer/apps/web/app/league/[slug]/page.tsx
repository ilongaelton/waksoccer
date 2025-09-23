import { notFound } from "next/navigation";
import { LEAGUES } from "@/core/leagues";
import { getStandingsFromApiFootball, getStandingsFromFootballData } from "@/core/fetchers";

export default async function LeaguePage({ params }: { params: { slug: string } }) {
  const league = LEAGUES.find(l => l.key === params.slug);
  if (!league) return notFound();

  let table = [] as Awaited<ReturnType<typeof getStandingsFromApiFootball>>;
  try {
    if (league.provider.apiFootball && process.env.API_FOOTBALL_KEY) {
      const { leagueId, season } = league.provider.apiFootball;
      table = await getStandingsFromApiFootball(leagueId, season);
    } else if (league.provider.footballData && process.env.FOOTBALL_DATA_KEY) {
      const { competition, season } = league.provider.footballData;
      table = await getStandingsFromFootballData(competition, season);
    } else {
      throw new Error("No provider configured");
    }
  } catch (e) {
    // graceful fallback
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold mb-4">{league.country}: {league.name} — Standings</h1>
      {table.length === 0 ? (
        <div className="p-4 bg-yellow-50 border rounded">Standings are unavailable right now. Try again later.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100">
              <tr>
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Team</th>
                <th className="p-2">P</th>
                <th className="p-2">W</th>
                <th className="p-2">D</th>
                <th className="p-2">L</th>
                <th className="p-2">GF</th>
                <th className="p-2">GA</th>
                <th className="p-2">GD</th>
                <th className="p-2">Pts</th>
              </tr>
            </thead>
            <tbody>
              {table.map((r) => (
                <tr key={r.rank} className="border-t">
                  <td className="p-2">{r.rank}</td>
                  <td className="p-2 flex items-center gap-2">
                    {r.team.logo && <img src={r.team.logo} alt="logo" className="h-5 w-5" />}
                    <span>{r.team.name}</span>
                  </td>
                  <td className="p-2 text-center">{r.played}</td>
                  <td className="p-2 text-center">{r.win}</td>
                  <td className="p-2 text-center">{r.draw}</td>
                  <td className="p-2 text-center">{r.loss}</td>
                  <td className="p-2 text-center">{r.goalsFor}</td>
                  <td className="p-2 text-center">{r.goalsAgainst}</td>
                  <td className="p-2 text-center">{r.goalDiff}</td>
                  <td className="p-2 text-center font-semibold">{r.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}