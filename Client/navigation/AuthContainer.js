import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from './screens/Authentication/screens/SignUpScreen';
import LogInScreen from './screens/Authentication/screens/LogInScreen';
import AuthDecisionScreen from './screens/Authentication/screens/AuthDecisionScreen';


//Screen Names
const SignUpName = "Sign Up"
const LogInName = "Log In"
const AuthDecisionName = "Welcome"

const Stack = createStackNavigator();

export default function AuthContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialState={AuthDecisionName}>
                <Stack.Screen name={AuthDecisionName} component={AuthDecisionScreen} />
                <Stack.Screen name={SignUpName} component={SignUpScreen} />
                <Stack.Screen name={LogInName} component={LogInScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
}