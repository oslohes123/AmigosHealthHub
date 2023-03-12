import { createStackNavigator } from '@react-navigation/stack';
import DietSettings from './DietSettings';
import ExerciseSettings from './ExerciseSettings';
import SleepSettings from './SleepSettings';
import HealthSettings from './HealthSettings';
import Profile from './Profile';
import SettingsDashboard from './SettingsDashboard';

const Stack = createStackNavigator();

//Screen Names
const DietSettingsName = 'Diet Settings'
const ExerciseSettingsName = 'Exercise Settings'
const SleepSettingsName = 'Sleep Settings'
const HealthSettingsName = 'Health Settings'
const ProfileName = 'Profile'
const SettingsDashboardName = 'Settings Dashboard'

export default function SettingsNavigation({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{headerShown: true, headerTitleStyle: styles.header, headerStyle: {backgroundColor: '#8bf2f3'}}}>
            <Stack.Screen name={SettingsDashboardName} component={SettingsDashboard} />
            <Stack.Screen name={DietSettingsName} component={DietSettings} />
            <Stack.Screen name={ExerciseSettingsName} component={ExerciseSettings} />
            <Stack.Screen name={SleepSettingsName} component={SleepSettings} />
            <Stack.Screen name={HealthSettingsName} component={HealthSettings} />
            <Stack.Screen name={ProfileName} component={Profile} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}