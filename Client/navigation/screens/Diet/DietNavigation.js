import { createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer } from "react-navigation";
import Nutrients from './Nutrients';
import DietDashboardScreen from './DietDashboardScreen';
// import FoodSearch from './FoodSearch';
import FoodDetails from './FoodDetails';
import Settings from './Settings';

const Stack = createStackNavigator();

//Screen Names
const dietDashboardName = 'Diet Dashboard'
const nutrientsName = 'Nutrients'
const settingsName = 'Settings'
const foodSearchName = 'Food Search'
const foodDetailsName = 'Food Details'

export default function DietNavigation({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true, headerTitleStyle: styles.header, headerStyle: {backgroundColor: '#3eda9b'}}}>
            <Stack.Screen name={dietDashboardName} component={DietDashboardScreen} />
            <Stack.Screen name={nutrientsName} component={Nutrients} />
            <Stack.Screen name={settingsName} component={Settings} />
            {/* <Stack.Screen name={foodSearchName} component={FoodSearch} /> */}
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