import { createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer } from "react-navigation";
import Nutrients from '../screens/Nutrients';
import Home from '../screens/home';
import FoodSearch from '../screens/foodSearch';
import FoodDetails from '../screens/foodDetails';
import Settings from '../screens/Settings';

// const screens = {
//     Home: {
//         screen: Home,
//         navigationOptions: {
//             title: 'Food',
//             // headerTitleStyle: {
//             //     fontSize: 32,
//             //     fontWeight: 'bold'
//             // },
//             //headerStyle: { backgroundColor: '#333'}
//         }
//     },
//     Nutrients: {
//         screen: Nutrients
//     },
//     foodSearch: {
//         screen: foodSearch,
//         navigationOptions: {
//             title: 'Search food',
//         }
//     },
//     foodDetails: {
//         screen: foodDetails, 
//         navigationOptions: {
//             title: 'Nutrition Facts',
//         }
//     }, 
//     Settings: {
//         screen: Settings
//     }

// }

// const Stack = createStackNavigator(screens, {
//     defaultNavigationOptions: {
//         headerStyle: { backgroundColor: 'lightgrey'},
//         headerTitleStyle: {
//             fontSize: 32,
//             fontWeight: 'bold'
//         },
//     }
// });

// export default createAppContainer(Stack);

const Stack = createStackNavigator();

//Screen Names
const homeName = 'Diet Dashboard'
const nutrientsName = 'Nutrients'
const settingsName = 'Settings'
const foodSearchName = 'Food Search'
const foodDetailsName = 'Food Details'

export default function DietNavigationStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, headerTitleStyle: styles.header }}>
            <Stack.Screen name={homeName} component={Home} />
            <Stack.Screen name={nutrientsName} component={Nutrients} />
            <Stack.Screen name={settingsName} component={Settings} />
            <Stack.Screen name={foodSearchName} component={FoodSearch} />
            <Stack.Screen name={foodDetailsName} component={FoodDetails} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}