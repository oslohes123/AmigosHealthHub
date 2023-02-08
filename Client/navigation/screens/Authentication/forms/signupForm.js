import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../../../../styles/global'
import { useSignUp } from '../hooks/useSignUp';
// const handleSubmit = async(e) =>{

//     e.preventDefault(); //default Action is to refresh form once submitted

//     } 

export const formikSignUpForm = () => {
    const { signup, isLoading, error } = useSignUp()

    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ email: '', firstName: '', lastName: '', age: '', password: '' }}
                onSubmit={async (values) => {
                    await signup(values.email, values.firstName, values.lastName, values.age, values.password)
                }}
            >

                {(props) => (

                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='First Name'
                            onChangeText={props.handleChange('firstName')}
                            value={props.values.firstName}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Last Name'
                            onChangeText={props.handleChange('lastName')}
                            value={props.values.lastName}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Age'
                            onChangeText={props.handleChange('age')}
                            value={props.values.age}
                        />

                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />

                        <Button title="Sign Up" color="Green" onPress={props.handleSubmit} disabled={isLoading} />
                        {error && <div className="error">{error}</div>}
                    </View>
                )

                }

            </Formik>
        </View>
    )

}

    // module.exports.signupForm = formikSignupForm;