
import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../../../../styles/global'
import { useLogin } from '../hooks/useLogin';
import * as Yup from 'yup';


const loginSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Required'),

    password: Yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(passwordRegex,"Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)"),
  });

export const formikLoginForm = () => {
    const { login, isLoading, error } = useLogin()
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                    await login(values.email, values.password)
                }}
                validationSchema = {loginSchema}
            >

                {(props) => (

                    <View>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />
                        <Text>{props.errors.email}</Text>


                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <Text>{props.errors.password}</Text>
                        
                        <Button title="Login" color="Green" onPress={props.handleSubmit} disabled={isLoading} />
                        {error && <div className="error">{error}</div>}
                    </View>
                )

                }

            </Formik>
        </View>
    )

}

// module.exports.loginForm = formikLoginForm;