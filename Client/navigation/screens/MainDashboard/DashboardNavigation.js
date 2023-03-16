import DashboardScreen from './DashboardScreen';
import React from 'react';
import SleepScreen from '../Sleep/SleepScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Screen Names
const dashboardName = 'Dashboard Home';
const sleepName = 'Sleep';

export default function DashboardNavigation({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName={dashboardName}
            screenOptions={{
                headerShown: false,
                headerTitleStyle: styles.header
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
        fontWeight: 'bold'
    }
};
