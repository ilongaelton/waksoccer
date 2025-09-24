// League page component for individual leagues
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type LiveMatch = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'finished' | 'upcoming';
  minute?: number;
  league: string;
};

type Team = {
  id: string;
  name: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
};

interface LeaguePageProps {
  leagueName: string;
  leagueKey: string;
}

export default function LeaguePage({ leagueName, leagueKey }: LeaguePageProps) {
  const [activeTab, setActiveTab] = useState<'matches' | 'table' | 'stats'>('matches');
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [showGoalNotification, setShowGoalNotification] = useState<string | null>(null);

  // Mock data for different leagues
  const getLeagueTeams = (league: string): Team[] => {
    const teamData: Record<string, Team[]> = {
      'Premier League': [
        { id: '1', name: 'Manchester City', position: 1, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 28, goalsAgainst: 8, goalDifference: 20, points: 25, form: ['W', 'W', 'W', 'D', 'W'] },
        { id: '2', name: 'Arsenal', position: 2, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 24, goalsAgainst: 12, goalDifference: 12, points: 23, form: ['W', 'W', 'D', 'W', 'L'] },
        { id: '3', name: 'Liverpool', position: 3, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 22, goalsAgainst: 10, goalDifference: 12, points: 21, form: ['W', 'D', 'W', 'W', 'D'] },
        { id: '4', name: 'Chelsea', position: 4, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 19, goalsAgainst: 13, goalDifference: 6, points: 20, form: ['W', 'L', 'W', 'W', 'D'] },
        { id: '5', name: 'Manchester United', position: 5, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 18, goalsAgainst: 14, goalDifference: 4, points: 18, form: ['L', 'W', 'D', 'W', 'W'] },
        { id: '6', name: 'Tottenham', position: 6, played: 10, won: 5, drawn: 2, lost: 3, goalsFor: 20, goalsAgainst: 16, goalDifference: 4, points: 17, form: ['W', 'L', 'W', 'L', 'W'] },
        { id: '7', name: 'Newcastle', position: 7, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 15, goalsAgainst: 12, goalDifference: 3, points: 16, form: ['D', 'W', 'D', 'L', 'W'] },
        { id: '8', name: 'Brighton', position: 8, played: 10, won: 4, drawn: 3, lost: 3, goalsFor: 16, goalsAgainst: 15, goalDifference: 1, points: 15, form: ['W', 'D', 'L', 'W', 'D'] },
        { id: '9', name: 'West Ham', position: 9, played: 10, won: 4, drawn: 2, lost: 4, goalsFor: 14, goalsAgainst: 16, goalDifference: -2, points: 14, form: ['L', 'W', 'L', 'D', 'W'] },
        { id: '10', name: 'Aston Villa', position: 10, played: 10, won: 3, drawn: 4, lost: 3, goalsFor: 13, goalsAgainst: 14, goalDifference: -1, points: 13, form: ['D', 'L', 'D', 'W', 'L'] },
      ],
      'La Liga': [
        { id: '1', name: 'Real Madrid', position: 1, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 26, goalsAgainst: 9, goalDifference: 17, points: 25, form: ['W', 'W', 'D', 'W', 'W'] },
        { id: '2', name: 'Barcelona', position: 2, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 25, goalsAgainst: 11, goalDifference: 14, points: 23, form: ['W', 'D', 'W', 'L', 'W'] },
        { id: '3', name: 'Atletico Madrid', position: 3, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 19, goalsAgainst: 8, goalDifference: 11, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '4', name: 'Athletic Bilbao', position: 4, played: 10, won: 5, drawn: 4, lost: 1, goalsFor: 16, goalsAgainst: 10, goalDifference: 6, points: 19, form: ['W', 'D', 'L', 'W', 'D'] },
        { id: '5', name: 'Real Sociedad', position: 5, played: 10, won: 5, drawn: 2, lost: 3, goalsFor: 17, goalsAgainst: 13, goalDifference: 4, points: 17, form: ['W', 'L', 'W', 'W', 'L'] },
      ],
      'Serie A': [
        { id: '1', name: 'Napoli', position: 1, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 21, goalsAgainst: 8, goalDifference: 13, points: 23, form: ['W', 'W', 'D', 'W', 'L'] },
        { id: '2', name: 'Inter Milan', position: 2, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 20, goalsAgainst: 10, goalDifference: 10, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '3', name: 'AC Milan', position: 3, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 12, goalDifference: 6, points: 20, form: ['W', 'L', 'W', 'W', 'D'] },
        { id: '4', name: 'Juventus', position: 4, played: 10, won: 5, drawn: 4, lost: 1, goalsFor: 16, goalsAgainst: 9, goalDifference: 7, points: 19, form: ['D', 'W', 'D', 'L', 'W'] },
        { id: '5', name: 'AS Roma', position: 5, played: 10, won: 5, drawn: 2, lost: 3, goalsFor: 15, goalsAgainst: 13, goalDifference: 2, points: 17, form: ['W', 'L', 'D', 'W', 'W'] },
      ],
      'Bundesliga': [
        { id: '1', name: 'Bayern Munich', position: 1, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 29, goalsAgainst: 10, goalDifference: 19, points: 25, form: ['W', 'W', 'W', 'D', 'L'] },
        { id: '2', name: 'Borussia Dortmund', position: 2, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 22, goalsAgainst: 12, goalDifference: 10, points: 21, form: ['W', 'D', 'W', 'W', 'D'] },
        { id: '3', name: 'RB Leipzig', position: 3, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 20, goalsAgainst: 13, goalDifference: 7, points: 20, form: ['L', 'W', 'W', 'D', 'W'] },
        { id: '4', name: 'Bayer Leverkusen', position: 4, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 18, goalsAgainst: 14, goalDifference: 4, points: 18, form: ['W', 'D', 'L', 'W', 'D'] },
        { id: '5', name: 'Eintracht Frankfurt', position: 5, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 16, goalsAgainst: 13, goalDifference: 3, points: 16, form: ['D', 'W', 'L', 'D', 'W'] },
      ],
      'Ligue 1': [
        { id: '1', name: 'Paris Saint-Germain', position: 1, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 27, goalsAgainst: 8, goalDifference: 19, points: 25, form: ['W', 'W', 'D', 'W', 'L'] },
        { id: '2', name: 'AS Monaco', position: 2, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 19, goalsAgainst: 11, goalDifference: 8, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '3', name: 'Marseille', position: 3, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 12, goalDifference: 6, points: 20, form: ['W', 'L', 'W', 'W', 'D'] },
        { id: '4', name: 'Lyon', position: 4, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 16, goalsAgainst: 13, goalDifference: 3, points: 18, form: ['D', 'W', 'L', 'D', 'W'] },
        { id: '5', name: 'Nice', position: 5, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 14, goalsAgainst: 11, goalDifference: 3, points: 16, form: ['W', 'D', 'D', 'L', 'W'] },
      ],
      'Eredivisie': [
        { id: '1', name: 'Ajax', position: 1, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 26, goalsAgainst: 8, goalDifference: 18, points: 25, form: ['W', 'W', 'D', 'W', 'W'] },
        { id: '2', name: 'PSV', position: 2, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 23, goalsAgainst: 10, goalDifference: 13, points: 23, form: ['W', 'D', 'W', 'L', 'W'] },
        { id: '3', name: 'Feyenoord', position: 3, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 19, goalsAgainst: 9, goalDifference: 10, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '4', name: 'AZ Alkmaar', position: 4, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 16, goalsAgainst: 12, goalDifference: 4, points: 18, form: ['W', 'D', 'L', 'W', 'D'] },
        { id: '5', name: 'FC Twente', position: 5, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 14, goalsAgainst: 11, goalDifference: 3, points: 16, form: ['D', 'W', 'L', 'D', 'W'] },
      ],
      'Primeira Liga': [
        { id: '1', name: 'Benfica', position: 1, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 25, goalsAgainst: 7, goalDifference: 18, points: 25, form: ['W', 'W', 'D', 'W', 'W'] },
        { id: '2', name: 'Porto', position: 2, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 9, goalDifference: 13, points: 23, form: ['W', 'D', 'W', 'L', 'W'] },
        { id: '3', name: 'Sporting CP', position: 3, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 18, goalsAgainst: 8, goalDifference: 10, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '4', name: 'Braga', position: 4, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 15, goalsAgainst: 11, goalDifference: 4, points: 18, form: ['W', 'D', 'L', 'W', 'D'] },
        { id: '5', name: 'Vitoria Guimaraes', position: 5, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 13, goalsAgainst: 10, goalDifference: 3, points: 16, form: ['D', 'W', 'L', 'D', 'W'] },
      ],
      'MLS': [
        { id: '1', name: 'Inter Miami CF', position: 1, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 21, goalsAgainst: 8, goalDifference: 13, points: 23, form: ['W', 'W', 'D', 'W', 'L'] },
        { id: '2', name: 'Los Angeles FC', position: 2, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 19, goalsAgainst: 9, goalDifference: 10, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '3', name: 'Atlanta United', position: 3, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 11, goalDifference: 7, points: 20, form: ['W', 'L', 'W', 'W', 'D'] },
        { id: '4', name: 'Seattle Sounders', position: 4, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 16, goalsAgainst: 12, goalDifference: 4, points: 18, form: ['D', 'W', 'L', 'D', 'W'] },
        { id: '5', name: 'New York City FC', position: 5, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 14, goalsAgainst: 11, goalDifference: 3, points: 16, form: ['W', 'D', 'D', 'L', 'W'] },
      ],
      'Liga MX': [
        { id: '1', name: 'Club América', position: 1, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 20, goalsAgainst: 7, goalDifference: 13, points: 23, form: ['W', 'W', 'D', 'W', 'L'] },
        { id: '2', name: 'Monterrey', position: 2, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 18, goalsAgainst: 8, goalDifference: 10, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '3', name: 'Cruz Azul', position: 3, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 17, goalsAgainst: 10, goalDifference: 7, points: 20, form: ['W', 'L', 'W', 'W', 'D'] },
        { id: '4', name: 'Chivas', position: 4, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 15, goalsAgainst: 11, goalDifference: 4, points: 18, form: ['D', 'W', 'L', 'D', 'W'] },
        { id: '5', name: 'Tigres UANL', position: 5, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 13, goalsAgainst: 10, goalDifference: 3, points: 16, form: ['W', 'D', 'D', 'L', 'W'] },
      ],
      'Brazilian Serie A': [
        { id: '1', name: 'Flamengo', position: 1, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 19, goalsAgainst: 6, goalDifference: 13, points: 23, form: ['W', 'W', 'D', 'W', 'L'] },
        { id: '2', name: 'Palmeiras', position: 2, played: 10, won: 6, drawn: 3, lost: 1, goalsFor: 17, goalsAgainst: 7, goalDifference: 10, points: 21, form: ['D', 'W', 'W', 'D', 'W'] },
        { id: '3', name: 'São Paulo', position: 3, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 16, goalsAgainst: 9, goalDifference: 7, points: 20, form: ['W', 'L', 'W', 'W', 'D'] },
        { id: '4', name: 'Corinthians', position: 4, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 14, goalsAgainst: 10, goalDifference: 4, points: 18, form: ['D', 'W', 'L', 'D', 'W'] },
        { id: '5', name: 'Atlético Mineiro', position: 5, played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 12, goalsAgainst: 9, goalDifference: 3, points: 16, form: ['W', 'D', 'D', 'L', 'W'] },
      ]
    };
    return teamData[league] || [];
  };

  const getLeagueMatches = (league: string): LiveMatch[] => {
    const matchData: Record<string, LiveMatch[]> = {
      'Premier League': [
        { id: '1', homeTeam: 'Manchester City', awayTeam: 'Arsenal', homeScore: 2, awayScore: 1, status: 'live', minute: 67, league: 'Premier League' },
        { id: '2', homeTeam: 'Liverpool', awayTeam: 'Chelsea', homeScore: 1, awayScore: 1, status: 'live', minute: 45, league: 'Premier League' },
        { id: '3', homeTeam: 'Manchester United', awayTeam: 'Tottenham', homeScore: 3, awayScore: 0, status: 'finished', league: 'Premier League' },
        { id: '4', homeTeam: 'Newcastle', awayTeam: 'Brighton', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Premier League' },
        { id: '5', homeTeam: 'West Ham', awayTeam: 'Aston Villa', homeScore: 2, awayScore: 2, status: 'live', minute: 78, league: 'Premier League' },
      ],
      'La Liga': [
        { id: '6', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 1, awayScore: 2, status: 'live', minute: 89, league: 'La Liga' },
        { id: '7', homeTeam: 'Atletico Madrid', awayTeam: 'Athletic Bilbao', homeScore: 1, awayScore: 0, status: 'finished', league: 'La Liga' },
        { id: '8', homeTeam: 'Real Sociedad', awayTeam: 'Valencia', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'La Liga' },
      ],
      'Serie A': [
        { id: '9', homeTeam: 'Napoli', awayTeam: 'Inter Milan', homeScore: 2, awayScore: 1, status: 'live', minute: 56, league: 'Serie A' },
        { id: '10', homeTeam: 'AC Milan', awayTeam: 'Juventus', homeScore: 1, awayScore: 1, status: 'finished', league: 'Serie A' },
        { id: '11', homeTeam: 'AS Roma', awayTeam: 'Lazio', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Serie A' },
      ],
      'Bundesliga': [
        { id: '12', homeTeam: 'Bayern Munich', awayTeam: 'Borussia Dortmund', homeScore: 3, awayScore: 1, status: 'live', minute: 72, league: 'Bundesliga' },
        { id: '13', homeTeam: 'RB Leipzig', awayTeam: 'Bayer Leverkusen', homeScore: 2, awayScore: 0, status: 'finished', league: 'Bundesliga' },
        { id: '14', homeTeam: 'Eintracht Frankfurt', awayTeam: 'Borussia Mönchengladbach', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Bundesliga' },
      ],
      'Ligue 1': [
        { id: '15', homeTeam: 'Paris Saint-Germain', awayTeam: 'AS Monaco', homeScore: 2, awayScore: 0, status: 'live', minute: 34, league: 'Ligue 1' },
        { id: '16', homeTeam: 'Marseille', awayTeam: 'Lyon', homeScore: 1, awayScore: 2, status: 'finished', league: 'Ligue 1' },
        { id: '17', homeTeam: 'Nice', awayTeam: 'Lille', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Ligue 1' },
      ],
      'Eredivisie': [
        { id: '18', homeTeam: 'Ajax', awayTeam: 'PSV', homeScore: 2, awayScore: 1, status: 'live', minute: 67, league: 'Eredivisie' },
        { id: '19', homeTeam: 'Feyenoord', awayTeam: 'AZ Alkmaar', homeScore: 1, awayScore: 0, status: 'finished', league: 'Eredivisie' },
        { id: '20', homeTeam: 'FC Twente', awayTeam: 'FC Utrecht', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Eredivisie' },
      ],
      'Primeira Liga': [
        { id: '21', homeTeam: 'Benfica', awayTeam: 'Porto', homeScore: 1, awayScore: 1, status: 'live', minute: 78, league: 'Primeira Liga' },
        { id: '22', homeTeam: 'Sporting CP', awayTeam: 'Braga', homeScore: 2, awayScore: 0, status: 'finished', league: 'Primeira Liga' },
        { id: '23', homeTeam: 'Vitoria Guimaraes', awayTeam: 'Maritimo', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Primeira Liga' },
      ],
      'MLS': [
        { id: '24', homeTeam: 'Inter Miami CF', awayTeam: 'Los Angeles FC', homeScore: 3, awayScore: 2, status: 'live', minute: 89, league: 'MLS' },
        { id: '25', homeTeam: 'Atlanta United', awayTeam: 'Seattle Sounders', homeScore: 1, awayScore: 0, status: 'finished', league: 'MLS' },
        { id: '26', homeTeam: 'New York City FC', awayTeam: 'Portland Timbers', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'MLS' },
      ],
      'Liga MX': [
        { id: '27', homeTeam: 'Club América', awayTeam: 'Monterrey', homeScore: 2, awayScore: 1, status: 'live', minute: 56, league: 'Liga MX' },
        { id: '28', homeTeam: 'Cruz Azul', awayTeam: 'Chivas', homeScore: 1, awayScore: 1, status: 'finished', league: 'Liga MX' },
        { id: '29', homeTeam: 'Tigres UANL', awayTeam: 'Pumas', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Liga MX' },
      ],
      'Brazilian Serie A': [
        { id: '30', homeTeam: 'Flamengo', awayTeam: 'Palmeiras', homeScore: 1, awayScore: 0, status: 'live', minute: 34, league: 'Brazilian Serie A' },
        { id: '31', homeTeam: 'São Paulo', awayTeam: 'Corinthians', homeScore: 2, awayScore: 1, status: 'finished', league: 'Brazilian Serie A' },
        { id: '32', homeTeam: 'Atlético Mineiro', awayTeam: 'Santos', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Brazilian Serie A' },
      ],
      'Championship': [
        { id: '33', homeTeam: 'Leicester City', awayTeam: 'Leeds United', homeScore: 2, awayScore: 1, status: 'live', minute: 67, league: 'Championship' },
        { id: '34', homeTeam: 'Ipswich Town', awayTeam: 'Southampton', homeScore: 0, awayScore: 1, status: 'finished', league: 'Championship' },
        { id: '35', homeTeam: 'Norwich City', awayTeam: 'Sheffield United', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Championship' },
      ],
      'Ligue 2': [
        { id: '36', homeTeam: 'Bordeaux', awayTeam: 'Saint-Étienne', homeScore: 1, awayScore: 1, status: 'live', minute: 45, league: 'Ligue 2' },
        { id: '37', homeTeam: 'Toulouse', awayTeam: 'Auxerre', homeScore: 2, awayScore: 0, status: 'finished', league: 'Ligue 2' },
        { id: '38', homeTeam: 'Grenoble', awayTeam: 'Caen', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Ligue 2' },
      ],
      'Serie B': [
        { id: '39', homeTeam: 'Parma', awayTeam: 'Cremonese', homeScore: 2, awayScore: 1, status: 'live', minute: 67, league: 'Serie B' },
        { id: '40', homeTeam: 'Venezia', awayTeam: 'Como', homeScore: 1, awayScore: 0, status: 'finished', league: 'Serie B' },
        { id: '41', homeTeam: 'Palermo', awayTeam: 'Brescia', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Serie B' },
      ],
      '2. Bundesliga': [
        { id: '42', homeTeam: 'Hamburger SV', awayTeam: 'St. Pauli', homeScore: 1, awayScore: 1, status: 'live', minute: 78, league: '2. Bundesliga' },
        { id: '43', homeTeam: 'Hannover 96', awayTeam: 'Fortuna Düsseldorf', homeScore: 2, awayScore: 0, status: 'finished', league: '2. Bundesliga' },
        { id: '44', homeTeam: 'Schalke 04', awayTeam: 'Karlsruher SC', homeScore: 0, awayScore: 0, status: 'upcoming', league: '2. Bundesliga' },
      ]
    };
    return matchData[league] || [];
  };

  useEffect(() => {
    // Initialize data
    setTeams(getLeagueTeams(leagueName));
    setLiveMatches(getLeagueMatches(leagueName));

    // Simulate live updates every 45 seconds
    const interval = setInterval(() => {
      setLiveMatches(prev => prev.map(match => {
        if (match.status === 'live' && Math.random() > 0.8) {
          const newMatch = { ...match };
          if (Math.random() > 0.5) {
            newMatch.homeScore += 1;
            setShowGoalNotification(`⚽ GOAL! ${newMatch.homeTeam} scores! ${newMatch.homeScore}-${newMatch.awayScore}`);
          } else {
            newMatch.awayScore += 1;
            setShowGoalNotification(`⚽ GOAL! ${newMatch.awayTeam} scores! ${newMatch.homeScore}-${newMatch.awayScore}`);
          }
          setTimeout(() => setShowGoalNotification(null), 5000);
          return newMatch;
        }
        return match;
      }));
    }, 45000);

    return () => clearInterval(interval);
  }, [leagueName]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500';
      case 'finished': return 'bg-red-500';
      case 'upcoming': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (match: LiveMatch) => {
    switch (match.status) {
      case 'live': return `${match.minute}'`;
      case 'finished': return 'FT';
      case 'upcoming': return 'VS';
      default: return '';
    }
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-yellow-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Goal Notification */}
      {showGoalNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {showGoalNotification}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="text-green-600 hover:text-green-700">← Back to All Leagues</Link>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            🔴 LIVE • 45s Updates
          </span>
        </div>
        <h1 className="text-4xl font-bold text-green-600 mb-2">⚽ {leagueName}</h1>
        <p className="text-gray-600">Live matches, league table, and statistics updated every 45 seconds</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'matches' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          🔴 Live Matches
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'table' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          📊 League Table
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'stats' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          📈 Statistics
        </button>
      </div>

      {/* Content */}
      {activeTab === 'matches' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🔴 Live Matches</h2>
          {liveMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {match.league}
                </span>
                <span className={`${getStatusColor(match.status)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {getStatusText(match)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="font-semibold text-gray-800 mb-2">{match.homeTeam}</div>
                  <div className="text-3xl font-bold text-green-600">{match.homeScore}</div>
                </div>
                
                <div className="text-gray-500 mx-8">VS</div>
                
                <div className="text-center flex-1">
                  <div className="font-semibold text-gray-800 mb-2">{match.awayTeam}</div>
                  <div className="text-3xl font-bold text-green-600">{match.awayScore}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'table' && (
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">📊 League Table</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">P</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">W</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">D</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">L</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">GF</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">GA</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">GD</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pts</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teams.map((team) => (
                    <tr key={team.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{team.position}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{team.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">{team.played}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">{team.won}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">{team.drawn}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">{team.lost}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">{team.goalsFor}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">{team.goalsAgainst}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">{team.goalDifference}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 text-center">{team.points}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-1">
                          {team.form.map((result, index) => (
                            <div
                              key={index}
                              className={`w-5 h-5 rounded-full ${getFormColor(result)} text-white text-xs flex items-center justify-center font-bold`}
                            >
                              {result}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">📈 League Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-3">🏆 Top Scorer</h3>
              <div className="text-2xl font-bold text-green-600">25 Goals</div>
              <div className="text-gray-600">Erling Haaland</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-3">🅰️ Most Assists</h3>
              <div className="text-2xl font-bold text-green-600">12 Assists</div>
              <div className="text-gray-600">Kevin De Bruyne</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-3">🧤 Clean Sheets</h3>
              <div className="text-2xl font-bold text-green-600">8 Clean Sheets</div>
              <div className="text-gray-600">Alisson Becker</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-3">⚽ Goals per Game</h3>
              <div className="text-2xl font-bold text-green-600">2.8</div>
              <div className="text-gray-600">League Average</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-3">🟨 Yellow Cards</h3>
              <div className="text-2xl font-bold text-yellow-600">156</div>
              <div className="text-gray-600">Total this season</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-3">🟥 Red Cards</h3>
              <div className="text-2xl font-bold text-red-600">23</div>
              <div className="text-gray-600">Total this season</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}