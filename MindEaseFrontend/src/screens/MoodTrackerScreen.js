import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL, ENDPOINTS, getAuthHeaders } from '../config/api';

const MoodTrackerScreen = () => {
  const [mood, setMood] = useState(null);
  const [journal, setJournal] = useState('');
  const [insights, setInsights] = useState('');
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState('');
  const moods = ['😊', '🙂', '😐', '😔', '😣'];

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        fetchMoodHistory(storedToken);
      }
    };
    loadToken();
  }, []);

  const fetchMoodHistory = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.MOOD_HISTORY}`, {
        headers: getAuthHeaders(token),
      });
      setHistory(response.data.history);
    } catch (error) {
      console.error('Error fetching mood history:', error);
      Alert.alert('Error', 'Failed to fetch mood history');
    }
  };

  const handleMoodSelect = async (selectedMood) => {
    setMood(selectedMood);
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.MOOD_LOG}`,
        { mood: selectedMood, journal },
        { headers: getAuthHeaders(token) }
      );
      setInsights(response.data.insight);
      fetchMoodHistory(token);
    } catch (error) {
      console.error('Error logging mood:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to log mood');
    }
  };

  const handleDeleteMood = async (moodId) => {
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.MOOD_DELETE(moodId)}`, {
        headers: getAuthHeaders(token),
      });
      Alert.alert('Success', 'Mood entry deleted');
      fetchMoodHistory(token);
    } catch (error) {
      console.error('Error deleting mood:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete mood');
    }
  };

  const handleSubmit = () => {
    if (mood && journal) {
      handleMoodSelect(mood);
    } else {
      Alert.alert('Error', 'Please select a mood and write a journal entry');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        {moods.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.moodButton, mood === emoji && styles.selectedMood]}
            onPress={() => setMood(emoji)}
          >
            <Text style={styles.moodEmoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Journal Entry</Text>
      <TextInput
        style={styles.journalInput}
        multiline
        placeholder="What's on your mind?"
        value={journal}
        onChangeText={setJournal}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Save Entry</Text>
      </TouchableOpacity>
      {insights ? (
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsHeader}>AI Insights</Text>
          <Text style={styles.insightsText}>{insights}</Text>
        </View>
      ) : null}
      <View style={styles.historyContainer}>
        <Text style={styles.historyHeader}>Mood History</Text>
        {history.map((entry) => (
          <View key={entry._id} style={styles.historyItem}>
            <Text>{entry.mood} - {new Date(entry.createdAt).toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => handleDeleteMood(entry._id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E6F0FA' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1A3C6E', marginBottom: 20 },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  moodButton: { padding: 10, borderRadius: 10, backgroundColor: '#FFFFFF' },
  selectedMood: { backgroundColor: '#A3BFFA', borderWidth: 2, borderColor: '#1A3C6E' },
  moodEmoji: { fontSize: 30 },
  label: { fontSize: 18, color: '#1A3C6E', marginBottom: 10 },
  journalInput: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 15, height: 150, textAlignVertical: 'top', marginBottom: 20 },
  submitButton: { backgroundColor: '#1A3C6E', padding: 15, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  insightsContainer: { marginTop: 20, padding: 15, backgroundColor: '#F0F4FF', borderRadius: 10 },
  insightsHeader: { fontSize: 18, fontWeight: 'bold', color: '#1A3C6E' },
  insightsText: { fontSize: 16, color: '#333', marginTop: 5 },
  historyContainer: { marginTop: 20 },
  historyHeader: { fontSize: 18, fontWeight: 'bold', color: '#1A3C6E', marginBottom: 10 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#FFFFFF', borderRadius: 10, marginBottom: 5 },
  deleteText: { color: '#AA3A3A', fontWeight: 'bold' },
});

export default MoodTrackerScreen; 