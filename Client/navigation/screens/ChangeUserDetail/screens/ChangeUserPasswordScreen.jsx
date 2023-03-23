import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import React from 'react';

import ChangeUserPasswordForm from '../forms/changeUserPasswordForm';

export default function ChangeUserPasswordScreen() {
  return (
    <>
      {ChangeUserPasswordForm()}
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
