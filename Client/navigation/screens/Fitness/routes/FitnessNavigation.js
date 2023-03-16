import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPlansScreen from "../screens/WorkoutPlansScreen";
import FitnessDashboardScreen from "../screens/FitnessDashboardScreen";
import CreateNewWorkoutScreen from "../screens/CreateNewWorkoutScreen";
import ExerciseInfoScreen from "../screens/ExerciseInfoScreen";
import WorkoutPlanInfoScreen from "../screens/WorkoutPlanInfoScreen";
import WorkoutHistory from "../screens/WorkoutHistoryScreen";
import trackedWorkoutInfoScreen from "../screens/TrackedWorkoutInfoScreen";
import Graph from "../screens/Graph";
// import AddCustomExerciseScreen from '../screens/AddCustomExerciseScreen';
import Stats from "../screens/Stats";
import { ThemeContext } from "react-navigation";
const Stack = createStackNavigator();
import { useContext } from "react";

//Screen Names
const workoutPlansName = "Workout Plans";
const fitnessDashboardName = "Fitness Dashboard";
const createNewWorkoutName = "Create New Workout";
const exerciseInformationName = "Exercise Information";
const workoutPlanInfoName = "Workout Plan Information";
const historyName = "Workout History";
const trackedWorkoutInfoName = "Workout Information";
const statsName = "View Stats";
const graphName = "Graph";
// const customExerciseName = "Add Custom Exercise"

export default function FitnessNavigationScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName={fitnessDashboardName}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: styles.header,
        headerStyle: { backgroundColor: "#c2e7fe" },
        // headerStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name={fitnessDashboardName}
        component={FitnessDashboardScreen}
      />
      <Stack.Screen name={workoutPlansName} component={WorkoutPlansScreen} />
      <Stack.Screen
        name={createNewWorkoutName}
        component={CreateNewWorkoutScreen}
      />
      <Stack.Screen
        name={exerciseInformationName}
        component={ExerciseInfoScreen}
      />
      <Stack.Screen
        name={workoutPlanInfoName}
        component={WorkoutPlanInfoScreen}
      />
      <Stack.Screen name={historyName} component={WorkoutHistory} />
      <Stack.Screen
        name={trackedWorkoutInfoName}
        component={trackedWorkoutInfoScreen}
      />
      <Stack.Screen name={statsName} component={Stats} />
      <Stack.Screen name={graphName} component={Graph} />
      {/* <Stack.Screen name={customExerciseName} component={AddCustomExerciseScreen} /> */}
    </Stack.Navigator>
  );
}

const styles = {
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
};
