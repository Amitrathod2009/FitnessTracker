import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ProgressContext } from '../context/ProgressContext';
import Animated, { FadeIn } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const { progress } = useContext(ProgressContext);

  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ data: [70, 69.5, 69, 68.5] }],
  };

  const calorieData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{ data: [500, 600, 550, 700, 650] }],
  };

  const mealComposition = [
    { name: 'Protein', value: 40, color: '#FF6384' },
    { name: 'Carbs', value: 35, color: '#36A2EB' },
    { name: 'Fat', value: 25, color: '#FFCE56' },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '6', strokeWidth: '2', stroke: '#6200EE' },
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeIn}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Weight Progress</Title>
            <View style={styles.chartContainer}>
              <LineChart
                data={weightData}
                width={screenWidth - 64}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(200)}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Calorie Intake</Title>
            <View style={styles.chartContainer}>
              <BarChart
                data={calorieData}
                width={screenWidth - 64}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
              />
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(400)}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Meal Composition</Title>
            <View style={styles.chartContainer}>
              <PieChart
                data={mealComposition}
                width={screenWidth - 64}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1, index) => {
                    const colorIndex = typeof index === 'number' && index >= 0 ? index % mealComposition.length : 0;
                    return mealComposition[colorIndex].color || `rgba(98, 0, 238, ${opacity})`;
                  },
                }}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="15"
                style={styles.chart}
              />
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
      <View style={{marginBottom:200}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  card: { 
    marginVertical: 8, 
    overflow: 'hidden', 
    borderRadius: 16 ,
  },
  chartContainer: { 
    marginVertical: 8, 
    alignItems: 'center', 
  },
  chart: { 
    borderRadius: 16 
  },
});

export default ProgressScreen;