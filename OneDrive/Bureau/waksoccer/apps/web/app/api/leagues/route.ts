import { NextResponse } from 'next/server';
import { LEAGUES } from '@/core/leagues';

export function GET() {
  return NextResponse.json(LEAGUES.map(({key, name, country}) => ({key, name, country})));
}