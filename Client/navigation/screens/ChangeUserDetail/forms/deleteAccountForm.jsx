import * as Yup from 'yup';

import {
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Formik } from 'formik';
// import { deleteAccountWrapper } from "../hooks/deleteAccount";
import { Checkbox } from 'react-native-paper';
import deleteAccountWrapper from '../hooks/useDeleteAccount';
import globalStyles from '../../../../styles/global';
import { useAuthContext } from '../../Authentication/context/AuthContext';

const styles = StyleSheet.create({
  email: {
    fontSize: 23,
    marginLeft: '5%',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '5%',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 20,
    width: '95%',
    alignSelf: 'center',
    marginTop: '5%',
  },
});
const DeleteAccountFormSchema = Yup.object().shape({

  current_password: Yup.string()
    .required('Current Password Required!'),
});
export default function DeleteAccountForm() {
  const { deleteAccount, isLoading, error } = deleteAccountWrapper();
  const { user } = useAuthContext();
  const [checked, setChecked] = useState(false);
  // const userEmail = getUserDetails();
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.head}>Email</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Formik
        initialValues={{ current_password: '' }}
        onSubmit={async (values) => {
          await deleteAccount(values.current_password);
        }}
        validationSchema={DeleteAccountFormSchema}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Your password:"
              onChangeText={props.handleChange(
                'current_password',
              )}
              value={props.values.current_password}
            />
            <Text>{props.errors.current_password}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>I understand my account will be deleted permanently</Text>
            </View>
            {checked && (
            <Button
              title="CONFIRM DELETE ACCOUNT"
              onPress={props.handleSubmit}
              disabled={isLoading}
            />
            ) }

            {error && <Text style={globalStyles.errorText}>{error}</Text>}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
