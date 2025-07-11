import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dailyTip = 'Try a 5-minute breathing exercise to start your day calmly.';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to MindEase</Text>
      <View style={styles.tipContainer}>
        <Text style={styles.tipHeader}>Daily Mindfulness Tip</Text>
        <Text style={styles.tipText}>{dailyTip}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('MoodTracker')}
        >
          <Text style={styles.actionText}>Log Mood</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Mindfulness')}
        >
          <Text style={styles.actionText}>Meditate Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Community')}
        >
          <Text style={styles.actionText}>Join Community</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressHeader}>Weekly Progress</Text>
        <Text style={styles.progressText}>Moods logged: 4/7 days | Stress: Moderate</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E6F0FA' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1A3C6E', marginBottom: 20 },
  tipContainer: { padding: 15, backgroundColor: '#F0F4FF', borderRadius: 10, marginBottom: 20 },
  tipHeader: { fontSize: 18, fontWeight: 'bold', color: '#1A3C6E' },
  tipText: { fontSize: 16, color: '#333', marginTop: 5 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  actionButton: { backgroundColor: '#1A3C6E', padding: 15, borderRadius: 10, flex: 1, marginHorizontal: 5 },
  actionText: { color: '#FFFFFF', fontSize: 16, textAlign: 'center' },
  progressContainer: { padding: 15, backgroundColor: '#FFFFFF', borderRadius: 10 },
  progressHeader: { fontSize: 18, fontWeight: 'bold', color: '#1A3C6E' },
  progressText: { fontSize: 14, color: '#666', marginTop: 5 },
});

export default HomeScreen; 