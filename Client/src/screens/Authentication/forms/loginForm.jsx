import * as Yup from 'yup';

import {
  Button, Text, TextInput, View,
} from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Formik } from 'formik';
import PasswordInput from '../../../components/passwordInput';
import globalStyles from '../../../../styles/global';
import useLogin from '../hooks/useLogin';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const formikLoginForm = () => {
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
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
            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              keyboardType="email-address"
            />
            {props.errors.email && (
            <Text style={globalStyles.errorText}>
              {props.errors.email}
            </Text>
            )}
            <PasswordInput
              label="Password"
              value={props.values.password}
              style={globalStyles.input}
              onChange={props.handleChange('password')}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            {props.errors.password && (
            <Text style={globalStyles.errorText}>
              {props.errors.password}
            </Text>
            )}
            <Button
              testID='login'
              title="Login"
              onPress={props.handleSubmit}
              disabled={isLoading}
            />
            {isLoading && (
            <>
              {/* <Text>Refreshing.....</Text> */}
              <ActivityIndicator
                animating
                size={25}
                color={MD2Colors.greenA400}
              />
            </>
            )}
            {error && <Text style={globalStyles.errorText}>{error}</Text>}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default formikLoginForm;
