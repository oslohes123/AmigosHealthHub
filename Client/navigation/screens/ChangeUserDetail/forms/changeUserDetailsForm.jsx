import * as Yup from 'yup';

import {
  Button, Text, TextInput, View, SafeAreaView, StyleSheet,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { globalStyles } from '../../../../styles/global';
import useChangeProfileDetails from '../hooks/useChangeProfileDetails';
import themeContext from '../../../theme/themeContext';

// import { getUserInfo } from '../hooks/getUserInfo';
const getUserInfo = require('../hooks/useGetUserInfo');

const ChangeUserDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),

  lastName: Yup.string().required('Required'),

  email: Yup.string().email('Invalid email').required('Required'),

  age: Yup.number().positive('Age must be positive'),
});

export default function ChangeUserDetailsForm() {
  const theme = useContext(themeContext);
  const [email, setEmail] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [age, setage] = useState(null);
  const { changeStats, isLoading, error } = useChangeProfileDetails();

  const styles = StyleSheet.create({
    head: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: '2%',
      // marginTop: '2%'
    },
  });
  const { color } = theme;
  async function setInitialValues() {
    const userInfo = await getUserInfo.getUserInfo();

    setEmail(userInfo.user.email);
    setfirstName(userInfo.user.firstName);
    setlastName(userInfo.user.lastName);
    setage(userInfo.user.age);
  }
  setInitialValues();

  return (
    <SafeAreaView style={globalStyles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          email,
          firstName,
          lastName,
          age: `${age}`,
        }}
        onSubmit={async (values) => {
          await changeStats(
            values.firstName,
            values.lastName,
            values.email,
            values.age,
          );
        }}
        validationSchema={ChangeUserDetailsSchema}
      >
        {(props) => (
          <View>
            <Text style={[styles.head, { color }]}>First Name</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="First Name"
              placeholderTextColor={color}
              onChangeText={props.handleChange('firstName')}
              value={props.values.firstName}
            />
            <Text>{props.errors.firstName}</Text>

            <Text style={[styles.head, { color }]}>Last Name</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="Last Name"
              placeholderTextColor={color}
              onChangeText={props.handleChange('lastName')}
              value={props.values.lastName}
            />
            <Text>{props.errors.lastName}</Text>

            <Text style={[styles.head, { color }]}>Email</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="Email"
              placeholderTextColor={color}
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              keyboardType="email-address"
            />
            <Text>{props.errors.email}</Text>

            <Text style={[styles.head, { color }]}>Age</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="Age"
              placeholderTextColor={color}
              onChangeText={props.handleChange('age')}
              value={props.values.age}
              keyboardType="number-pad"
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
    </SafeAreaView>
  );
}
