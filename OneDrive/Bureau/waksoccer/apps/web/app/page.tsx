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

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<'leagues' | 'live' | 'predictions' | 'chat'>('leagues');
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);
  const [userPrediction, setUserPrediction] = useState({ home: '', away: '' });
  const [chatInput, setChatInput] = useState('');
  const [userName, setUserName] = useState('');
  const [showGoalNotification, setShowGoalNotification] = useState<string | null>(null);

  useEffect(() => {
    // Set random user name
    setUserName('Fan' + Math.floor(Math.random() * 1000));

    // Initialize live matches data
    const mockLiveMatches: LiveMatch[] = [
      { id: '1', homeTeam: 'Manchester United', awayTeam: 'Liverpool', homeScore: 2, awayScore: 1, status: 'live', minute: 67, league: 'Premier League' },
      { id: '2', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', homeScore: 1, awayScore: 1, status: 'live', minute: 45, league: 'La Liga' },
      { id: '3', homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', homeScore: 3, awayScore: 0, status: 'finished', league: 'Bundesliga' },
      { id: '4', homeTeam: 'PSG', awayTeam: 'Marseille', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Ligue 1' },
      { id: '5', homeTeam: 'Juventus', awayTeam: 'AC Milan', homeScore: 2, awayScore: 2, status: 'live', minute: 78, league: 'Serie A' },
      { id: '6', homeTeam: 'Chelsea', awayTeam: 'Arsenal', homeScore: 1, awayScore: 0, status: 'live', minute: 23, league: 'Premier League' },
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
    : liveMatches.filter(match => match.league.toLowerCase().includes(selectedLeague.toLowerCase()));

  const filteredChatMessages = selectedLeague === 'all'
    ? chatMessages
    : chatMessages.filter(msg => msg.league === selectedLeague);

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

      {/* Content Area */}
      <div className="min-h-96">
        {selectedTab === 'leagues' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-6">⚽ Choose Your League</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-green-800 font-medium">🎉 No subscription • No ads • Always free!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEAGUES.map((league) => (
                <div
                  key={league.key}
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedLeague(league.key);
                    setSelectedTab('live');
                  }}
                >
                  <div className="text-sm text-gray-500 mb-2">🌍 {league.country}</div>
                  <div className="font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">⚽</span>
                    {league.name}
                    <span className="ml-auto text-green-500">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'live' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">🔴 Live Scores & Updates</h2>
            <p className="text-gray-600 mb-6">Real-time match scores with goal notifications</p>
            
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