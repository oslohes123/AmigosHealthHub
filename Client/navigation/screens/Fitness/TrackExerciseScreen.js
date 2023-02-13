import { Text, View, SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function TrackExerciseScreen({ navigation }) {
    const exerciseRouter = useRoute()

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Track Exercise</Text>
            <ScrollView/>
        </SafeAreaView>
    )
}

const styles = {
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
}