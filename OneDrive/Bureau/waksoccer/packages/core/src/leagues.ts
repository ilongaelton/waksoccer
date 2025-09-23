export type League = {
  key: string;        // slug
  name: string;
  country: string;
  provider: {
    apiFootball?: { leagueId: number; season: number };
    footballData?: { competition: string; season: string };
  };
};

export const LEAGUES: League[] = [
  { key: "eng-premier", name: "Premier League", country: "England", provider: { apiFootball: { leagueId: 39, season: 2025 }, footballData: { competition: "PL", season: "2025" } } },
  { key: "eng-championship", name: "Championship", country: "England", provider: { apiFootball: { leagueId: 40, season: 2025 }, footballData: { competition: "ELC", season: "2025" } } },
  { key: "fra-ligue1", name: "Ligue 1", country: "France", provider: { apiFootball: { leagueId: 61, season: 2025 }, footballData: { competition: "FL1", season: "2025" } } },
  { key: "ger-bundesliga", name: "Bundesliga", country: "Germany", provider: { apiFootball: { leagueId: 78, season: 2025 }, footballData: { competition: "BL1", season: "2025" } } },
  { key: "ita-seriea", name: "Serie A", country: "Italy", provider: { apiFootball: { leagueId: 135, season: 2025 }, footballData: { competition: "SA", season: "2025" } } },
  { key: "ned-eredivisie", name: "Eredivisie", country: "Netherlands", provider: { apiFootball: { leagueId: 88, season: 2025 }, footballData: { competition: "DED", season: "2025" } } },
  { key: "arm-premier", name: "Premier League", country: "Armenia", provider: { apiFootball: { leagueId: 344, season: 2025 } } },
  { key: "aut-2liga", name: "2. Liga", country: "Austria", provider: { apiFootball: { leagueId: 204, season: 2025 } } },
  { key: "blr-pershaya", name: "Pershaya Liga", country: "Belarus", provider: { apiFootball: { leagueId: 432, season: 2025 } } },
  { key: "bel-pro", name: "Jupiler Pro League", country: "Belgium", provider: { apiFootball: { leagueId: 144, season: 2025 }, footballData: { competition: "BSA", season: "2025" } } },
  { key: "bih-premier", name: "Premijer Liga", country: "Bosnia & Herzegovina", provider: { apiFootball: { leagueId: 63, season: 2025 } } },
  { key: "bra-seriea", name: "Serie A", country: "Brazil", provider: { apiFootball: { leagueId: 71, season: 2025 }, footballData: { competition: "BSA", season: "2025" } } },
  { key: "chn-super", name: "Super League", country: "China", provider: { apiFootball: { leagueId: 169, season: 2025 } } },
  { key: "hrv-hnl", name: "HNL", country: "Croatia", provider: { apiFootball: { leagueId: 419, season: 2025 } } },
  { key: "fra-ligue2", name: "Ligue 2", country: "France", provider: { apiFootball: { leagueId: 62, season: 2025 } } },
  { key: "isr-liga", name: "Ligat ha'Al", country: "Israel", provider: { apiFootball: { leagueId: 267, season: 2025 } } },
  { key: "ita-serieb", name: "Serie B", country: "Italy", provider: { apiFootball: { leagueId: 136, season: 2025 } } },
  { key: "kaz-premier", name: "Premier League", country: "Kazakhstan", provider: { apiFootball: { leagueId: 327, season: 2025 } } },
  { key: "nor-eliteserien", name: "Eliteserien", country: "Norway", provider: { apiFootball: { leagueId: 103, season: 2025 } } },
  { key: "pol-ekstraklasa", name: "Ekstraklasa", country: "Poland", provider: { apiFootball: { leagueId: 106, season: 2025 } } },
];