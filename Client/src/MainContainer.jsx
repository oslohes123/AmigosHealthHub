import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { EventRegister } from 'react-native-event-listeners';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardNavigationScreen from './screens/MainDashboard/DashboardNavigation';
import DietNavigation from './screens/Diet/DietNavigation';
import FitnessNavigationScreen from './screens/Fitness/routes/FitnessNavigation';
import MentalNavigationScreen from './screens/Mental/routes/homeStack';
// import Settings from "./screens/Diet/Settings";
import SettingsNavigation from './screens/Settings/SettingsNavigation';
import theme from './theme/theme';
import themeContext from './theme/themeContext';

const styles = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};
const screenHeight = Dimensions.get('window').height;

// Screen Names

const fitnessName = 'Fitness';
const dashboardName = 'Dashboard';
const dietName = 'Diet';
const mentalName = 'Mental';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      'ChangeTheme',
      (data) => {
        setDarkMode(data);
      },
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [darkMode]);

  return (
    <themeContext.Provider
      value={darkMode === true ? theme.dark : theme.light}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <NavigationContainer
            theme={darkMode === true ? DarkTheme : DefaultTheme}
          >
            <Tab.Navigator
              initialRouteName={dashboardName}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  const routeName = route.name;

                  if (routeName === fitnessName) {
                    iconName = focused
                      ? 'pulse'
                      : 'pulse-outline';
                  } else if (routeName === dashboardName) {
                    iconName = focused
                      ? 'home'
                      : 'home-outline';
                  } else if (routeName === dietName) {
                    iconName = focused
                      ? 'nutrition'
                      : 'nutrition-outline';
                  } else if (routeName === mentalName) {
                    iconName = focused
                      ? 'happy'
                      : 'happy-outline';
                  } else if (routeName === settingsName) {
                    iconName = focused
                      ? 'settings'
                      : 'settings-outline';
                  }

                  return (
                    <Ionicons
                      name={iconName}
                      size={size}
                      colour={color}
                    />
                  );
                },
                headerShown: false,
                headerTitleStyle: styles.header,
                tabBarShowLabel: false,
                tabBarStyle: {
                  backgroundColor: '#c2e7fe',
                },
              })}
            >
              <Tab.Screen
                name={dietName}
                component={DietNavigation}
              />
              <Tab.Screen
                name={fitnessName}
                component={FitnessNavigationScreen}
              />
              <Tab.Screen
                name={dashboardName}
                component={DashboardNavigationScreen}
              />
              <Tab.Screen
                name={mentalName}
                component={MentalNavigationScreen}
              />
              <Tab.Screen
                name={settingsName}
                component={SettingsNavigation}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </themeContext.Provider>
  );
}
