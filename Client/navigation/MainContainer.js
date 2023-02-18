import react from "react";
import { SafeAreaView, Text } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FitnessScreen from './screens/Fitness/FitnessNavigation';
import DashboardScreen from "./screens/MainDashboard/DashboardScreen";
import DietScreen from "./screens/Diet/DietScreen";
import MentalScreen from './screens/Mental/manager'



//Screen Names
const fitnessName = 'Fitness';
const workoutPlansName = 'Workout Plans';
const dashboardName = "Dashboard";
const dietName = "Diet";
const mentalName = "Mental"

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={fitnessName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName === fitnessName) {
                            iconName = focused ? 'pulse' : 'pulse-outline'
                        } else if (routeName === dashboardName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (routeName === dietName) {
                            iconName = focused ? 'pizza' : 'pizza-outline'
                        }

                        return <Ionicons name={iconName} size={size} colour={color} />
                    },
                    // headerShown: true,
                    headerTitleStyle: styles.header
                })}>

                <Tab.Screen name={dietName} component={DietScreen} />
                <Tab.Screen name={dashboardName} component={DashboardScreen} />
                <Tab.Screen name={fitnessName} component={FitnessScreen} />
                <Tab.Screen name={mentalName} component={MentalScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    )
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
}