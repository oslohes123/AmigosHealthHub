import * as Yup from 'yup';

import {
  Button, Text, View, SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import { Formik } from 'formik';
import PasswordInput from '../../../components/passwordInput';
import globalStyles from '../../../../styles/global';
import useChangeProfilePassword from '../hooks/useChangeProfilePassword';

const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const ChangeUserPasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      passwordRegex,
      'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)',
    ),
  new_password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      passwordRegex,
      'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)',
    ),
  confirm_new_password: Yup.string()
    .required('Confirm your new password')
    .oneOf([Yup.ref('new_password'), null], "Passwords don't match!"),
});

export default function ChangeUserPasswordForm() {
  const [checked, setChecked] = useState(false);
  const { changePassword, isLoading, error } = useChangeProfilePassword();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Formik
        initialValues={{
          old_password: '',
          new_password: '',
          confirm_new_password: '',
        }}
        onSubmit={async (values) => {
          await changePassword(
            values.old_password,
            values.new_password,
            values.confirm_new_password,
          );
        }}
        validationSchema={ChangeUserPasswordSchema}
      >
        {(props) => (
          <View>
            <PasswordInput
              label="Old Password"
              value={props.values.old_password}
              onChange={props.handleChange('old_password')}
              showPassword={showPassword1}
              setShowPassword={setShowPassword1}
            />
            {props.errors.old_password && (
              <Text style={globalStyles.errorText}>
                {props.errors.old_password}
              </Text>
            )}

            <PasswordInput
              label="New Password"
              value={props.values.new_password}
              onChange={props.handleChange('new_password')}
              showPassword={showPassword2}
              setShowPassword={setShowPassword2}
            />
            {props.errors.new_password && (
              <Text style={globalStyles.errorText}>
                {props.errors.new_password}
              </Text>
            )}

            <PasswordInput
              label="Confirm New Password"
              value={props.values.confirm_new_password}
              onChange={props.handleChange('confirm_new_password')}
              showPassword={showPassword3}
              setShowPassword={setShowPassword3}
            />
            {props.errors.confirm_new_password && (
              <Text style={globalStyles.errorText}>
                {props.errors.confirm_new_password}
              </Text>
            )}

            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>I understand I will be logged out</Text>
            </View>
            {checked && (
            <Button
              title="Save"
              onPress={props.handleSubmit}
              disabled={!props.isValid || isLoading}
            />
            )}
            {error && <Text style={globalStyles.errorText}>{error}</Text>}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
