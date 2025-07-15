import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { ProgressContext } from '../context/ProgressContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const WorkoutScreen = ({ navigation }) => {
  const { progress, updateProgress } = useContext(ProgressContext);
  const { control, handleSubmit, reset } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const workoutTypes = ['Running', 'Yoga', 'Gym', 'Cycling', 'Swimming'];

  const onSubmit = (data) => {
    const calories = parseInt(data.calories) || 0;
    const duration = parseInt(data.duration) || 0;
    const newWorkout = {
      id: uuidv4(),
      type: 'Workout',
      title: data.type,
      details: `${duration} min, ${data.details || 'No details'}`,
      calories,
      date: data.date.toISOString(),
    };
    console.log('New Workout:', newWorkout);
    const updatedProgress = {
      workouts: [...progress.workouts, newWorkout],
      calories: progress.calories + calories,
      activeMinutes: progress.activeMinutes + duration,
    };
    updateProgress(updatedProgress);
    console.log('Updated Progress:', updatedProgress);
    reset();
    navigation.navigate('Home');
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Log Workout</Title>
          <Controller
            control={control}
            name="type"
            defaultValue={workoutTypes[0]}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                {workoutTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            )}
          />
          <Controller
            control={control}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Duration (minutes)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="calories"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Calories Burned"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="details"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Details (e.g., reps, sets, distance)"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="Date"
                  value={value.toDateString()}
                  style={styles.input}
                  onFocus={() => setShowDatePicker(true)}
                />
                {showDatePicker && (
                  <DateTimePicker
                    value={value}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      onChange(selectedDate || value);
                    }}
                  />
                )}
              </>
            )}
          />
          <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
            Save Workout
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
  picker: { marginVertical: 8 },
  button: { marginTop: 16 },
});

export default WorkoutScreen;