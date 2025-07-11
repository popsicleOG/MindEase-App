import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const CommunityHubScreen = () => {
  const groups = [
    { id: 1, name: 'Stress at Work', free: true },
    { id: 2, name: 'Mindfulness Enthusiasts', free: true },
    { id: 3, name: 'Therapist-Led Support', free: false },
  ];

  const handleGroupSelect = (group) => {
    if (group.free) {
      Alert.alert('Joining', group.name);
    } else {
      Alert.alert('Upgrade Required', 'Upgrade to Premium to join this group!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Community Hub</Text>
      <Text style={styles.subheader}>Connect with others for support</Text>
      {groups.map((group) => (
        <TouchableOpacity
          key={group.id}
          style={[styles.groupButton, !group.free && styles.lockedButton]}
          onPress={() => handleGroupSelect(group)}
        >
          <Text style={styles.groupText}>
            {group.name} {group.free ? '' : '(Premium)'}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={styles.eventContainer}>
        <Text style={styles.eventHeader}>Upcoming Events</Text>
        <Text style={styles.eventText}>Guided Meditation: Tomorrow, 7 PM</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E6F0FA' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1A3C6E', marginBottom: 10 },
  subheader: { fontSize: 16, color: '#333', marginBottom: 15 },
  groupButton: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 10 },
  lockedButton: { backgroundColor: '#E0E0E0' },
  groupText: { fontSize: 16, color: '#1A3C6E' },
  eventContainer: { padding: 15, backgroundColor: '#F0F4FF', borderRadius: 10 },
  eventHeader: { fontSize: 18, fontWeight: 'bold', color: '#1A3C6E' },
  eventText: { fontSize: 14, color: '#333', marginTop: 5 },
});

export default CommunityHubScreen; 