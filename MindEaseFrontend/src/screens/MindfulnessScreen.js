import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const MindfulnessScreen = () => {
  const exercises = [
    { id: 1, title: '5-Minute Breathing', free: true },
    { id: 2, title: 'CBT Anxiety Relief', free: true },
    { id: 3, title: 'Deep Relaxation', free: false },
  ];

  const handleExerciseSelect = exercise => {
    if (exercise.free) {
      Alert.alert('Starting', exercise.title);
    } else {
      Alert.alert(
        'Upgrade Required',
        'Upgrade to Premium to unlock this exercise!',
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mindfulness & CBT Exercises</Text>
      <Text style={styles.recommendation}>Recommended: 5-Minute Breathing</Text>
      {exercises.map(exercise => (
        <TouchableOpacity
          key={exercise.id}
          style={[styles.exerciseButton, !exercise.free && styles.lockedButton]}
          onPress={() => handleExerciseSelect(exercise)}
        >
          <Text style={styles.exerciseText}>
            {exercise.title} {exercise.free ? '' : '(Premium)'}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.streakButton}>
        <Text style={styles.streakText}>Streak: 3 days 🔥</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E6F0FA' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A3C6E',
    marginBottom: 20,
  },
  recommendation: { fontSize: 16, color: '#333', marginBottom: 15 },
  exerciseButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  lockedButton: { backgroundColor: '#E0E0E0' },
  exerciseText: { fontSize: 16, color: '#1A3C6E' },
  streakButton: {
    backgroundColor: '#A3BFFA',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  streakText: { fontSize: 14, color: '#1A3C6E', fontWeight: 'bold' },
});

export default MindfulnessScreen;
