import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import MoodTrackerScreen from './src/screens/MoodTrackerScreen';
import MindfulnessScreen from './src/screens/MindfulnessScreen';
import CommunityHubScreen from './src/screens/CommunityHubScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#1A3C6E' },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#A3BFFA',
        }}
      >
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ tabBarStyle: { display: 'none' } }}
        />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MoodTracker" component={MoodTrackerScreen} />
        <Tab.Screen name="Mindfulness" component={MindfulnessScreen} />
        <Tab.Screen name="Community" component={CommunityHubScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
