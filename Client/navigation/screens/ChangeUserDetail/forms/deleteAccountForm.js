import * as Yup from 'yup';

import { Button, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import React from 'react';
import { globalStyles } from '../../../../styles/global';
import {deleteAccountWrapper } from '../hooks/deleteAccount'; 


const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const deleteAccountSchema = Yup.object().shape({
   old_password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
        passwordRegex,
        'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)'
    )})


    export const formikChangeUserPasswordForm = () => {
        const {deleteAccount, isLoading, error } = deleteAccountWrapper();
        // const userEmail = getUserDetails();
        return (
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{
                        current_password: '',
                    }}
                    onSubmit={async (values) => {
                        await deleteAccount(
                            values.current_password,
                        );
                    }}
                    validationSchema={deleteAccountSchema}
    
                >
                    {(props) => (
                        <View>
                            <TextInput
                                style={globalStyles.input}
                                secureTextEntry={true}
                                placeholder="Your password:"
                                onChangeText={props.handleChange('old_password')}
                                value={props.values.current_password}
                            />
                            <Text>{props.errors.current_password}</Text>
    
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
