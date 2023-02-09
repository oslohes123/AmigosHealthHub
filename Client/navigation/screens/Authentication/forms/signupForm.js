import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../../../../styles/global'
import { useSignUp } from '../hooks/useSignUp';

import * as Yup from 'yup';


const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const SignupSchema = Yup.object().shape({

    firstName: Yup.string().required('Required'),
 
    lastName: Yup.string().required('Required'),
 
    email: Yup.string().email('Invalid email').required('Required'),
    
    password: Yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(passwordRegex
    ,"Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)"
    ),

    age: Yup.number().positive("Age must be positive")
  });



export const formikSignUpForm = () => {
    const { signup, isLoading, error } = useSignUp()

    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ email: '', firstName: '', lastName: '', age: '', password: '' }}
                onSubmit={async (values) => {
                    await signup(values.email, values.firstName, values.lastName, values.age, values.password)
                }}
                validationSchema = {SignupSchema}
            >

                {(props) => (

                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='First Name'
                            onChangeText={props.handleChange('firstName')}
                            value={props.values.firstName}
                        />
                        <Text>{props.errors.firstName}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Last Name'
                            onChangeText={props.handleChange('lastName')}
                            value={props.values.lastName}
                        />
                        <Text>{props.errors.lastName}</Text>



                        <TextInput
                            style={globalStyles.input}
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            keyboardType = 'email-address'
                        />
                        <Text>{props.errors.email}</Text>


                        <TextInput
                            style={globalStyles.input}
                            placeholder='Age'
                            onChangeText={props.handleChange('age')}
                            value={props.values.age}
                        />
                        <Text>{props.errors.age}</Text>

                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <Text>{props.errors.password}</Text>

                        <Button title="Sign Up" color="Green" onPress={props.handleSubmit} disabled={isLoading} />
                        {error && <Text className="error">{error}</Text>}
                    </View>
                )

                }

            </Formik>
        </View>
    )

}

    // module.exports.signupForm = formikSignupForm;