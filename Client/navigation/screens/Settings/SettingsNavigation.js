import { createStackNavigator } from "@react-navigation/stack";
import DietSettings from "./DietSettings";
import ExerciseSettings from "./ExerciseSettings";
import SleepSettings from "./SleepSettings";
import HealthSettings from "./HealthSettings";
import Profile from "./Profile";
import SettingsDashboard from "./SettingsDashboard";
import ChangeUserPasswordForm from "../ChangeUserDetail/forms/changeUserPasswordForm";
import DeleteAccountForm from "../ChangeUserDetail/forms/deleteAccountForm";

const Stack = createStackNavigator();

//Screen Names
const DietSettingsName = "Diet Settings";
const ExerciseSettingsName = "Exercise Settings";
const SleepSettingsName = "Sleep Settings";
const HealthSettingsName = "Health Settings";
const ProfileName = "Profile";
const SettingsDashboardName = "Settings Dashboard";
const ChangePasswordName = "Change User Password"
const DeleteAccountName = "Delete Account"

export default function SettingsNavigation({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: styles.header,
        headerStyle: { backgroundColor: "#c2e7fe" },
      }}
    >
      <Stack.Screen
        name={SettingsDashboardName}
        component={SettingsDashboard}
      />
      <Stack.Screen name={DietSettingsName} component={DietSettings} />
      <Stack.Screen name={ExerciseSettingsName} component={ExerciseSettings} />
      <Stack.Screen name={SleepSettingsName} component={SleepSettings} />
      <Stack.Screen name={HealthSettingsName} component={HealthSettings} />
      <Stack.Screen name={ProfileName} component={Profile} />
      <Stack.Screen name={ChangePasswordName} component={ChangeUserPasswordForm} />
      <Stack.Screen name={DeleteAccountName} component={DeleteAccountForm} />
    </Stack.Navigator>
  );
}

const styles = {
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
};
