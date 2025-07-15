import React, { useContext, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Modal, Portal, FAB } from 'react-native-paper';
import { ProgressContext } from '../context/ProgressContext';
import { UserContext } from '../context/UserContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircularProgress from '../components/CircularProgress';

const HomeScreen = ({ navigation }) => {
  const { progress } = useContext(ProgressContext);
  const { user } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  console.log('Progress on HomeScreen:', progress);
  console.log('User on HomeScreen:', user);

  const recentActivities = progress.workouts
    ?.concat(progress.meals || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3) || [];

  const navigationOptions = [
    { name: 'Workout', title: 'Log Workout', icon: 'fitness-center' },
    { name: 'Meal', title: 'Log Meal', icon: 'restaurant' },
    { name: 'Goal', title: 'Set Goals', icon: 'flag' },
    { name: 'Progress', title: 'Track Progress', icon: 'trending-up' },
    { name: 'Profile', title: 'Profile & Settings', icon: 'person' },
  ];

  const renderNavOption = ({ item }) => (
    <TouchableOpacity
      style={styles.navOption}
      onPress={() => {
        setModalVisible(false);
        navigation.navigate(item.name);
      }}
    >
      <Icon name={item.icon} size={24} color="#6200EE" style={styles.navIcon} />
      <Text style={styles.navText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Profile Information</Title>
              <Paragraph>Name: {user.name || 'Not set'}</Paragraph>
              <Paragraph>Age: {user.age || 'Not set'}</Paragraph>
              <Paragraph>Weight: {user.weight ? `${user.weight} kg` : 'Not set'}</Paragraph>
              <Paragraph>Height: {user.height ? `${user.height} cm` : 'Not set'}</Paragraph>
            </Card.Content>
          </Card>
          <View style={{ marginBottom: 30 }}></View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100)} style={styles.progressContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Daily Progress</Title>
              <CircularProgress label="Steps" progress={progress.steps || 0} maxValue={user.stepGoal || 10000} />
              <CircularProgress label="Calories Burned" progress={progress.calories || 0} maxValue={user.calorieGoal || 2000} />
              <CircularProgress label="Active Minutes" progress={progress.activeMinutes || 0} maxValue={user.activeMinutesGoal || 30} />
            </Card.Content>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.recentContainer}>
          <Title style={styles.sectionTitle}>Recent Activities</Title>
          <FlatList
            data={recentActivities}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.activityCard}>
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Paragraph>{item.details} | {item.calories} kcal</Paragraph>
                </Card.Content>
              </Card>
            )}
            ListEmptyComponent={() => <Paragraph>No recent activities</Paragraph>}
            ListFooterComponent={() => (
              <Text
                style={styles.seeMore}
                onPress={() => navigation.navigate('Progress')}
              >
                See More
              </Text>
            )}
            nestedScrollEnabled
          />
        </Animated.View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        >
          Go to Profile
        </Button>
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <FlatList
            data={navigationOptions}
            renderItem={renderNavOption}
            keyExtractor={(item) => item.name}
            style={styles.modalList}
          />
        </Modal>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setModalVisible(true)}
        animated
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { padding: 16, paddingBottom: 80 },
  progressContainer: { marginBottom: 16 },
  card: { padding: 16 },
  recentContainer: { flexGrow: 1 },
  sectionTitle: { marginVertical: 8 },
  activityCard: { marginVertical: 8 },
  seeMore: { color: '#6200EE', textAlign: 'center', marginTop: 8 },
  profileButton: { marginVertical: 16 },
  fab: { position: 'absolute', margin: 16, right: 30, bottom: 0, backgroundColor: '#6200EE', marginBottom: 40 },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  modalList: { maxHeight: 300 },
  navOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  navIcon: { marginRight: 16 },
  navText: { fontSize: 16, color: '#6200EE' },
});

export default HomeScreen;