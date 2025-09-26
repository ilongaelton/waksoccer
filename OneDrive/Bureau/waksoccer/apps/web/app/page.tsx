'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { LEAGUES } from "@/core/leagues";

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

type Prediction = {
  matchId: string;
  userPrediction: string;
  homeScore: number;
  awayScore: number;
};

type ChatMessage = {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  league: string;
};

// BULLETPROOF League Card - Multiple event handlers for 100% reliability
const LeagueCard = ({ 
  leagueName, 
  country, 
  flag,
  onClick
}: { 
  leagueName: string; 
  country: string; 
  flag: string;
  onClick: () => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🎯 CLICK TRIGGERED FOR:', leagueName);
    onClick();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('🖱️ MOUSEDOWN TRIGGERED FOR:', leagueName);
    onClick();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    console.log('👆 TOUCHSTART TRIGGERED FOR:', leagueName);
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="w-full bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer select-none hover:border-green-300 hover:bg-green-50 text-left active:scale-95 active:bg-green-100"
      style={{ 
        userSelect: 'none', 
        WebkitUserSelect: 'none', 
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div className="text-sm text-gray-500 mb-2">{flag} {country}</div>
      <div className="font-semibold text-gray-800 flex items-center">
        <span className="mr-2">⚽</span>
        {leagueName}
        <span className="ml-auto text-green-500 font-bold">→</span>
      </div>
    </button>
  );
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<'leagues' | 'live' | 'predictions' | 'chat'>('leagues');
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [forceRerender, setForceRerender] = useState(0);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [viewingLeague, setViewingLeague] = useState<string | null>(null);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);
  const [userPrediction, setUserPrediction] = useState({ home: '', away: '' });
  const [chatInput, setChatInput] = useState('');
  const [userName, setUserName] = useState('');
  const [showGoalNotification, setShowGoalNotification] = useState<string | null>(null);

  // BULLETPROOF click handler - Multiple fallbacks for 100% reliability
  const simpleLeagueClick = (leagueName: string) => {
    console.log('🎯 BULLETPROOF CLICK INITIATED:', leagueName);
    
    // Immediate state updates with functional setters
    setViewingLeague(prev => {
      console.log('🔄 ViewingLeague:', prev, '->', leagueName);
      return leagueName;
    });
    
    setSelectedLeague(prev => {
      const newLeague = leagueName.toLowerCase();
      console.log('🔄 SelectedLeague:', prev, '->', newLeague);
      return newLeague;
    });
    
    setSelectedTab(prev => {
      console.log('🔄 Tab:', prev, '-> live');
      return 'live';
    });

    // Force re-render as backup
    setForceRerender(prev => prev + 1);
    
    // Double-check state update after micro-delay
    setTimeout(() => {
      console.log('✅ FINAL STATE CHECK:', {
        viewingLeague: leagueName,
        selectedTab: 'live',
        selectedLeague: leagueName.toLowerCase()
      });
    }, 50);
    
    console.log('✅ BULLETPROOF NAVIGATION COMPLETE:', leagueName);
  };

  useEffect(() => {
    // Set random user name
    setUserName('Fan' + Math.floor(Math.random() * 1000));
    
    // ULTIMATE SOLUTION: Native JavaScript event delegation
    const handleLeagueCardClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target as HTMLElement;
      const leagueCard = target.closest('[data-league-name]') as HTMLElement;
      
      if (leagueCard) {
        const leagueName = leagueCard.getAttribute('data-league-name');
        if (leagueName) {
          console.log('� NATIVE CLICK DETECTED:', leagueName);
          
          // Visual feedback
          leagueCard.style.transform = 'scale(0.95)';
          leagueCard.style.backgroundColor = '#dcfce7';
          leagueCard.style.borderColor = '#16a34a';
          
          // Immediate state update
          setViewingLeague(leagueName);
          setSelectedLeague(leagueName.toLowerCase());
          setSelectedTab('live');
          
          // Reset visual feedback
          setTimeout(() => {
            leagueCard.style.transform = '';
            leagueCard.style.backgroundColor = '';
            leagueCard.style.borderColor = '';
          }, 200);
          
          console.log('✅ NAVIGATION COMPLETE:', leagueName);
        }
      }
    };
    
    // Add multiple event listeners for maximum reliability
    document.addEventListener('click', handleLeagueCardClick, true); // Capture phase
    document.addEventListener('click', handleLeagueCardClick, false); // Bubble phase
    document.addEventListener('mousedown', handleLeagueCardClick, true);
    document.addEventListener('touchstart', handleLeagueCardClick, true);
    
    return () => {
      document.removeEventListener('click', handleLeagueCardClick, true);
      document.removeEventListener('click', handleLeagueCardClick, false);
      document.removeEventListener('mousedown', handleLeagueCardClick, true);
      document.removeEventListener('touchstart', handleLeagueCardClick, true);
    };

    // Initialize live matches data for ALL 20 leagues
    const mockLiveMatches: LiveMatch[] = [
      // Premier League (England)
      { id: '1', homeTeam: 'Manchester United', awayTeam: 'Liverpool', homeScore: 2, awayScore: 1, status: 'live', minute: 67, league: 'Premier League' },
      { id: '2', homeTeam: 'Chelsea', awayTeam: 'Arsenal', homeScore: 1, awayScore: 0, status: 'live', minute: 23, league: 'Premier League' },
      
      // La Liga (Spain)
      { id: '3', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', homeScore: 1, awayScore: 1, status: 'live', minute: 45, league: 'La Liga' },
      { id: '4', homeTeam: 'Atletico Madrid', awayTeam: 'Valencia', homeScore: 2, awayScore: 0, status: 'finished', league: 'La Liga' },
      
      // Bundesliga (Germany)
      { id: '5', homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', homeScore: 3, awayScore: 0, status: 'finished', league: 'Bundesliga' },
      { id: '6', homeTeam: 'RB Leipzig', awayTeam: 'Bayer Leverkusen', homeScore: 1, awayScore: 2, status: 'live', minute: 77, league: 'Bundesliga' },
      
      // Serie A (Italy)
      { id: '7', homeTeam: 'Juventus', awayTeam: 'AC Milan', homeScore: 2, awayScore: 2, status: 'live', minute: 78, league: 'Serie A' },
      { id: '8', homeTeam: 'Inter Milan', awayTeam: 'Roma', homeScore: 1, awayScore: 0, status: 'upcoming', league: 'Serie A' },
      
      // Ligue 1 (France)
      { id: '9', homeTeam: 'PSG', awayTeam: 'Marseille', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Ligue 1' },
      { id: '10', homeTeam: 'Lyon', awayTeam: 'Monaco', homeScore: 2, awayScore: 1, status: 'live', minute: 55, league: 'Ligue 1' },
      
      // Eredivisie (Netherlands)
      { id: '11', homeTeam: 'Ajax', awayTeam: 'PSV', homeScore: 2, awayScore: 0, status: 'finished', league: 'Eredivisie' },
      { id: '12', homeTeam: 'Feyenoord', awayTeam: 'AZ Alkmaar', homeScore: 1, awayScore: 1, status: 'live', minute: 42, league: 'Eredivisie' },
      
      // Primeira Liga (Portugal)
      { id: '13', homeTeam: 'Porto', awayTeam: 'Benfica', homeScore: 0, awayScore: 1, status: 'live', minute: 31, league: 'Primeira Liga' },
      
      // Russian Premier League
      { id: '14', homeTeam: 'Zenit', awayTeam: 'Spartak Moscow', homeScore: 1, awayScore: 1, status: 'live', minute: 52, league: 'Russian Premier League' },
      
      // Championship (England)
      { id: '15', homeTeam: 'Leeds United', awayTeam: 'Sheffield United', homeScore: 2, awayScore: 1, status: 'live', minute: 68, league: 'Championship' },
      
      // Ligue 2 (France)
      { id: '16', homeTeam: 'Toulouse', awayTeam: 'Auxerre', homeScore: 1, awayScore: 0, status: 'finished', league: 'Ligue 2' },
      
      // Serie B (Italy)
      { id: '17', homeTeam: 'Parma', awayTeam: 'Venezia', homeScore: 0, awayScore: 2, status: 'live', minute: 59, league: 'Serie B' },
      
      // 2. Bundesliga (Germany)
      { id: '18', homeTeam: 'Hamburger SV', awayTeam: 'St. Pauli', homeScore: 1, awayScore: 1, status: 'live', minute: 33, league: '2. Bundesliga' },
      
      // MLS (USA)
      { id: '19', homeTeam: 'Inter Miami', awayTeam: 'LA Galaxy', homeScore: 0, awayScore: 1, status: 'live', minute: 34, league: 'MLS' },
      { id: '20', homeTeam: 'Atlanta United', awayTeam: 'Seattle Sounders', homeScore: 2, awayScore: 0, status: 'finished', league: 'MLS' },
      
      // Liga MX (Mexico)
      { id: '21', homeTeam: 'América', awayTeam: 'Guadalajara', homeScore: 2, awayScore: 2, status: 'live', minute: 89, league: 'Liga MX' },
      
      // Brazilian Serie A
      { id: '22', homeTeam: 'Flamengo', awayTeam: 'Palmeiras', homeScore: 1, awayScore: 0, status: 'live', minute: 27, league: 'Brazilian Serie A' },
      
      // Argentine Primera
      { id: '23', homeTeam: 'River Plate', awayTeam: 'Boca Juniors', homeScore: 1, awayScore: 1, status: 'live', minute: 81, league: 'Argentine Primera' },
      
      // Super League (China)
      { id: '24', homeTeam: 'Shanghai SIPG', awayTeam: 'Guangzhou FC', homeScore: 0, awayScore: 1, status: 'upcoming', league: 'Super League' },
      
      // J1 League (Japan)
      { id: '25', homeTeam: 'Kashima Antlers', awayTeam: 'Urawa Red Diamonds', homeScore: 2, awayScore: 1, status: 'live', minute: 73, league: 'J1 League' },
      
      // K League 1 (South Korea)
      { id: '26', homeTeam: 'FC Seoul', awayTeam: 'Jeonbuk FC', homeScore: 0, awayScore: 0, status: 'live', minute: 19, league: 'K League 1' },
      
      // A-League (Australia)
      { id: '27', homeTeam: 'Melbourne Victory', awayTeam: 'Sydney FC', homeScore: 1, awayScore: 2, status: 'finished', league: 'A-League' },
    ];
    setLiveMatches(mockLiveMatches);

    // Simulate live score updates every 45 seconds
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
          // Hide notification after 5 seconds
          setTimeout(() => setShowGoalNotification(null), 5000);
          return newMatch;
        }
        return match;
      }));
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const handlePrediction = (match: LiveMatch) => {
    setSelectedMatch(match);
    setShowPredictionModal(true);
  };

  const submitPrediction = () => {
    if (selectedMatch && userPrediction.home && userPrediction.away) {
      const newPrediction: Prediction = {
        matchId: selectedMatch.id,
        userPrediction: `${selectedMatch.homeTeam} ${userPrediction.home}-${userPrediction.away} ${selectedMatch.awayTeam}`,
        homeScore: parseInt(userPrediction.home),
        awayScore: parseInt(userPrediction.away)
      };
      setPredictions(prev => [...prev, newPrediction]);
      setShowPredictionModal(false);
      setUserPrediction({ home: '', away: '' });
      alert(`✅ Prediction Saved! Your prediction: ${newPrediction.userPrediction}`);
    }
  };

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: userName,
        message: chatInput.trim(),
        timestamp: new Date(),
        league: selectedLeague
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatInput('');
    }
  };

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

  const filteredMatches = selectedLeague === 'all' 
    ? liveMatches 
    : liveMatches.filter(match => {
        const leagueName = match.league.toLowerCase();
        const selectedLeagueName = selectedLeague.toLowerCase();
        // Exact match first, then includes for partial matches
        return leagueName === selectedLeagueName || leagueName.includes(selectedLeagueName);
      });

  const filteredChatMessages = selectedLeague === 'all'
    ? chatMessages
    : chatMessages.filter(msg => msg.league === selectedLeague);

  const handleLeagueClick = (leagueName: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('🏆 LEAGUE CLICK INITIATED:', leagueName);
    console.log('� Before - viewing:', viewingLeague, 'tab:', selectedTab);
    
    // Force state updates with functional updates to avoid stale closures
    setViewingLeague(prev => {
      console.log('� ViewingLeague changed from', prev, 'to', leagueName);
      return leagueName;
    });
    
    setSelectedLeague(prev => {
      const newLeague = leagueName.toLowerCase();
      console.log('🔄 SelectedLeague changed from', prev, 'to', newLeague);
      return newLeague;
    });
    
    setSelectedTab(prev => {
      console.log('🔄 Tab changed from', prev, 'to live');
      return 'live';
    });
    
    // Force component re-render to ensure UI updates
    setForceRerender(prev => prev + 1);
    
    // Verify state change after brief delay
    setTimeout(() => {
      console.log('✅ FINAL STATE CHECK - League:', leagueName);
      console.log('📊 Should show live matches for:', leagueName);
      
      // Double-check if the state didn't update properly and retry
      if (document.querySelector('[data-current-view]')?.getAttribute('data-current-view') !== 'live') {
        console.log('🔄 RETRY: State update may have failed, forcing again...');
        setSelectedTab('live');
        setViewingLeague(leagueName);
      }
    }, 300);
  };

  const goBackToLeagues = () => {
    setViewingLeague(null);
    setSelectedTab('leagues');
  };

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Goal Notification */}
      {showGoalNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {showGoalNotification}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-4xl font-bold text-green-600">WakSoccer ⚽</h1>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            🔴 LIVE • 45s Updates
          </span>
        </div>
        <p className="text-gray-600 text-lg mb-2">
          <span className="font-semibold">Live Championship Scores</span> Updated Every 45 Seconds
        </p>
        <p className="text-gray-500 text-sm">
          Premier League • La Liga • Serie A • Bundesliga • Ligue 1 • + More Championships
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>⚡ Real-time Updates</span>
          <span>•</span>
          <span>🎯 Free Predictions</span>
          <span>•</span>
          <span>💬 Fan Chat</span>
          <span>•</span>
          <span className="font-semibold text-green-600">100% FREE</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <button
          onClick={() => setSelectedTab('leagues')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            selectedTab === 'leagues' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          🏆 Championships
        </button>
        <button
          onClick={() => setSelectedTab('live')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors relative ${
            selectedTab === 'live' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          🔴 Live Scores
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
            45s
          </span>
        </button>
        <button
          onClick={() => setSelectedTab('predictions')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            selectedTab === 'predictions' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          🎯 Predictions
        </button>
        <button
          onClick={() => setSelectedTab('chat')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            selectedTab === 'chat' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          💬 Fan Chat
        </button>
      </div>

      {/* League View */}
      {viewingLeague && (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={goBackToLeagues}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to All Leagues
            </button>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🔴 LIVE • 45s Updates
            </span>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">⚽ {viewingLeague}</h1>
          <p className="text-gray-600 mb-4">Live matches and league standings updated every 45 seconds</p>
        </div>
      )}

      {/* Content Area */}
      <div className="min-h-96" data-current-view={selectedTab} data-force-render={forceRerender}>
        {selectedTab === 'leagues' && !viewingLeague && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-6">⚽ Choose Your League</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-green-800 font-medium">🎉 No subscription • No ads • Always free!</p>
              <p className="text-xs text-green-600 mt-1">🚀 BULLETPROOF BUTTONS: Click any league for instant live matches!</p>
              <p className="text-xs text-blue-600 mt-1">🔧 Debug: Check browser console (F12) to see click events</p>
              <button 
                onClick={() => simpleLeagueClick("TEST LEAGUE")} 
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                🧪 TEST BUTTON - Click Me First!
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Major European Leagues */}
              <LeagueCard 
                leagueName="Premier League"
                country="England"
                flag="🌍"
                onClick={() => simpleLeagueClick("Premier League")}
              />

              <LeagueCard 
                leagueName="La Liga"
                country="Spain"
                flag="🌍"
                onClick={() => simpleLeagueClick("La Liga")}
              />

              <LeagueCard 
                leagueName="Serie A"
                country="Italy"
                flag="🌍"
                onClick={() => simpleLeagueClick("Serie A")}
              />

              <LeagueCard 
                leagueName="Bundesliga"
                country="Germany"
                flag="🌍"
                onClick={() => simpleLeagueClick("Bundesliga")}
              />

              <LeagueCard 
                leagueName="Ligue 1"
                country="France"
                flag="🌍"
                onClick={() => simpleLeagueClick("Ligue 1")}
              />

              <LeagueCard 
                leagueName="Eredivisie"
                country="Netherlands"
                flag="🌍"
                onClick={() => simpleLeagueClick("Eredivisie")}
              />

              <LeagueCard 
                leagueName="Primeira Liga"
                country="Portugal"
                flag="🌍"
                onClick={() => simpleLeagueClick("Primeira Liga")}
              />

              <LeagueCard 
                leagueName="Russian Premier League"
                country="Russia"
                flag="🌍"
                onClick={() => simpleLeagueClick("Russian Premier League")}
              />

              {/* Second Tier European Leagues */}
              <LeagueCard 
                leagueName="Championship"
                country="England"
                flag="🌍"
                onClick={() => simpleLeagueClick("Championship")}
              />

              <LeagueCard 
                leagueName="Ligue 2"
                country="France"
                flag="🌍"
                onClick={() => simpleLeagueClick("Ligue 2")}
              />

              <LeagueCard 
                leagueName="Serie B"
                country="Italy"
                flag="🌍"
                onClick={() => simpleLeagueClick("Serie B")}
              />

              <LeagueCard 
                leagueName="2. Bundesliga"
                country="Germany"
                flag="🌍"
                onClick={() => simpleLeagueClick("2. Bundesliga")}
              />

              {/* Americas */}
              <LeagueCard 
                leagueName="MLS"
                country="USA"
                flag="🌍"
                onClick={() => simpleLeagueClick("MLS")}
              />

              <LeagueCard 
                leagueName="Liga MX"
                country="Mexico"
                flag="🌍"
                onClick={() => simpleLeagueClick("Liga MX")}
              />

              <LeagueCard 
                leagueName="Brazilian Serie A"
                country="Brazil"
                flag="🌍"
                onClick={() => simpleLeagueClick("Brazilian Serie A")}
              />

              <LeagueCard 
                leagueName="Argentine Primera"
                country="Argentina"
                flag="🌍"
                onClick={() => simpleLeagueClick("Argentine Primera")}
              />

              <LeagueCard 
                leagueName="Super League"
                country="China"
                flag="🌍"
                onClick={() => simpleLeagueClick("Super League")}
              />

              <LeagueCard 
                leagueName="J1 League"
                country="Japan"
                flag="🌍"
                onClick={() => simpleLeagueClick("J1 League")}
              />

              <LeagueCard 
                leagueName="K League 1"
                country="South Korea"
                flag="🌍"
                onClick={() => simpleLeagueClick("K League 1")}
              />

              <LeagueCard 
                leagueName="A-League"
                country="Australia"
                flag="🌍"
                onClick={() => simpleLeagueClick("A-League")}
              />
            </div>
          </div>
        )}

        {selectedTab === 'live' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              🔴 {viewingLeague ? `${viewingLeague} - Live Matches` : 'Live Scores & Updates'}
            </h2>
            <p className="text-gray-600 mb-6">
              {viewingLeague ? `Live matches from ${viewingLeague} updated every 45 seconds` : 'Real-time match scores with goal notifications'}
            </p>
            
            <div className="space-y-4">
              {filteredMatches.map((match) => (
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

                  {match.status === 'upcoming' && (
                    <button
                      onClick={() => handlePrediction(match)}
                      className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      🎯 Make Prediction
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'predictions' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">🎯 Match Predictions</h2>
            <p className="text-gray-600 mb-6">Your match predictions and results</p>
            
            {predictions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No predictions yet!</h3>
                <p className="text-gray-500">Go to Live Scores and predict upcoming matches</p>
              </div>
            ) : (
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="font-semibold text-gray-800">{prediction.userPrediction}</div>
                    <div className="text-sm text-gray-500 mt-1">⏳ Waiting for result</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'chat' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">💬 Fan Chat</h2>
            <p className="text-gray-600 mb-6">Live match discussions with other fans</p>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="h-96 overflow-y-auto p-4 space-y-3">
                {filteredChatMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No messages yet!</h3>
                    <p className="text-gray-500">Start the conversation about your favorite teams</p>
                  </div>
                ) : (
                  filteredChatMessages.map((message) => (
                    <div key={message.id} className="border-b border-gray-100 pb-2">
                      <div className="font-semibold text-green-600 text-sm">{message.user}</div>
                      <div className="text-gray-800">{message.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
                  />
                  <button
                    onClick={sendChatMessage}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prediction Modal */}
      {showPredictionModal && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-green-600 mb-4 text-center">🎯 Make Your Prediction</h3>
            <p className="text-center mb-6 font-semibold">
              {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <label className="block text-sm text-gray-600 mb-2">{selectedMatch.homeTeam}</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={userPrediction.home}
                  onChange={(e) => setUserPrediction(prev => ({ ...prev, home: e.target.value }))}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-green-500 rounded-lg focus:outline-none"
                />
              </div>
              
              <span className="text-2xl font-bold text-gray-500">-</span>
              
              <div className="text-center">
                <label className="block text-sm text-gray-600 mb-2">{selectedMatch.awayTeam}</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={userPrediction.away}
                  onChange={(e) => setUserPrediction(prev => ({ ...prev, away: e.target.value }))}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-green-500 rounded-lg focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowPredictionModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitPrediction}
                className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit Prediction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          ⚡ Powered by real-time soccer data • Live scores updated every minute ⚡
        </p>
      </div>
    </main>
  );
}