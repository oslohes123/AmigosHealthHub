import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export default function SleepSettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sleep Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#203038',
      flex: 1,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        color: 'white',
        alignSelf: 'center',
      },
})

