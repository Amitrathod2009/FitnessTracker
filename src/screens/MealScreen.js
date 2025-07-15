import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { ProgressContext } from '../context/ProgressContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { v4 as uuidv4 } from 'uuid';

const MealScreen = ({ navigation }) => {
  const { progress, updateProgress } = useContext(ProgressContext);
  const { control, handleSubmit, reset } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const onSubmit = (data) => {
    const newMeal = {
      id: uuidv4(),
      type: 'Meal',
      title: data.type,
      details: data.ingredients,
      calories: parseInt(data.calories) || 0,
      date: data.date.toISOString(),
    };
    updateProgress({
      meals: [...progress.meals, newMeal],
    });
    reset();
    navigation.goBack();
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Log Meal</Title>
          <Controller
            control={control}
            name="type"
            defaultValue={mealTypes[0]}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                {mealTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            )}
          />
          <Controller
            control={control}
            name="ingredients"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Ingredients or Food Items"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="calories"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Calories"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
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
            Save Meal
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

export default MealScreen;