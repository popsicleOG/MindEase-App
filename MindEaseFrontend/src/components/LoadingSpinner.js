import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingSpinner = ({
  visible = true,
  message = 'Loading...',
  size = 'large',
  color = '#1A3C6E',
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#1A3C6E',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
