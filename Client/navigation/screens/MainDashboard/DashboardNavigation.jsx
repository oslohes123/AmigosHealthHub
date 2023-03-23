import { React, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './DashboardScreen';
import SleepScreen from '../Sleep/SleepScreen';
import themeContext from '../../theme/themeContext';

const Stack = createStackNavigator();

// Screen Names
const dashboardName = 'Dashboard ';
const sleepName = 'Sleep';

const styles = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default function DashboardNavigation() {
  const { background } = useContext(themeContext);
  return (
    <Stack.Navigator
      initialRouteName={dashboardName}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: background },
        headerTitleStyle: styles.header,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name={dashboardName} component={DashboardScreen} />
      <Stack.Screen name={sleepName} component={SleepScreen} />
    </Stack.Navigator>
  );
}
