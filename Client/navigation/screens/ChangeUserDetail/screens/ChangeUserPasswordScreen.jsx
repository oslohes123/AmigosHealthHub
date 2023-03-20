import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import React from 'react';

import { formikChangeUserPasswordForm } from '../forms/changeUserPasswordsForm';

export default function ChangeUserPasswordScreen() {
  return (
    <>
      {formikChangeUserPasswordForm()}
      <SafeAreaView
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
