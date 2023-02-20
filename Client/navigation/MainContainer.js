import react, {useEffect, useState} from "react";
import { SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { EventRegister } from 'react-native-event-listeners'

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FitnessNavigationScreen from './screens/Fitness/routes/FitnessNavigation';
import DashboardScreen from "./screens/MainDashboard/DashboardScreen";
import MentalScreen from './screens/Mental/manager'
import DietNavigation from "./screens/Diet/DietNavigation"

import theme from "./theme/theme";
import themeContext from "./theme/themeContext";

//Screen Names
const fitnessName = 'Fitness';
const workoutPlansName = 'Workout Plans';
const dashboardName = "Dashboard";
const dietName = "Diet";
const mentalName = "Mental"

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
            setDarkMode(data)
        })
        return () => {
            EventRegister.removeAllListeners(listener)
        }
    }, [darkMode])

    return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
            <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
                <Tab.Navigator
                    initialRouteName={dashboardName}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            let routeName = route.name;

                            if (routeName === fitnessName) {
                                iconName = focused ? 'pulse' : 'pulse-outline'
                            } else if (routeName === dashboardName) {
                                iconName = focused ? 'home' : 'home-outline'
                            } else if (routeName === dietName) {
                                iconName = focused ? 'nutrition' : 'nutrition-outline'
                            } else if (routeName === mentalName) {
                                iconName = focused ? 'happy' : 'happy-outline'
                            }


                        return <Ionicons name={iconName} size={size} colour={color} />
                    },
                    headerShown: false,
                    headerTitleStyle: styles.header,
                    tabBarShowLabel: false,
                    tabBarStyle: {paddingTop: 10, backgroundColor: '#3eda9b'}
                })}>

                <Tab.Screen name={dietName} component={DietNavigation} />
                <Tab.Screen name={dashboardName} component={DashboardScreen} />
                <Tab.Screen name={fitnessName} component={FitnessNavigationScreen} />
                <Tab.Screen name={mentalName} component={MentalScreen} />
            </Tab.Navigator>
        </NavigationContainer>

        </View>
    </TouchableWithoutFeedback>
    </themeContext.Provider>

    )
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
}