import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, { useContext } from 'react';
import themeContext from '../../../theme/themeContext';

import ChangeUserPasswordForm from '../forms/changeUserPasswordForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function ChangeUserPasswordScreen() {
  const theme = useContext(themeContext);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
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
