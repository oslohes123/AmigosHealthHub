import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation'
import Start from '../start'
import Input from '../input'


const screens = {
    MentalHealthOverview: {
        screen: Start
    },
    ReviewYourDay: {
        screen:Input
    },

}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);