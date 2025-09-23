import { NextRequest, NextResponse } from 'next/server';
import { LEAGUES } from '@/core/leagues';
import { getStandingsFromApiFootball, getStandingsFromFootballData } from '@/core/fetchers';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  const league = LEAGUES.find(l => l.key === slug);
  
  if (!league) {
    return NextResponse.json({ error: 'league not found' }, { status: 404 });
  }
  
  let table = [];
  try {
    if (league.provider.apiFootball && process.env.API_FOOTBALL_KEY) {
      const { leagueId, season } = league.provider.apiFootball;
      table = await getStandingsFromApiFootball(leagueId, season);
    } else if (league.provider.footballData && process.env.FOOTBALL_DATA_KEY) {
      const { competition, season } = league.provider.footballData;
      table = await getStandingsFromFootballData(competition, season);
    }
  } catch (error) {
    console.error('Error fetching standings:', error);
  }
  
  return NextResponse.json(table);
}