import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';
import DashboardScreen from './DashboardScreen';

const Stack = createStackNavigator();

//Screen Names
const settingsName = 'Settings'
const dashboardName = 'Dashboard'

export default function DashboardNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName= 'Dashboard' screenOptions={{ headerShown: false, headerTitleStyle: styles.header }}>
            <Stack.Screen name={settingsName} component={SettingsScreen} />
            <Stack.Screen name={dashboardName} component={DashboardScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}