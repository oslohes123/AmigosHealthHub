//Navigation stack to ensure when a user goes back from the input page, they are taken to the dashboard
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Start from "../start";
import { rateMentalHealthForm } from "../mentalHealthForm";
//list screens required for mental section
const screens = {
  MentalHealthOverview: {
    screen: Start,
  },
  ReviewYourDay: {
    screen: rateMentalHealthForm,
  },
};

//make the navigation stack with screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
