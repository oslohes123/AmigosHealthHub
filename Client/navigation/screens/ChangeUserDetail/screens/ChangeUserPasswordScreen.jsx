import {
  SafeAreaView,
} from 'react-native';
import React from 'react';

import ChangeUserPasswordForm from '../forms/changeUserPasswordForm';

export default function ChangeUserPasswordScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 2,
      }}
    >
      {ChangeUserPasswordForm()}
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
