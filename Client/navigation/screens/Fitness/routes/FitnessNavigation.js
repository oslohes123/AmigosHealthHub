import { createStackNavigator } from '@react-navigation/stack';
import WorkoutPlansScreen from "../screens/WorkoutPlansScreen";
import TrackExerciseScreen from "../screens/TrackExerciseScreen";
import FitnessDashboardScreen from "../screens/FitnessDashboardScreen";
import CreateNewWorkoutScreen from "../screens/CreateNewWorkoutScreen";
import ExerciseScreen from "../screens/ExerciseScreen";
import ExerciseInfoScreen from '../screens/ExerciseInfoScreen';
import WorkoutPlanInfoScreen from '../screens/WorkoutPlanInfoScreen';


const Stack = createStackNavigator();

//Screen Names
const workoutPlansName = 'Workout Plans'
const trackExerciseName = "Track Exercise"
const fitnessDashboardName = 'Fitness Dashboard'
const createNewWorkoutName = 'Create New Workout'
const exerciseName = 'Exercise'
const exerciseInformationName = 'Exercise Information'
const workoutPlanInfoName = "Workout Plan Information"

export default function FitnessNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName={fitnessDashboardName} screenOptions={{ headerShown: true, headerTitleStyle: styles.header, headerStyle: {backgroundColor: '#8bf2f3'} }}>
            <Stack.Screen name={fitnessDashboardName} component={FitnessDashboardScreen} />
            <Stack.Screen name={workoutPlansName} component={WorkoutPlansScreen} />
            <Stack.Screen name={trackExerciseName} component={TrackExerciseScreen} />
            <Stack.Screen name={createNewWorkoutName} component={CreateNewWorkoutScreen}/>
            <Stack.Screen name={exerciseName} component={ExerciseScreen} />
            <Stack.Screen name={exerciseInformationName} component={ExerciseInfoScreen} />
            <Stack.Screen name={workoutPlanInfoName} component={WorkoutPlanInfoScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}