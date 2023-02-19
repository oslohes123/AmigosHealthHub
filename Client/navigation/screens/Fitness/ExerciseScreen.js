import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

export default function ExerciseScreen({ route, navigation }) {

    const { name } = route.params

    /*
        Retrieve exercise from DB/API call and display info about 
        Provide inputs for the user to track the details about the 
        exercise.
    */
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={style.title}>{name}</Text>
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