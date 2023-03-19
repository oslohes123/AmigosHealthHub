/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import themeContext from '../../theme/themeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default function SleepSettings() {
  const theme = useContext(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color }]}>Sleep Settings</Text>
    </View>
  );
}
