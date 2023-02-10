import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FitnessNavigationScreen from './screens/Fitness/FitnessNavigation';
import DashboardNavigationScreen from "./screens/MainDashboard/DashboardNavigation";
import DietScreen from "./screens/Diet/DietScreen";

//Screen Names
const fitnessName = 'Fitness';
const dashboardName = "Dashboard";
const dietName = "Diet";

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
                <Tab.Screen name={dashboardName} component={DashboardNavigationScreen} />
                <Tab.Screen name={fitnessName} component={FitnessNavigationScreen} />
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