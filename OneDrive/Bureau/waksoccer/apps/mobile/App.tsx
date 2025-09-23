import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, Pressable, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SITE = process.env.EXPO_PUBLIC_SITE_URL ?? 'https://waksoccer.com';

type League = {
  key: string;
  name: string;
  country: string;
};

export default function App() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const handleLeaguePress = (league: League) => {
    // TODO: Navigate to league standings screen
    // For now, just log the selection
    console.log('Selected league:', league.name);
    
    // In a real app, you would navigate to a standings screen
    // and fetch data from `${SITE}/api/standings?slug=${league.key}`
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading leagues...</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>waksoccer ⚽</Text>
        <Text style={styles.freeTag}>100% FREE</Text>
        <Text style={styles.subtitle}>Live league standings • No ads • No subscription</Text>
      </View>
      
      <FlatList
        data={leagues}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.leagueItem}
            onPress={() => handleLeaguePress(item)}
            android_ripple={{ color: '#f0f0f0' }}
          >
            <Text style={styles.country}>{item.country}</Text>
            <Text style={styles.leagueName}>{item.name}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
      
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
    padding: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  freeTag: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  leagueItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  country: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});