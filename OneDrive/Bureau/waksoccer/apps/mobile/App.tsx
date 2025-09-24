import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, Pressable, View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SITE = 'https://waksoccer.com';

type League = {
  key: string;
  name: string;
  country: string;
};

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

export default function App() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'leagues' | 'live' | 'predictions' | 'chat'>('leagues');
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);
  const [userPrediction, setUserPrediction] = useState({ home: '', away: '' });
  const [chatInput, setChatInput] = useState('');
  const [userName, setUserName] = useState('Fan' + Math.floor(Math.random() * 1000));

  useEffect(() => {
    fetch(`${SITE}/api/leagues`)
      .then(r => r.json())
      .then(data => {
        setLeagues(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leagues:', error);
        setLoading(false);
      });

    // Simulate live matches data
    const mockLiveMatches: LiveMatch[] = [
      { id: '1', homeTeam: 'Manchester United', awayTeam: 'Liverpool', homeScore: 2, awayScore: 1, status: 'live', minute: 67, league: 'Premier League' },
      { id: '2', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', homeScore: 1, awayScore: 1, status: 'live', minute: 45, league: 'La Liga' },
      { id: '3', homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', homeScore: 3, awayScore: 0, status: 'finished', league: 'Bundesliga' },
      { id: '4', homeTeam: 'PSG', awayTeam: 'Marseille', homeScore: 0, awayScore: 0, status: 'upcoming', league: 'Ligue 1' },
      { id: '5', homeTeam: 'Juventus', awayTeam: 'AC Milan', homeScore: 2, awayScore: 2, status: 'live', minute: 78, league: 'Serie A' },
    ];
    setLiveMatches(mockLiveMatches);

    // Simulate live score updates every 30 seconds
    const interval = setInterval(() => {
      setLiveMatches(prev => prev.map(match => {
        if (match.status === 'live' && Math.random() > 0.7) {
          const newMatch = { ...match };
          if (Math.random() > 0.5) {
            newMatch.homeScore += 1;
            // Show goal notification
            Alert.alert('⚽ GOAL!', `${newMatch.homeTeam} scores! ${newMatch.homeScore}-${newMatch.awayScore}`);
          } else {
            newMatch.awayScore += 1;
            Alert.alert('⚽ GOAL!', `${newMatch.awayTeam} scores! ${newMatch.homeScore}-${newMatch.awayScore}`);
          }
          return newMatch;
        }
        return match;
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLeaguePress = (league: League) => {
    console.log('Selected league:', league.name);
    setSelectedLeague(league.key);
    setSelectedTab('live');
  };

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
      Alert.alert('✅ Prediction Saved!', `Your prediction: ${newPrediction.userPrediction}`);
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
      case 'live': return '#16a34a';
      case 'finished': return '#dc2626';
      case 'upcoming': return '#2563eb';
      default: return '#6b7280';
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#16a34a" />
          <Text style={styles.loadingText}>Loading waksoccer ⚽...</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  const filteredMatches = selectedLeague === 'all' 
    ? liveMatches 
    : liveMatches.filter(match => match.league.toLowerCase().includes(selectedLeague.toLowerCase()));

  const filteredChatMessages = selectedLeague === 'all'
    ? chatMessages
    : chatMessages.filter(msg => msg.league === selectedLeague);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>waksoccer ⚽</Text>
        <View style={styles.freeBadge}>
          <Text style={styles.freeBadgeText}>100% FREE</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'leagues' && styles.activeTab]}
          onPress={() => setSelectedTab('leagues')}
        >
          <Text style={[styles.tabText, selectedTab === 'leagues' && styles.activeTabText]}>
            🏆 Leagues
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'live' && styles.activeTab]}
          onPress={() => setSelectedTab('live')}
        >
          <Text style={[styles.tabText, selectedTab === 'live' && styles.activeTabText]}>
            🔴 Live Scores
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'predictions' && styles.activeTab]}
          onPress={() => setSelectedTab('predictions')}
        >
          <Text style={[styles.tabText, selectedTab === 'predictions' && styles.activeTabText]}>
            🎯 Predictions
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'chat' && styles.activeTab]}
          onPress={() => setSelectedTab('chat')}
        >
          <Text style={[styles.tabText, selectedTab === 'chat' && styles.activeTabText]}>
            💬 Fan Chat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'leagues' && (
          <View style={styles.leaguesSection}>
            <Text style={styles.sectionTitle}>Select Your League</Text>
            {leagues.map((league) => (
              <TouchableOpacity 
                key={league.key}
                style={styles.leagueItem}
                onPress={() => handleLeaguePress(league)}
              >
                <Text style={styles.country}>{league.country}</Text>
                <Text style={styles.leagueName}>{league.name}</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedTab === 'live' && (
          <View style={styles.liveSection}>
            <Text style={styles.sectionTitle}>🔴 Live Scores & Updates</Text>
            <Text style={styles.sectionSubtitle}>Real-time match scores with goal notifications</Text>
            
            {filteredMatches.map((match) => (
              <View key={match.id} style={styles.matchCard}>
                <View style={styles.matchHeader}>
                  <Text style={styles.leagueTag}>{match.league}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(match.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(match)}</Text>
                  </View>
                </View>
                
                <View style={styles.matchTeams}>
                  <View style={styles.team}>
                    <Text style={styles.teamName}>{match.homeTeam}</Text>
                    <Text style={styles.score}>{match.homeScore}</Text>
                  </View>
                  
                  <Text style={styles.vs}>VS</Text>
                  
                  <View style={styles.team}>
                    <Text style={styles.teamName}>{match.awayTeam}</Text>
                    <Text style={styles.score}>{match.awayScore}</Text>
                  </View>
                </View>

                {match.status === 'upcoming' && (
                  <TouchableOpacity 
                    style={styles.predictButton}
                    onPress={() => handlePrediction(match)}
                  >
                    <Text style={styles.predictButtonText}>🎯 Make Prediction</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'predictions' && (
          <View style={styles.predictionsSection}>
            <Text style={styles.sectionTitle}>🎯 Match Predictions</Text>
            <Text style={styles.sectionSubtitle}>Your match predictions and results</Text>
            
            {predictions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No predictions yet!</Text>
                <Text style={styles.emptySubtext}>Go to Live Scores and predict upcoming matches</Text>
              </View>
            ) : (
              predictions.map((prediction, index) => (
                <View key={index} style={styles.predictionCard}>
                  <Text style={styles.predictionText}>{prediction.userPrediction}</Text>
                  <Text style={styles.predictionStatus}>⏳ Waiting for result</Text>
                </View>
              ))
            )}
          </View>
        )}

        {selectedTab === 'chat' && (
          <View style={styles.chatSection}>
            <Text style={styles.sectionTitle}>💬 Fan Chat</Text>
            <Text style={styles.sectionSubtitle}>Live match discussions with other fans</Text>
            
            <View style={styles.chatMessages}>
              {filteredChatMessages.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No messages yet!</Text>
                  <Text style={styles.emptySubtext}>Start the conversation about your favorite teams</Text>
                </View>
              ) : (
                filteredChatMessages.map((message) => (
                  <View key={message.id} style={styles.chatMessage}>
                    <Text style={styles.chatUser}>{message.user}</Text>
                    <Text style={styles.chatText}>{message.message}</Text>
                    <Text style={styles.chatTime}>
                      {message.timestamp.toLocaleTimeString()}
                    </Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.chatInput}>
              <TextInput
                style={styles.chatTextInput}
                placeholder="Type your message..."
                value={chatInput}
                onChangeText={setChatInput}
                multiline
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendChatMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Prediction Modal */}
      <Modal
        visible={showPredictionModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPredictionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎯 Make Your Prediction</Text>
            {selectedMatch && (
              <>
                <Text style={styles.modalMatch}>
                  {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                </Text>
                
                <View style={styles.predictionInputs}>
                  <View style={styles.scoreInput}>
                    <Text style={styles.teamLabel}>{selectedMatch.homeTeam}</Text>
                    <TextInput
                      style={styles.scoreInputField}
                      placeholder="0"
                      value={userPrediction.home}
                      onChangeText={(text) => setUserPrediction(prev => ({ ...prev, home: text }))}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                  
                  <Text style={styles.scoreDivider}>-</Text>
                  
                  <View style={styles.scoreInput}>
                    <Text style={styles.teamLabel}>{selectedMatch.awayTeam}</Text>
                    <TextInput
                      style={styles.scoreInputField}
                      placeholder="0"
                      value={userPrediction.away}
                      onChangeText={(text) => setUserPrediction(prev => ({ ...prev, away: text }))}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                </View>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setShowPredictionModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={submitPrediction}
                  >
                    <Text style={styles.submitButtonText}>Submit Prediction</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  freeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  freeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: '#16a34a',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  leaguesSection: {
    flex: 1,
  },
  leagueItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  country: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 3,
  },
  arrow: {
    fontSize: 18,
    color: '#16a34a',
    fontWeight: 'bold',
  },
  liveSection: {
    flex: 1,
  },
  matchCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leagueTag: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  vs: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 16,
  },
  predictButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  predictButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  predictionsSection: {
    flex: 1,
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  predictionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  predictionStatus: {
    fontSize: 12,
    color: '#666',
  },
  chatSection: {
    flex: 1,
  },
  chatMessages: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    minHeight: 200,
    maxHeight: 300,
  },
  chatMessage: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingVertical: 8,
    marginBottom: 8,
  },
  chatUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 2,
  },
  chatText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  chatTime: {
    fontSize: 10,
    color: '#888',
  },
  chatInput: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-end',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chatTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16a34a',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalMatch: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  predictionInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  scoreInput: {
    alignItems: 'center',
    flex: 1,
  },
  teamLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  scoreInputField: {
    borderWidth: 2,
    borderColor: '#16a34a',
    borderRadius: 8,
    width: 60,
    height: 60,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  scoreDivider: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 8,
    marginLeft: 8,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});