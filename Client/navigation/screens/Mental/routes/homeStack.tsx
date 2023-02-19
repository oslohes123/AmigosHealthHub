import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation'
import Start from '../start'
import Input from '../input'
import Output from '../output'


const screens = {
    MentalHealth: {
        screen: Start
    },
    ReviewYourDay: {
        screen:Input
    },
    ReviewYourPast: {
        screen:Output
    },
}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);