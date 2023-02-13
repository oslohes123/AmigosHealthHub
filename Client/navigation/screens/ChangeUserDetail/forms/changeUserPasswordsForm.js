import * as Yup from 'yup';

import { Button, Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import React from 'react';
import { globalStyles } from '../../../../styles/global';
import { useChangeProfilePassword } from '../hooks/useChangeProfilePassword'; 

const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const ChangeUserPasswordSchema = Yup.object().shape({
   old_password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
        passwordRegex,
        'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)'
    ),

    new_password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
        passwordRegex,
        'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)'
    )
});

async function getUserDetails() {
    const jsonData = await AsyncStorage.getItem('user');
    const userEmail = JSON.parse(jsonData);
    console.log(`Email: ${userEmail}`);
    return userEmail;
}

export const formikChangeUserPasswordForm = () => {
    const {changePassword, isLoading, error } = useChangeProfilePassword();
    const userEmail = getUserDetails();
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{
                    old_password: '',
                    new_password: ''
                }}
                onSubmit={async (values) => {
                    await changePassword(
                        userEmail,
                        values.old_password,
                        values.new_password
                    );
                }}
                validationSchema={ChangeUserPasswordSchema}

            >
                {(props) => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Current password:"
                            onChangeText={props.handleChange('old_password')}
                            value={props.values.old_password}
                        />
                        <Text>{props.errors.old_password}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder="New password"
                            onChangeText={props.handleChange('new_password')}
                            value={props.values.new_password}
                        />
                        <Text>{props.errors.new_password}</Text>

                        <Button
                            title="Save details"
                            onPress={props.handleSubmit}
                            disabled={isLoading}
                        />
                        {error && <Text className="error">{error}</Text>}
                    </View>
                )}
            </Formik>
        </View>
    );
};
