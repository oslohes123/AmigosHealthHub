import { Button, SafeAreaView, ScrollView } from 'react-native';

import React from 'react';
import { formikSignUpForm } from '../forms/signupForm';

export default function SignUpScreen({ navigation }) {
    return <ScrollView>{formikSignUpForm()}</ScrollView>;
}
