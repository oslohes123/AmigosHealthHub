import { createStackNavigator } from '@react-navigation/stack';
import WorkoutPlansScreen from "../screens/WorkoutPlansScreen";
import FitnessDashboardScreen from "../screens/FitnessDashboardScreen";
import CreateNewWorkoutScreen from "../screens/CreateNewWorkoutScreen";
import ExerciseInfoScreen from '../screens/ExerciseInfoScreen';
import WorkoutPlanInfoScreen from '../screens/WorkoutPlanInfoScreen';
import WorkoutHistory from '../screens/WorkoutHistoryScreen';
import AddCustomExerciseScreen from '../screens/AddCustomExerciseScreen';


const Stack = createStackNavigator();

//Screen Names
const workoutPlansName = 'Workout Plans'
const fitnessDashboardName = 'Fitness Dashboard'
const createNewWorkoutName = 'Create New Workout'
const exerciseInformationName = 'Exercise Information'
const workoutPlanInfoName = "Workout Plan Information"
const historyName = "Workout History"
const customExerciseName = "Add Custom Exercise"

export default function FitnessNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName={fitnessDashboardName} screenOptions={{ headerShown: true, headerTitleStyle: styles.header, headerStyle: {backgroundColor: '#8bf2f3'} }}>
            <Stack.Screen name={fitnessDashboardName} component={FitnessDashboardScreen} />
            <Stack.Screen name={workoutPlansName} component={WorkoutPlansScreen} />
            <Stack.Screen name={createNewWorkoutName} component={CreateNewWorkoutScreen}/>
            <Stack.Screen name={exerciseInformationName} component={ExerciseInfoScreen} />
            <Stack.Screen name={workoutPlanInfoName} component={WorkoutPlanInfoScreen} />
            <Stack.Screen name={historyName} component={WorkoutHistory} />
            <Stack.Screen name={customExerciseName} component={AddCustomExerciseScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}