import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'

export default function FitnessStatsScreen({navigation}) {

  /*
    Display ScrollView of Widgets containing stats on the user:
      - Examples include:
        - Previous Workouts.
        - Trends in data using graphs.
        - Trends in data using diagrams.

      x-x POTENTIALLY HAVE DASHBOARD STAT NAVIGATE TO STATS PAGE x-x
  */

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fitness Stats</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 20,
    },
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      height: '100%'
  },
})