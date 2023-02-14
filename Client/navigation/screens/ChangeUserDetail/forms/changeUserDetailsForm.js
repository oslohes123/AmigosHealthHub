import * as Yup from 'yup';

import { Button, Text, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { globalStyles } from '../../../../styles/global';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useChangeProfileDetails } from '../hooks/useChangeProfileDetails';

// import { getUserInfo } from '../hooks/getUserInfo';
const getUserInfo = require('../hooks/getUserInfo');

const ChangeUserDetailsSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),

    lastName: Yup.string().required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),

    age: Yup.number().positive('Age must be positive')
});

// async function getUserDetails() {
//     const jsonData = await AsyncStorage.getItem('user');
//     const userEmail = JSON.parse(jsonData);
//     console.log(`Email: ${userEmail}`);
//     return userEmail;
// }

export const formikChangeUserDetailsForm = () => {
    const { changeStats, isLoading, error } = useChangeProfileDetails();
 async function myfunction(){
    console.log(await getUserInfo.getUserInfo())
    console.log(`getItem: ${JSON.stringify(await AsyncStorage.getItem('user'))}`);
    const initialValues = await AsyncStorage.getItem('user')
    console.log(JSON.stringify(initialValues))
    const initialEmail =  initialValues.email;
    const initialFirstName =  initialValues.firstName;
    const initialLastName =  initialValues.lastName;
    const initialAge =  initialValues.age;
 }  
myfunction();
   
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{
                    email: ``,
                    firstName: ``,
                    lastName: ``,
                    age: ``

                }}
                onSubmit={
                    async (values) => {
                    await changeStats(
                        values.firstName,
                        values.lastName,
                        values.email,
                        values.age
                    );
                }
            }
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
