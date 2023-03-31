import { SafeAreaView } from 'react-native';
import React from 'react';

import ChangeUserDetailsForm from '../forms/changeUserDetailsForm';

export default function ChangeUserDetailsScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {ChangeUserDetailsForm()}
    </SafeAreaView>
  );
}
