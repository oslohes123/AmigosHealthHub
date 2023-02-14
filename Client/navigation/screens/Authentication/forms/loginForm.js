import * as Yup from 'yup';

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { Formik } from 'formik';
import React from 'react';
import { globalStyles } from '../../../../styles/global';
import { useLogin } from '../hooks/useLogin';

const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),

    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
            passwordRegex,
            'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)'
        )
});

export const formikLoginForm = () => {
    const { login, isLoading, error } = useLogin();
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                    await login(values.email, values.password);
                }}
                validationSchema={loginSchema}
            >
                {(props) => (
                    <View>
                        {/* {console.log(`error: ${error}`)} */}
                        {/* {console.log(`isLoading: ${isLoading}`)} */}
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Email"
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            keyboardType="email-address"
                        />
                        <Text>{props.errors.email}</Text>

                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <Text>{props.errors.password}</Text>

                        <Button
                            title="Login"
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

// module.exports.loginForm = formikLoginForm;
