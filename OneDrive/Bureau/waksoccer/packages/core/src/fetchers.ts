export type StandingRow = {
  rank: number;
  team: { id?: number; name: string; logo?: string };
  played: number; win: number; draw: number; loss: number;
  goalsFor: number; goalsAgainst: number; goalDiff: number;
  points: number;
};

export async function getStandingsFromApiFootball(leagueId: number, season: number): Promise<StandingRow[]> {
  const res = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`, {
    headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! }
  });
  if (!res.ok) throw new Error("API-Football error");
  const json = await res.json();
  const table = json.response?.[0]?.league?.standings?.[0] ?? [];
  return table.map((r: any) => ({
    rank: r.rank,
    team: { id: r.team?.id, name: r.team?.name, logo: r.team?.logo },
    played: r.all?.played, win: r.all?.win, draw: r.all?.draw, loss: r.all?.lose,
    goalsFor: r.all?.goals?.for, goalsAgainst: r.all?.goals?.against,
    goalDiff: r.goalsDiff, points: r.points,
  }));
}

export async function getStandingsFromFootballData(competition: string, season: string): Promise<StandingRow[]> {
  const res = await fetch(`https://api.football-data.org/v4/competitions/${competition}/standings?season=${season}`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_KEY! }
  });
  if (!res.ok) throw new Error("football-data.org error");
  const json = await res.json();
  const table = json.standings?.find((s: any) => s.type === "TOTAL")?.table ?? [];
  return table.map((r: any, i: number) => ({
    rank: r.position ?? i + 1,
    team: { name: r.team?.name, logo: r.team?.crest },
    played: r.playedGames, win: r.won, draw: r.draw, loss: r.lost,
    goalsFor: r.goalsFor, goalsAgainst: r.goalsAgainst, goalDiff: r.goalDifference, points: r.points,
  }));
}