// Navigation stack to keep track of pages visited, so from input/output screens to dashboard
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Start from '../start';
import rateMentalHealthForm from '../mentalHealthForm';
import outputMentalGraphs from '../mentalGraphs';
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
