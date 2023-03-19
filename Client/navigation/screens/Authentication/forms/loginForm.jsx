import * as Yup from 'yup';

import {
  Button, Text, TextInput, View,
} from 'react-native';
import React, { useState } from 'react';

import { Formik } from 'formik';
import PasswordInput from '../../../components/passwordInput';
import { globalStyles } from '../../../../styles/global';
import { useLogin } from '../hooks/useLogin';

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
            <Text>{props.errors.email}</Text>

            <PasswordInput
              label="Password"
              value={props.values.password}
              style={globalStyles.input}
              onChange={props.handleChange('password')}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
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

export default formikLoginForm;
