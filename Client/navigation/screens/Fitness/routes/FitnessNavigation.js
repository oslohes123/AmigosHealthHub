import { createStackNavigator } from '@react-navigation/stack';
import WorkoutPlansScreen from "../WorkoutPlansScreen";
import TrackExerciseScreen from "../TrackExerciseScreen";
import FitnessDashboardScreen from "../FitnessDashboardScreen";
import CreateNewWorkoutScreen from "../CreateNewWorkoutScreen";
import ExerciseScreen from "../ExerciseScreen";


const Stack = createStackNavigator();

//Screen Names
const workoutPlansName = 'Workout Plans'
const trackExerciseName = "Track Exercise"
const fitnessDashboardName = 'Fitness Dashboard'
const createNewWorkoutName = 'Create New Workout'
const exerciseName = 'Exercise'

export default function FitnessNavigationScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName={fitnessDashboardName} screenOptions={{ headerShown: true, headerTitleStyle: styles.header, headerStyle: {backgroundColor: '#3eda9b'} }}>
            <Stack.Screen name={fitnessDashboardName} component={FitnessDashboardScreen} />
            <Stack.Screen name={workoutPlansName} component={WorkoutPlansScreen} />
            <Stack.Screen name={trackExerciseName} component={TrackExerciseScreen} />
            <Stack.Screen name={createNewWorkoutName} component={CreateNewWorkoutScreen} />
            <Stack.Screen name={exerciseName} component={ExerciseScreen} />
        </Stack.Navigator>
    );
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
}