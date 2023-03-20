import { SafeAreaView } from 'react-native';
import React from 'react';

import { formikChangeUserDetailsForm } from '../forms/changeUserDetailsForm';

export default function ChangeUserDetailsScreen() {
  return (
    <>
      {formikChangeUserDetailsForm()}
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
