import React from 'react';
import { Card, Title, ProgressBar } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const GoalCard = ({ title, current, goal }) => {
  return (
    <Animated.View entering={FadeIn}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{title}</Title>
          <ProgressBar progress={current / goal} color="#6200EE" />
          <Title>{current} / {goal}</Title>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 8 },
});

export default GoalCard;