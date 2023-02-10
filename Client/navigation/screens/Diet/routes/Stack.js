import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Nutrients from '../screens/Nutrients';
import Home from '../screens/home';
import foodSearch from '../screens/foodSearch';
import foodDetails from '../screens/foodDetails';
import Settings from '../screens/Settings';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Food',
            // headerTitleStyle: {
            //     fontSize: 32,
            //     fontWeight: 'bold'
            // },
            //headerStyle: { backgroundColor: '#333'}
        }
    },
    Nutrients: {
        screen: Nutrients
    },
    foodSearch: {
        screen: foodSearch,
        navigationOptions: {
            title: 'Search food',
        }
    },
    foodDetails: {
        screen: foodDetails, 
        navigationOptions: {
            title: 'Nutrition Facts',
        }
    }, 
    Settings: {
        screen: Settings
    }

}

const Stack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: 'lightgrey'},
        headerTitleStyle: {
            fontSize: 32,
            fontWeight: 'bold'
        },
    }
});

export default createAppContainer(Stack);