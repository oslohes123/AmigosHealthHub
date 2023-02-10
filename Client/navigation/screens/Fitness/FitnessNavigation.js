import WorkoutPlansScreen from "./WorkoutPlansScreen";
import FitnessDashboardScreen from "./FitnessDashboardScreen";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//Screen Names
const workoutPlansName = 'Workout Plans'
const fitnessDashboardName = 'Fitness Dashboard'

export default function FitnessNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, headerTitleStyle: styles.header }}>
            <Stack.Screen name={fitnessDashboardName} component={FitnessDashboardScreen} />
            <Stack.Screen name={workoutPlansName} component={WorkoutPlansScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}