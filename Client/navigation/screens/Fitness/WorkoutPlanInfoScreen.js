import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import React from 'react'

export default function WorkoutPlanInfoScreen({navigation}) {

  /*
    Display info about the workout plan (what exercises, 
    reps/sets or distance/time, etc.).
    -> Edit button to edit the workout plan.
    -> Save button to save the workout plan (if edited)
    -> Favourite workout plan (to add to favourites panel)
  */

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Workout Info</Text>

      <View height='80%'/>
      <View style={styles.bottomButtons}>
        <Button title='Edit' onPress={ () => {
          console.log("Edit the Workout Plan");
        }}/>
        <Button title='Save'onPress={ () => {
          console.log("Save the Workout Plan");
        }}/>
      </View>

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
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})