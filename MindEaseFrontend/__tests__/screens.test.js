import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import HomeScreen from '../src/screens/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import MoodTrackerScreen from '../src/screens/MoodTrackerScreen';
import MindfulnessScreen from '../src/screens/MindfulnessScreen';
import CommunityHubScreen from '../src/screens/CommunityHubScreen';
import ProfileScreen from '../src/screens/ProfileScreen';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock axios
jest.mock('axios');

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Screen Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('HomeScreen', () => {
    test('renders correctly with all elements', () => {
      const { getByText } = render(
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>,
      );

      expect(getByText('Welcome to MindEase')).toBeTruthy();
      expect(getByText('Daily Mindfulness Tip')).toBeTruthy();
      expect(getByText('Log Mood')).toBeTruthy();
      expect(getByText('Meditate Now')).toBeTruthy();
      expect(getByText('Join Community')).toBeTruthy();
      expect(getByText('Weekly Progress')).toBeTruthy();
    });

    test('navigates to MoodTracker when Log Mood is pressed', () => {
      const { getByText } = render(
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>,
      );

      fireEvent.press(getByText('Log Mood'));
      expect(mockNavigate).toHaveBeenCalledWith('MoodTracker');
    });

    test('navigates to Mindfulness when Meditate Now is pressed', () => {
      const { getByText } = render(
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>,
      );

      fireEvent.press(getByText('Meditate Now'));
      expect(mockNavigate).toHaveBeenCalledWith('Mindfulness');
    });
  });

  describe('LoginScreen', () => {
    test('renders login form correctly', () => {
      const { getByText, getByPlaceholderText } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>,
      );

      expect(getByText('Need an account? Register')).toBeTruthy();
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Password')).toBeTruthy();
    });

    test('toggles between login and register modes', () => {
      const { getByText } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>,
      );

      // Initially in login mode
      expect(getByText('Need an account? Register')).toBeTruthy();

      // Toggle to register mode
      fireEvent.press(getByText('Need an account? Register'));
      expect(getByText('Already have an account? Login')).toBeTruthy();

      // Toggle back to login mode
      fireEvent.press(getByText('Already have an account? Login'));
      expect(getByText('Need an account? Register')).toBeTruthy();
    });
  });

  describe('MindfulnessScreen', () => {
    test('renders exercises correctly', () => {
      const { getByText } = render(
        <NavigationContainer>
          <MindfulnessScreen />
        </NavigationContainer>,
      );

      expect(getByText('Mindfulness & CBT Exercises')).toBeTruthy();
      expect(getByText('5-Minute Breathing')).toBeTruthy();
      expect(getByText('CBT Anxiety Relief')).toBeTruthy();
      expect(getByText('Deep Relaxation (Premium)')).toBeTruthy();
      expect(getByText('Streak: 3 days 🔥')).toBeTruthy();
    });

    test('handles free exercise selection', () => {
      const { getByText } = render(
        <NavigationContainer>
          <MindfulnessScreen />
        </NavigationContainer>,
      );

      fireEvent.press(getByText('5-Minute Breathing'));
      // Note: Alert.alert is mocked by React Native Testing Library
    });

    test('handles premium exercise selection', () => {
      const { getByText } = render(
        <NavigationContainer>
          <MindfulnessScreen />
        </NavigationContainer>,
      );

      fireEvent.press(getByText('Deep Relaxation (Premium)'));
      // Note: Alert.alert is mocked by React Native Testing Library
    });
  });

  describe('CommunityHubScreen', () => {
    test('renders community groups correctly', () => {
      const { getByText } = render(
        <NavigationContainer>
          <CommunityHubScreen />
        </NavigationContainer>,
      );

      expect(getByText('Community Hub')).toBeTruthy();
      expect(getByText('Connect with others for support')).toBeTruthy();
      expect(getByText('Stress at Work')).toBeTruthy();
      expect(getByText('Mindfulness Enthusiasts')).toBeTruthy();
      expect(getByText('Therapist-Led Support (Premium)')).toBeTruthy();
      expect(getByText('Upcoming Events')).toBeTruthy();
    });

    test('handles free group selection', () => {
      const { getByText } = render(
        <NavigationContainer>
          <CommunityHubScreen />
        </NavigationContainer>,
      );

      fireEvent.press(getByText('Stress at Work'));
      // Note: Alert.alert is mocked by React Native Testing Library
    });

    test('handles premium group selection', () => {
      const { getByText } = render(
        <NavigationContainer>
          <CommunityHubScreen />
        </NavigationContainer>,
      );

      fireEvent.press(getByText('Therapist-Led Support (Premium)'));
      // Note: Alert.alert is mocked by React Native Testing Library
    });
  });

  describe('ProfileScreen', () => {
    test('renders profile information correctly', () => {
      const { getByText } = render(
        <NavigationContainer>
          <ProfileScreen />
        </NavigationContainer>,
      );

      expect(getByText('Profile')).toBeTruthy();
      expect(getByText('Subscription Status: FREE')).toBeTruthy();
      expect(getByText('Upgrade to Premium')).toBeTruthy();
    });

    test('shows upgrade button for free users', () => {
      const { getByText } = render(
        <NavigationContainer>
          <ProfileScreen />
        </NavigationContainer>,
      );

      expect(getByText('Upgrade to Premium')).toBeTruthy();
    });
  });
});
