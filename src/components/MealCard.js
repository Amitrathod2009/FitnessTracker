import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const MealCard = ({ meal }) => {
  return (
    <Animated.View entering={FadeIn}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{meal.title}</Title>
          <Paragraph>{meal.details} | {meal.calories} kcal</Paragraph>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 8 },
});

export default MealCard;