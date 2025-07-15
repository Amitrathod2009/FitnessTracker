import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    steps: 550,
    calories: 6660,
    activeMinutes: 3320,
    workouts: [],
    meals: [],
  });

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem('progress');
        console.log('Loaded progress from AsyncStorage:', storedProgress);
        if (storedProgress) {
          setProgress(JSON.parse(storedProgress));
        } else {
          // Save initial progress to AsyncStorage if none exists
          await AsyncStorage.setItem('progress', JSON.stringify(progress));
          console.log('Initialized AsyncStorage with default progress:', progress);
        }
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    };
    loadProgress();
  }, []);

  const updateProgress = async (newProgress) => {
    const updatedProgress = { ...progress, ...newProgress };
    setProgress(updatedProgress);
    try {
      await AsyncStorage.setItem('progress', JSON.stringify(updatedProgress));
      console.log('Saved progress to AsyncStorage:', updatedProgress);
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};