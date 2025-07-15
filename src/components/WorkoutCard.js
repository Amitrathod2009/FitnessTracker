import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const WorkoutCard = ({ workout }) => {
  return (
    <Animated.View entering={FadeIn}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{workout.title}</Title>
          <Paragraph>{workout.details} | {workout.calories} kcal</Paragraph>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 8 },
});

export default WorkoutCard;