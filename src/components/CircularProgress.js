import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';
import { Text } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

const CircularProgress = ({ progress, label, maxValue }) => {
  const safeProgress = typeof progress === 'number' && !isNaN(progress) ? progress : 0;
  const safeMaxValue = typeof maxValue === 'number' && maxValue > 0 ? maxValue : 1;
  const progressValue = Math.min(Math.max(safeProgress / safeMaxValue, 0), 1);

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Circle
        progress={progressValue}
        size={100}
        thickness={10}
        color="#6200EE"
        unfilledColor="#E0E0E0"
        borderWidth={0}
        showsText
        textStyle={styles.progressText}
        formatText={() => `${Math.round(progressValue * 100)}%`}
      />
      <Text style={styles.label}>
        {label}: {safeProgress} / {safeMaxValue}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 8 },
  label: { marginTop: 8, fontSize: 16 },
  progressText: { fontSize: 20, color: '#6200EE' },
});

export default CircularProgress;