import ChangeUserDetailsScreen from "../ChangeUserDetail/screens/ChangeUserDetailsScreen";
import ChangeUserPasswordScreen from "../ChangeUserDetail/screens/ChangeUserPasswordScreen";
import DashboardScreen from "./DashboardScreen";
import DeleteAccountScreen from "../ChangeUserDetail/screens/DeleteAccountScreen";
import SettingsScreen from "./SettingsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Stats from "../Fitness/screens/Stats";
import OverallStats from "../Fitness/screens/OverallStats";
import Graph from "../Fitness/screens/Graph";
import PastWorkoutDetails from "../Fitness/screens/PastWorkoutDetails";
const Stack = createStackNavigator();

//Screen Names
const settingsName = "Settings";
const dashboardName = "DashboardWelcome";
const changeUserDetailsName = "ChangeUserDetails";
const changeUserPasswordName = "ChangeUserPassword";
const deleteAccount = "DeleteAccount";
const statsName = "View Stats";
const overallStatsName = "Overall Stats";
const graphName = "Graph";
const pastWorkoutDetailsName = "Past Workout Details";

export default function DashboardNavigationScreen({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName={dashboardName}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: styles.header,
      }}
    >
      <Stack.Screen name={settingsName} component={SettingsScreen} />
      <Stack.Screen name={dashboardName} component={DashboardScreen} />
      <Stack.Screen
        name={changeUserDetailsName}
        component={ChangeUserDetailsScreen}
      />
      <Stack.Screen name={statsName} component={Stats} />
      <Stack.Screen
        name={changeUserPasswordName}
        component={ChangeUserPasswordScreen}
      />
      <Stack.Screen name={deleteAccount} component={DeleteAccountScreen} />
      <Stack.Screen name={overallStatsName} component={OverallStats} />
      <Stack.Screen name={graphName} component={Graph} />
      <Stack.Screen name={pastWorkoutDetailsName} component={PastWorkoutDetails} />
    </Stack.Navigator>
  );
}

const styles = {
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
};
