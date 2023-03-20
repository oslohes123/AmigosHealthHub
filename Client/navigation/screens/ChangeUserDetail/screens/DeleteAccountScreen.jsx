import {
  SafeAreaView,
} from 'react-native';
import React from 'react';

import { deleteAccountForm } from '../forms/deleteAccountForm';

export default function ChangeUserPasswordScreen() {
  return (
    <>
      {deleteAccountForm()}
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
