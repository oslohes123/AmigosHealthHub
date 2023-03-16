import { SafeAreaView, StyleSheet, Text } from 'react-native';

import React from 'react';

export default function SleepScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Sleep Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
