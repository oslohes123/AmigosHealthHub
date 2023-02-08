import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';


//Screen Names
const SignUpName = "Sign Up"
const LogInName = "Log In"

const Stack = createStackNavigator();

export default function AuthContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialState={SignUpName}>
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