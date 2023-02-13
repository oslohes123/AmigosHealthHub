import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

export default function Exercise({ route, navigation }) {

    const { name } = route.params
    
    return (
        <SafeAreaView>
            <Text>{name}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})