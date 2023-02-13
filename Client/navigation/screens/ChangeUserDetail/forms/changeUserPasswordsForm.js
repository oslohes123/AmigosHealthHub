import * as Yup from 'yup';

import { Button, Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import React from 'react';
import { globalStyles } from '../../../../styles/global';
import { useChangeProfileDetails } from '../hooks/useChangeProfileDetails'; //change hook location

const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const ChangeUserDetailsSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),

    lastName: Yup.string().required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),

    age: Yup.number().positive('Age must be positive')
});

async function getUserDetails() {
    const userDetails = await AsyncStorage.getItem('user');
    console.log(userDetails.keys);
    return userDetails;
}

export const formikChangeUserDetailsForm = () => {
    const { changeStats, isLoading, error } = useChangeProfileDetails();
    const userDetails = getUserDetails();
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                }}
                onSubmit={async (values) => {
                    await changeUserDetails(
                        values.email,
                        values.firstName,
                        values.lastName,
                        values.age
                    );
                }}
                validationSchema={ChangeUserDetailsSchema}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="First Name"
                            onChangeText={props.handleChange('firstName')}
                            value={props.values.firstName}
                        />
                        <Text>{props.errors.firstName}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder="Last Name"
                            onChangeText={props.handleChange('lastName')}
                            value={props.values.lastName}
                        />
                        <Text>{props.errors.lastName}</Text>

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
                            placeholder="Age"
                            onChangeText={props.handleChange('age')}
                            value={props.values.age}
                        />
                        <Text>{props.errors.age}</Text>

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
