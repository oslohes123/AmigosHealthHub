import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DietSettings from './DietSettings';
import ExerciseSettings from './ExerciseSettings';
import SleepSettings from './SleepSettings';
import HealthSettings from './HealthSettings';
import Profile from './Profile';
import SettingsDashboard from './SettingsDashboard';
import ChangeUserDetailsScreen from '../ChangeUserDetail/screens/ChangeUserDetailsScreen';
import ChangeUserPasswordScreen from '../ChangeUserDetail/screens/ChangeUserPasswordScreen';
import DeleteAccountScreen from '../ChangeUserDetail/screens/DeleteAccountScreen';

const Stack = createStackNavigator();

// Screen Names
const DietSettingsName = 'Diet Settings';
const ExerciseSettingsName = 'Exercise Settings';
const SleepSettingsName = 'Sleep Settings';
const HealthSettingsName = 'Health Settings';
const ProfileName = 'Profile';
const SettingsDashboardName = 'Settings Dashboard';
const ChangeUserDetailsName = 'Change User Details';
const ChangeUserPasswordName = 'Change User Password';
const DeleteAccountName = 'Delete Account';

const styles = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default function SettingsNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, headerTitleStyle: styles.header, headerStyle: { backgroundColor: '#3eda9b' } }}>
      <Stack.Screen name={SettingsDashboardName} component={SettingsDashboard} />
      <Stack.Screen name={DietSettingsName} component={DietSettings} />
      <Stack.Screen name={ExerciseSettingsName} component={ExerciseSettings} />
      <Stack.Screen name={SleepSettingsName} component={SleepSettings} />
      <Stack.Screen name={HealthSettingsName} component={HealthSettings} />
      <Stack.Screen name={ProfileName} component={Profile} />
      <Stack.Screen name={ChangeUserDetailsName} component={ChangeUserDetailsScreen} />
      <Stack.Screen name={ChangeUserPasswordName} component={ChangeUserPasswordScreen} />
      <Stack.Screen name={DeleteAccountName} component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
}
