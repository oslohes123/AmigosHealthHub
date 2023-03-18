import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Start from "../start";
import { rateMentalHealthForm } from "../mentalHealthForm";

const screens = {
  MentalHealthOverview: {
    screen: Start,
  },
  ReviewYourDay: {
    screen: rateMentalHealthForm,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
