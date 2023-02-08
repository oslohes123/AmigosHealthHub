
import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../../../../styles/global'
import { useLogin } from '../hooks/useLogin';


export const formikLoginForm = () => {
    const { login, isLoading, error } = useLogin()
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                    await login(values.email, values.password)
                }}
            >

                {(props) => (

                    <View>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />

                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />

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