import { Button, SafeAreaView } from 'react-native';

import React from 'react';
import formikLoginForm from '../forms/loginForm';

export default function LogInScreen({ navigation }) {
    return (
        <>
            {formikLoginForm()}
            <SafeAreaView
                style={{
                    flex: 2,
                    alignItems: 'center'
                }}
            >
            </SafeAreaView>
        </>
    );
}
