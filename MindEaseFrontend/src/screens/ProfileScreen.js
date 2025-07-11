import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL, ENDPOINTS, getAuthHeaders } from '../config/api';

const ProfileScreen = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState('free');
  const [token, setToken] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const status = await AsyncStorage.getItem('subscriptionStatus');
        if (storedToken) setToken(storedToken);
        if (status) setSubscriptionStatus(status);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const handleUpgrade = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.CHECKOUT_SESSION}`,
        {},
        { headers: getAuthHeaders(token) },
      );
      Linking.openURL(response.data.url);
    } catch (error) {
      console.error('Upgrade error:', error);
      if (error.response?.status === 429) {
        Alert.alert('Error', 'Too many requests. Please try again later.');
      } else {
        Alert.alert('Error', 'Failed to start checkout');
      }
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.PORTAL_SESSION}`,
        {},
        { headers: getAuthHeaders(token) },
      );
      Linking.openURL(response.data.url);
    } catch (error) {
      console.error('Manage subscription error:', error);
      if (error.response?.status === 429) {
        Alert.alert('Error', 'Too many requests. Please try again later.');
      } else {
        Alert.alert('Error', 'Failed to open customer portal');
      }
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}${ENDPOINTS.CANCEL_SUBSCRIPTION}`,
        {},
        { headers: getAuthHeaders(token) },
      );
      setSubscriptionStatus('free');
      await AsyncStorage.setItem('subscriptionStatus', 'free');
      Alert.alert('Success', 'Subscription cancelled');
    } catch (error) {
      console.error('Cancel subscription error:', error);
      if (error.response?.status === 429) {
        Alert.alert('Error', 'Too many requests. Please try again later.');
      } else {
        Alert.alert('Error', 'Failed to cancel subscription');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.status}>
        Subscription Status: {subscriptionStatus.toUpperCase()}
      </Text>
      {subscriptionStatus === 'free' && (
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.buttonText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      )}
      {subscriptionStatus === 'premium' && (
        <>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={handleManageSubscription}
          >
            <Text style={styles.buttonText}>Manage Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelSubscription}
          >
            <Text style={styles.buttonText}>Cancel Subscription</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6F0FA',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A3C6E',
    marginBottom: 20,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    color: '#1A3C6E',
    marginBottom: 20,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: '#1A3C6E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  manageButton: {
    backgroundColor: '#3A6EAA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#AA3A3A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;
