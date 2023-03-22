import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Nutrients from './Nutrients';
import DietDashboardScreen from './DietDashboardScreen';
import FoodDetails from './FoodDetails';
import FoodHistory from './FoodHistory';
import foodHistoryDetails from './FoodHistoryDetails';

const Stack = createStackNavigator();

// Screen Names
const dietDashboardName = 'Diet Dashboard';
const nutrientsName = 'Nutrients';
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
      <Stack.Screen name={foodDetailsName} component={FoodDetails} />
      <Stack.Screen name={foodHistoryName} component={FoodHistory} />
      <Stack.Screen name={foodHistoryDetailsName} component={foodHistoryDetails} />

    </Stack.Navigator>
  );
}
