import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Card, Switch } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name,
      age: user.age.toString(),
      weight: user.weight.toString(),
      height: user.height.toString(),
    },
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onSubmit = (data) => {
    updateUser({
      name: data.name,
      age: parseInt(data.age),
      weight: parseFloat(data.weight),
      height: parseFloat(data.height),
    });
    reset(data);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    // Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
    // navigation.navigate('Home');
  };

  const exportData = async () => {
    try {
      const progress = await AsyncStorage.getItem('progress');
      const userData = await AsyncStorage.getItem('user');
      const data = { progress, user: userData };
      Alert.alert('Export Data', 'Data exported as JSON: ' + JSON.stringify(data));
    } catch (e) {
      Alert.alert('Error', 'Failed to export data.');
    }
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Profile</Title>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Name"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Age"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Weight (kg)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Height (cm)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <View style={styles.switchContainer}>
            <Title>Dark Mode</Title>
            <Switch
              value={isDarkMode}
              onValueChange={() => setIsDarkMode(!isDarkMode)}
            />
          </View>
          <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
            Save Profile
          </Button>
          <Button mode="outlined" onPress={exportData} style={styles.button}>
            Export Data
          </Button>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  card: { padding: 16 },
  input: { marginVertical: 8 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  button: { marginVertical: 8 },
});

export default ProfileScreen;