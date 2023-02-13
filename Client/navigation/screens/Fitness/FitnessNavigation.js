import WorkoutPlansScreen from "./WorkoutPlansScreen";
import TrackExerciseScreen from "./TrackExerciseScreen";
import FitnessDashboardScreen from "./FitnessDashboardScreen";
import { createStackNavigator } from '@react-navigation/stack';
import CreateNewWorkout from "./CreateNewWorkoutScreen";
import ExerciseScreen from "./ExerciseScreen";
import WorkoutInfoScreen from "./WorkoutPlanInfoScreen";


const Stack = createStackNavigator();

//Screen Names
const workoutPlansName = 'Workout Plans'
const trackExerciseName = "Track Exercise"
const fitnessDashboardName = 'Fitness Dashboard'
const createNewWorkoutName = 'Create New Workout'
const exerciseName = 'Exercise'
const workoutInfoName = 'Workout Info'

export default function FitnessNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName={fitnessDashboardName} screenOptions={{ headerShown: false, headerTitleStyle: styles.header }}>
            <Stack.Screen name={fitnessDashboardName} component={FitnessDashboardScreen} />
            <Stack.Screen name={workoutPlansName} component={WorkoutPlansScreen} />
            <Stack.Screen name={trackExerciseName} component={TrackExerciseScreen} />
            <Stack.Screen name={createNewWorkoutName} component={CreateNewWorkout} />
            <Stack.Screen name={exerciseName} component={ExerciseScreen} />
            <Stack.Screen name={workoutInfoName} component={WorkoutInfoScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}