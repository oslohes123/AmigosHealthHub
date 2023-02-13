import ChangeUserDetailsScreen from '../ChangeUserDetail/ChangeUserDetailsScreen';
import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Screen Names
const settingsName = 'Settings'
const dashboardName = 'Dashboard'
const changeUserDetailsName = 'ChangeUserDetails'

export default function DashboardNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName= 'Dashboard' screenOptions={{ headerShown: false, headerTitleStyle: styles.header }}>
            <Stack.Screen name={settingsName} component={SettingsScreen} />
            <Stack.Screen name={dashboardName} component={DashboardScreen} />
            <Stack.Screen name={changeUserDetailsName} component={ChangeUserDetailsScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}