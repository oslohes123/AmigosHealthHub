import { createStackNavigator } from '@react-navigation/stack';
import WorkoutPlansScreen from "../WorkoutPlansScreen";
import TrackExerciseScreen from "../TrackExerciseScreen";
import FitnessDashboardScreen from "../FitnessDashboardScreen";
import CreateNewWorkoutScreen from "../CreateNewWorkoutScreen";
import ExerciseScreen from "../ExerciseScreen";
import WorkoutInfoScreen from "../WorkoutPlanInfoScreen";
import FitnessStatsScreen from "../FitnessStatsScreen";


const Stack = createStackNavigator();

//Screen Names
const workoutPlansName = 'Workout Plans'
const trackExerciseName = "Track Exercise"
const fitnessDashboardName = 'Fitness Dashboard'
const createNewWorkoutName = 'Create New Workout'
const exerciseName = 'Exercise'
const workoutInfoName = 'Workout Info'
const statsName = 'Fitness Stats'

export default function FitnessNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName={fitnessDashboardName} screenOptions={{ headerShown: false, headerTitleStyle: styles.header }}>
            <Stack.Screen name={fitnessDashboardName} component={FitnessDashboardScreen} />
            <Stack.Screen name={workoutPlansName} component={WorkoutPlansScreen} />
            <Stack.Screen name={trackExerciseName} component={TrackExerciseScreen} />
            <Stack.Screen name={createNewWorkoutName} component={CreateNewWorkoutScreen} />
            <Stack.Screen name={exerciseName} component={ExerciseScreen} />
            <Stack.Screen name={workoutInfoName} component={WorkoutInfoScreen} />
            <Stack.Screen name={statsName} component={FitnessStatsScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}