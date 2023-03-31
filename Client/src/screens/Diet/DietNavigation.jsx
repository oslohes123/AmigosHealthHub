import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import Nutrients from './Nutrients';
import DietDashboardScreen from './DietDashboardScreen';
import FoodDetails from './FoodDetails';
import FoodHistory from './FoodHistory';
import foodHistoryDetails from './FoodHistoryDetails';
import themeContext from '../../theme/themeContext';

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
  const { background } = useContext(themeContext);
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: background },
      headerTitleStyle: styles.header,
      headerShadowVisible: false,
    }}
  >
      <Stack.Screen name={dietDashboardName} component={DietDashboardScreen} />
      <Stack.Screen name={nutrientsName} component={Nutrients} />
      <Stack.Screen name={foodDetailsName} component={FoodDetails} />
      <Stack.Screen name={foodHistoryName} component={FoodHistory} />
      <Stack.Screen name={foodHistoryDetailsName} component={foodHistoryDetails} />

    </Stack.Navigator>
  );
}
