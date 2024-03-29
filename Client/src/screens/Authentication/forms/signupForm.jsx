import * as Yup from 'yup';

import {
  Button, Text, TextInput, View,
} from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Formik } from 'formik';
import PasswordInput from '../../../components/passwordInput';
import globalStyles from '../../../../styles/global';
import useSignUp from '../hooks/useSignUp';

const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),

  lastName: Yup.string().required('Required'),

  email: Yup.string().email('Invalid email').required('Required'),

  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      passwordRegex,
      'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)',
    ),
  confirm_password: Yup.string()
    .required('Confirm your new password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match!"),

  age: Yup.number()
    .typeError('Age must be a number!')
    .required('Age is Required')
    .positive('Age must be positive')
    .integer('Age must be a whole number!'),

  calories: Yup.number()
    .typeError('Calories must be a number!')
    .positive('Calories must be positive')
    .integer('Calories must be a whole number!'),
});

function SignUpForm() {
  const { signup, isLoading, error } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          age: '',
          password: '',
          calories: '',
        }}
        onSubmit={async (values) => {
          await signup(
            values.email,
            values.firstName,
            values.lastName,
            values.age,
            values.password,
            values.calories,
          );
        }}
        validationSchema={SignupSchema}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="First Name"
              onChangeText={props.handleChange('firstName')}
              value={props.values.firstName}
            />

            {props.errors.firstName && (
            <Text style={globalStyles.errorText}>
              {props.errors.firstName}
            </Text>
            )}
            <TextInput
              style={globalStyles.input}
              placeholder="Last Name"
              onChangeText={props.handleChange('lastName')}
              value={props.values.lastName}
            />
            {props.errors.lastName && (
            <Text style={globalStyles.errorText}>
              {props.errors.lastName}
            </Text>
            )}
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
            <TextInput
              style={globalStyles.input}
              placeholder="Age"
              onChangeText={props.handleChange('age')}
              value={props.values.age}
              keyboardType="number-pad"
            />
            {props.errors.age && (
            <Text style={globalStyles.errorText}>
              {props.errors.age}
            </Text>
            )}
            <TextInput
              style={globalStyles.input}
              testID='calorieInput'
              placeholder="Calorie Goal: (Default = 2000)"
              onChangeText={props.handleChange('calories')}
              value={props.values.calories}
              keyboardType="number-pad"
            />
            {props.errors.calories && (
            <Text style={globalStyles.errorText}>
              {props.errors.calories}
            </Text>
            )}
            <PasswordInput
              label="Password"
              style={globalStyles.input}
              secureTextEntry
              onChange={props.handleChange('password')}
              value={props.values.password}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            {props.errors.password && (
            <Text style={globalStyles.errorText}>
              {props.errors.password}
            </Text>
            )}
            <PasswordInput
              style={globalStyles.input}
              secureTextEntry
              label="Confirm Password"
              onChange={props.handleChange('confirm_password')}
              value={props.values.confirm_password}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
            <Text>{props.errors.confirm_password}</Text>
            <Button
              testID="signUp"
              title="Sign Up"
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
}

export default SignUpForm;
