import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export default function FoodHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Food Consumed</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#203038',
      flex: 1,
    },
    header: {
        //width: 300,
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        color: 'white',
        alignSelf: 'center',
      },
})

