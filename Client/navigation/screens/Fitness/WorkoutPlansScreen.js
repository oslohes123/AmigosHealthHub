import { StatusBar } from 'expo-status-bar';
import react from "react";
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native';

export default function WorkoutPlansScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see the workout plans that I have saved.")
            }}>
                Workout Plans
            </Text>

            <View style={styles.blankSpace}>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    keyboardType='default'
                />
                <Button title='+' onPress={() => {
                    console.log("Create new workout plan.")
                }} />
            </View>

            <View style={styles.button}>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    blankSpace: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'centre',
        paddingHorizontal: 10,
    },
    input: {

        flexDirection: 'row',
        borderWidth: 1,
        padding: 10,
        width: 300,
    },
    mainImage: {
        width: 120,
        height: 120,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
});