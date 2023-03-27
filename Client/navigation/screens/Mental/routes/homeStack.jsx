// Navigation stack to keep track of pages visited, so from input/output screens to dashboard
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import themeContext from '../../../theme/themeContext';
import Start from '../screens/start';
import RateMentalHealthForm from '../screens/mentalHealthForm';
import OutputMentalGraphs from '../screens/mentalGraphs';

const Stack = createStackNavigator();

// Screen Names
const dashboardName = 'Mental Health Dashboard';
const reviewName = 'Review Your Day';
const historyName = 'Mental History';

const styles = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default function MentalNavigationScreen() {
  const { background } = useContext(themeContext);
  return (
    <Stack.Navigator
      initialRouteName={dashboardName}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: background },
        headerTitleStyle: styles.header,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={dashboardName}
        component={Start}
      />
      <Stack.Screen
        name={reviewName}
        component={RateMentalHealthForm}
      />
      <Stack.Screen
        name={historyName}
        component={OutputMentalGraphs}
      />
    </Stack.Navigator>
  );
}
