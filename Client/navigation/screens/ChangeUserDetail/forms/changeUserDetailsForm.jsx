import * as Yup from 'yup';

import {
  Button, Text, TextInput, View, SafeAreaView, StyleSheet,
} from 'react-native';
import { ActivityIndicator, MD2Colors, Checkbox } from 'react-native-paper';
import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import globalStyles from '../../../../styles/global';
import useChangeProfileDetails from '../hooks/useChangeProfileDetails';
import themeContext from '../../../theme/themeContext';

import useGetUserInfo from '../hooks/useGetUserInfo';

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
  const { getUserInfo, isLoadingUserInfo, errorUserInfo } = useGetUserInfo();
  const { changeStats, isLoading, error } = useChangeProfileDetails();
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    head: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: '2%',
      marginTop: '3%',
    },
  });
  const { color } = theme;
  const isFocused = useIsFocused();
  async function setInitialValues() {
    const userInfo = await getUserInfo();
    if (userInfo) {
      setEmail(userInfo.user.email);
      setfirstName(userInfo.user.firstName);
      setlastName(userInfo.user.lastName);
      setage(userInfo.user.age);
    }
  }
  useEffect(() => {
    if (isFocused) {
      setInitialValues();
    }
  }, [navigation, isFocused]);
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
            {isLoadingUserInfo && (
            <ActivityIndicator
              animating
              size={40}
              color={MD2Colors.greenA400}
            />
            )}
            {errorUserInfo && <Text style={globalStyles.errorText}>{errorUserInfo}</Text>}

            <Text style={[styles.head, { color }]}>First Name</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="First Name"
              placeholderTextColor={color}
              onChangeText={props.handleChange('firstName')}
              value={props.values.firstName}
            />
            {props.errors.firstName && (
              <Text style={globalStyles.errorText}>
                {props.errors.firstName}
              </Text>
            )}
            <Text style={[styles.head, { color }]}>Last Name</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="Last Name"
              placeholderTextColor={color}
              onChangeText={props.handleChange('lastName')}
              value={props.values.lastName}
            />
            {props.errors.lastName && (
              <Text style={globalStyles.errorText}>
                {props.errors.lastName}
              </Text>
            )}
            <Text style={[styles.head, { color }]}>Email</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="Email"
              placeholderTextColor={color}
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              keyboardType="email-address"
            />
            {props.errors.email && (
              <Text style={globalStyles.errorText}>
                {props.errors.email}
              </Text>
            )}
            <Text style={[styles.head, { color }]}>Age</Text>
            <TextInput
              style={[globalStyles.input, { color }]}
              placeholder="Age"
              placeholderTextColor={color}
              onChangeText={props.handleChange('age')}
              value={props.values.age}
              keyboardType="number-pad"
            />
            {props.errors.age && (
            <Text style={globalStyles.errorText}>
              {props.errors.age}
            </Text>
            )}
  
            {/* <View style={{ flexDirection: 'row' }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>I will be logged out</Text>
            </View> */}
            <Button
              title="Save details"
              onPress={props.handleSubmit}
              disabled={isLoading}
            />

            {/* {
              checked && (
              <Button
                title="Save details"
                onPress={props.handleSubmit}
                disabled={isLoading}
              />
              )
            } */}
            {error && <Text style={globalStyles.errorText}>{error}</Text>}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
