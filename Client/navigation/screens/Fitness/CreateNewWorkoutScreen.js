import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CreateNewWorkoutScreen({navigation}) {

  /*
    Query DB/call API when exercise input into search bar. Return info
    about exercise and add to array of exercises in workout plan.
    Allow user to enter target data for the exercise (rep, set goal,etc) 
    - Store as tuple in array with exerciseID. When save pressed, add 
    saved workouts and exercises to workoutPlans table.
  */

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create New Workout</Text>
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