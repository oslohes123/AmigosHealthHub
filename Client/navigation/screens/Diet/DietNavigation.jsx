import { createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer } from "react-navigation";
import React from 'react';
import Nutrients from './Nutrients';
import DietDashboardScreen from './DietDashboardScreen';
// import FoodSearch from './FoodSearch';
import FoodDetails from './FoodDetails';
// import Settings from './Settings';
import FoodHistory from './FoodHistory';
import foodHistoryDetails from './FoodHistoryDetails';

const Stack = createStackNavigator();

// Screen Names
const dietDashboardName = 'Diet Dashboard';
const nutrientsName = 'Nutrients';
// const settingsName = 'Settings'
// const foodSearchName = 'Food Search'
const foodDetailsName = 'Food Details';
const foodHistoryName = 'Food History';
const foodHistoryDetailsName = 'Food History Details';

const styles = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default function DietNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, headerTitleStyle: styles.header, headerStyle: { backgroundColor: '#3eda9b' } }}>
      <Stack.Screen name={dietDashboardName} component={DietDashboardScreen} />
      <Stack.Screen name={nutrientsName} component={Nutrients} />
      {/* <Stack.Screen name={settingsName} component={Settings} /> */}
      {/* <Stack.Screen name={foodSearchName} component={FoodSearch} /> */}
      <Stack.Screen name={foodDetailsName} component={FoodDetails} />
      <Stack.Screen name={foodHistoryName} component={FoodHistory} />
      <Stack.Screen name={foodHistoryDetailsName} component={foodHistoryDetails} />

    </Stack.Navigator>
  );
}
