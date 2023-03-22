// Navigation stack to keep track of pages visited, so from input/output screens to dashboard
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Start from '../screens/start';
import rateMentalHealthForm from '../screens/mentalHealthForm';
import outputMentalGraphs from '../screens/mentalGraphs';
// list screens required for mental section
const screens = {
  MentalHealthOverview: {
    screen: Start,
  },
  ReviewYourDay: {
    screen: rateMentalHealthForm,
  },
  ReviewYourPast: {
    screen: outputMentalGraphs,
  },
};

// make the navigation stack with screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
