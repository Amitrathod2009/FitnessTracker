import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'User',
    age: 30,
    weight: 70,
    height: 170,
    stepGoal: 10000,
    calorieGoal: 2000,
    activeMinutesGoal: 30,
    weightGoal: 65,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        console.log('Loaded user from AsyncStorage:', storedUser);
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error loading user:', e);
      }
    };
    loadUser();
  }, []);

  const updateUser = async (newUser) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...newUser };
      console.log('Updated user state:', updatedUser);
      return updatedUser;
    });
    try {
      const updatedUser = { ...user, ...newUser };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Saved user to AsyncStorage:', updatedUser);
    } catch (e) {
      console.error('Error saving user:', e);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};