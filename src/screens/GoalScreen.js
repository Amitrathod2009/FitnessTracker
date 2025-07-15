import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import Animated, { FadeIn } from 'react-native-reanimated';

const GoalScreen = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      weightGoal: user.weightGoal.toString(),
      stepGoal: user.stepGoal.toString(),
      calorieGoal: user.calorieGoal.toString(),
      activeMinutesGoal: user.activeMinutesGoal.toString(),
    },
  });

  const onSubmit = (data) => {
    updateUser({
      weightGoal: parseFloat(data.weightGoal),
      stepGoal: parseInt(data.stepGoal),
      calorieGoal: parseInt(data.calorieGoal),
      activeMinutesGoal: parseInt(data.activeMinutesGoal),
    });
    reset();
    navigation.goBack();
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Set Goals</Title>
          <Controller
            control={control}
            name="weightGoal"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Weight Goal (kg)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="stepGoal"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Daily Step Goal"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="calorieGoal"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Daily Calorie Goal"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="activeMinutesGoal"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Daily Active Minutes Goal"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
            Save Goals
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
  button: { marginTop: 16 },
});

export default GoalScreen;