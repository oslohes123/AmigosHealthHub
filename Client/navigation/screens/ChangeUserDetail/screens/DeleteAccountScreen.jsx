import {
  SafeAreaView,
} from 'react-native';
import React from 'react';

import DeleteAccountForm from '../forms/deleteAccountForm';

export default function ChangeUserPasswordScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 2,
      }}
    >
      {DeleteAccountForm()}
    </SafeAreaView>
  );
}
