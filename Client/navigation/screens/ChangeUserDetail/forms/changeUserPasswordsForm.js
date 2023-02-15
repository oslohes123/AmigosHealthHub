import * as Yup from 'yup';

import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
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
        ),
    confirm_new_password: Yup.string()
        .required('Confirm your new password')
        .oneOf([Yup.ref('new_password'), null], "Passwords don't match!")
});

// async function getUserDetails() {
//     const jsonData = await AsyncStorage.getItem('user');
//     const userEmail = JSON.parse(jsonData);
//     console.log(`Email: ${userEmail}`);
//     return userEmail;
// }

export const formikChangeUserPasswordForm = () => {
    const { changePassword, isLoading, error } = useChangeProfilePassword();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{
                    old_password: '',
                    new_password: '',
                    confirm_new_password: ''
                }}
                onSubmit={async (values) => {
                    await changePassword(
                        values.old_password,
                        values.new_password,
                        values.confirm_new_password
                    );
                }}
                validationSchema={ChangeUserPasswordSchema}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Old Password"
                            secureTextEntry={!showPassword1}
                            onChangeText={props.handleChange('old_password')}
                            value={props.values.old_password}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword1(!showPassword1)}
                            style={{ position: 'absolute', right: 10, top: 10 }}
                        >
                            <FontAwesome
                                name={showPassword1 ? 'eye-slash' : 'eye'}
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>

                        {props.errors.old_password && (
                            <Text style={globalStyles.errorText}>
                                {props.touched.old_password &&
                                    props.errors.old_password}
                            </Text>
                        )}

                        <TextInput
                            style={globalStyles.input}
                            placeholder="New Password"
                            secureTextEntry={!showPassword2}
                            onChangeText={props.handleChange('new_password')}
                            value={props.values.new_password}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword2(!showPassword2)}
                            style={{ position: 'absolute', right: 10, top: 10 }}
                        >
                            <FontAwesome
                                name={showPassword2 ? 'eye-slash' : 'eye'}
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>

                        {props.errors.new_password && (
                            <Text style={globalStyles.errorText}>
                                {props.touched.new_password &&
                                    props.errors.new_password}
                            </Text>
                        )}

                        <TextInput
                            style={globalStyles.input}
                            placeholder="Confirm New Password"
                            secureTextEntry={!showPassword3}
                            onChangeText={props.handleChange(
                                'confirm_new_password'
                            )}
                            value={props.values.confirm_new_password}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword3(!showPassword3)}
                            style={{ position: 'absolute', right: 10, top: 10 }}
                        >
                            <FontAwesome
                                name={showPassword3 ? 'eye-slash' : 'eye'}
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>

                        {props.errors.confirm_new_password && (
                            <Text style={globalStyles.errorText}>
                                {props.touched.confirm_new_password &&
                                    props.errors.confirm_new_password}
                            </Text>
                        )}

                        <Button
                            title={isLoading ? 'Loading...' : 'Save details'}
                            onPress={props.handleSubmit}
                            disabled={isLoading}
                        />
                        {error && (
                            <Text style={globalStyles.errorText}>{error}</Text>
                        )}
                    </View>
                )}
            </Formik>
        </View>
    );
};
