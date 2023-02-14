import { Button, SafeAreaView } from 'react-native';

import React from 'react';
import { formikSignUpForm } from '../forms/signupForm';

export default function SignUpScreen({ navigation }) {
    return (
        <>
            {formikSignUpForm()}
            <SafeAreaView
                style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {/* <Button title={"Log In"} onPress={() => {
                    console.log("go to log in screen.");
                    navigation.navigate("Log In");
                }} /> */}
            </SafeAreaView>
        </>
    );
}
