import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import React from 'react'

export default function DateWidget() {
   
    const date = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        paddingHorizontal: '15%',
        paddingVertical: '12%',
        fontSize: 30,
        color: 'white'
    },
    container: {
        backgroundColor: 'darkblue',
        borderRadius: 25
    }
})
