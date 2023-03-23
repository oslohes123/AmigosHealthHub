import { createStackNavigator } from '@react-navigation/stack';
import themeContext from '../../../theme/themeContext';
import { useContext, React } from 'react';
import WorkoutPlansScreen from '../screens/WorkoutPlansScreen';
import FitnessDashboardScreen from '../screens/FitnessDashboardScreen';
import CreateNewWorkoutScreen from '../screens/CreateNewWorkoutScreen';
import ExerciseInfoScreen from '../screens/ExerciseInfoScreen';
import WorkoutPlanInfoScreen from '../screens/WorkoutPlanInfoScreen';
import WorkoutHistory from '../screens/WorkoutHistoryScreen';
import trackedWorkoutInfoScreen from '../screens/TrackedWorkoutInfoScreen';
import Graph from '../screens/Graph';
import OverallStats from '../screens/OverallStats';
import PastWorkoutDetails from '../screens/PastWorkoutDetails';
import Stats from '../screens/Stats';

const Stack = createStackNavigator();

// Screen Names
const workoutPlansName = 'Workout Plans';
const fitnessDashboardName = 'Fitness Dashboard';
const createNewWorkoutName = 'Create New Workout';
const exerciseInformationName = 'Exercise Information';
const workoutPlanInfoName = 'Workout Plan Information';
const historyName = 'Workout History';
const trackedWorkoutInfoName = 'Workout Information';
const statsName = 'View Stats';
const graphName = 'Graph';
const pastWorkoutDetailsName = 'Past Workout Details';
const overallStatsName = 'Overall Stats';

const styles = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default function FitnessNavigationScreen() {
  const { background } = useContext(themeContext);
  return (
    <Stack.Navigator
      initialRouteName={fitnessDashboardName}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: background },
        headerTitleStyle: styles.header,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={fitnessDashboardName}
        component={FitnessDashboardScreen}
      />
      <Stack.Screen
        name={workoutPlansName}
        component={WorkoutPlansScreen}
      />
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
      <Stack.Screen
        name={historyName}
        component={WorkoutHistory}
      />
      <Stack.Screen
        name={trackedWorkoutInfoName}
        component={trackedWorkoutInfoScreen}
      />
      <Stack.Screen
        name={statsName}
        component={Stats}
      />
      <Stack.Screen
        name={graphName}
        component={Graph}
      />
      <Stack.Screen
        name={overallStatsName}
        component={OverallStats}
      />
      <Stack.Screen
        name={pastWorkoutDetailsName}
        component={PastWorkoutDetails}
      />
    </Stack.Navigator>
  );
}
