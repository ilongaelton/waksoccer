export type League = {
  key: string;        // slug
  name: string;
  country: string;
  flag: string;       // country flag emoji
  provider: {
    apiFootball?: { leagueId: number; season: number };
    footballData?: { competition: string; season: string };
  };
};

export const LEAGUES: League[] = [
  // Top 5 European Leagues
  { key: "premier-league", name: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", provider: { apiFootball: { leagueId: 39, season: 2025 }, footballData: { competition: "PL", season: "2025" } } },
  { key: "la-liga", name: "La Liga", country: "Spain", flag: "🇪🇸", provider: { apiFootball: { leagueId: 140, season: 2025 }, footballData: { competition: "PD", season: "2025" } } },
  { key: "bundesliga", name: "Bundesliga", country: "Germany", flag: "🇩🇪", provider: { apiFootball: { leagueId: 78, season: 2025 }, footballData: { competition: "BL1", season: "2025" } } },
  { key: "serie-a", name: "Serie A", country: "Italy", flag: "🇮🇹", provider: { apiFootball: { leagueId: 135, season: 2025 }, footballData: { competition: "SA", season: "2025" } } },
  { key: "ligue-1", name: "Ligue 1", country: "France", flag: "🇫🇷", provider: { apiFootball: { leagueId: 61, season: 2025 }, footballData: { competition: "FL1", season: "2025" } } },
  
  // Second Tier European Leagues
  { key: "championship", name: "Championship", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", provider: { apiFootball: { leagueId: 40, season: 2025 }, footballData: { competition: "ELC", season: "2025" } } },
  { key: "ligue-2", name: "Ligue 2", country: "France", flag: "🇫🇷", provider: { apiFootball: { leagueId: 62, season: 2025 } } },
  { key: "serie-b", name: "Serie B", country: "Italy", flag: "🇮🇹", provider: { apiFootball: { leagueId: 136, season: 2025 } } },
  { key: "2-bundesliga", name: "2. Bundesliga", country: "Germany", flag: "🇩🇪", provider: { apiFootball: { leagueId: 79, season: 2025 } } },
  
  // Other Top European Leagues
  { key: "eredivisie", name: "Eredivisie", country: "Netherlands", flag: "🇳🇱", provider: { apiFootball: { leagueId: 88, season: 2025 }, footballData: { competition: "DED", season: "2025" } } },
  { key: "primeira-liga", name: "Primeira Liga", country: "Portugal", flag: "🇵🇹", provider: { apiFootball: { leagueId: 94, season: 2025 } } },
  { key: "super-league", name: "Super League", country: "Turkey", flag: "🇹🇷", provider: { apiFootball: { leagueId: 203, season: 2025 } } },
  
  // American Leagues
  { key: "mls", name: "MLS", country: "USA", flag: "🇺🇸", provider: { apiFootball: { leagueId: 253, season: 2025 } } },
  { key: "liga-mx", name: "Liga MX", country: "Mexico", flag: "🇲🇽", provider: { apiFootball: { leagueId: 262, season: 2025 } } },
  { key: "brazilian-serie-a", name: "Brazilian Série A", country: "Brazil", flag: "🇧🇷", provider: { apiFootball: { leagueId: 71, season: 2025 }, footballData: { competition: "BSA", season: "2025" } } },
  { key: "argentine-primera", name: "Argentine Primera", country: "Argentina", flag: "🇦🇷", provider: { apiFootball: { leagueId: 128, season: 2025 } } },
  
  // Asian Leagues
  { key: "j1-league", name: "J1 League", country: "Japan", flag: "🇯🇵", provider: { apiFootball: { leagueId: 98, season: 2025 } } },
  { key: "k-league-1", name: "K League 1", country: "South Korea", flag: "🇰🇷", provider: { apiFootball: { leagueId: 292, season: 2025 } } },
  { key: "super-league", name: "Super League", country: "China", flag: "🇨🇳", provider: { apiFootball: { leagueId: 169, season: 2025 } } },
  
  // Oceania
  { key: "a-league", name: "A-League", country: "Australia", flag: "🇦🇺", provider: { apiFootball: { leagueId: 188, season: 2025 } } },
];