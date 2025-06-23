import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'http://localhost:5000';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigation = useNavigation();

  const handleAuth = async () => {
    try {
      const endpoint = isRegistering ? '/register' : '/login';
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, { email, password });
      if (!isRegistering) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('subscriptionStatus', response.data.subscriptionStatus);
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Success', 'Registered successfully! Please log in.');
        setIsRegistering(false);
      }
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert('Error', error.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? 'Register' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
        <Text style={styles.authText}>{isRegistering ? 'Register' : 'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E6F0FA', justifyContent: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1A3C6E', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 15, marginBottom: 15, fontSize: 16 },
  authButton: { backgroundColor: '#1A3C6E', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  authText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  toggleText: { color: '#1A3C6E', fontSize: 14, textAlign: 'center' },
});

export default LoginScreen; 