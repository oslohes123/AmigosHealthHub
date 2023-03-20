import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './DashboardScreen';
import SleepScreen from '../Sleep/SleepScreen';

const Stack = createStackNavigator();

// Screen Names
const dashboardName = 'Dashboard ';
const sleepName = 'Sleep';

export default function DashboardNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={dashboardName}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: styles.header,
      }}
    >
      <Stack.Screen name={dashboardName} component={DashboardScreen} />
      <Stack.Screen name={sleepName} component={SleepScreen} />
    </Stack.Navigator>
  );
}

const styles = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};
