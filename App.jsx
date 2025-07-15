import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { ProgressProvider } from './src/context/ProgressContext';
import { UserProvider } from './src/context/UserContext';
import HomeScreen from './src/screens/HomeScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import MealScreen from './src/screens/MealScreen';
import GoalScreen from './src/screens/GoalScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <ProgressProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fitness Dashboard' }} />
              <Stack.Screen name="Workout" component={WorkoutScreen} options={{ title: 'Log Workout' }} />
              <Stack.Screen name="Meal" component={MealScreen} options={{ title: 'Log Meal' }} />
              <Stack.Screen name="Goal" component={GoalScreen} options={{ title: 'Set Goals' }} />
              <Stack.Screen name="Progress" component={ProgressScreen} options={{ title: 'Track Progress' }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile & Settings' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ProgressProvider>
      </UserProvider>
    </PaperProvider>
  );
}

