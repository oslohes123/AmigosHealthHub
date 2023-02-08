import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

export default function WorkoutPlansScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see the workout plans that I have saved.")
            }}>
                Workout Plans
            </Text>

            <View style={styles.searchAndCreate}>

                <TextInput
                    style={styles.textInput}
                    placeholder="Search"
                    keyboardType='default'
                />

                <Button style={styles.button} title='+' onPress={() => {
                    console.log("Create new workout plan.")
                }} />

            </View>

            <View styke>
                <Text>Custom Workouts</Text>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.testText}>Test text 1</Text>
                    <Text style={styles.testText}>Test text 2</Text>
                    <Text style={styles.testText}>Test text 3</Text>
                    <Text style={styles.testText}>Test text 4</Text>
                    <Text style={styles.testText}>Test text 5</Text>
                    <Text style={styles.testText}>Test text 6</Text>
                    <Text style={styles.testText}>Test text 7</Text>
                    <Text style={styles.testText}>Test text 8</Text>
                    <Text style={styles.testText}>Test text 9</Text>
                    <Text style={styles.testText}>Test text 10</Text>
                    <Text style={styles.testText}>Test text 11</Text>
                    <Text style={styles.testText}>Test text 12</Text>
                    <Text style={styles.testText}>Test text 13</Text>
                    <Text style={styles.testText}>Test text 14</Text>
                    <Text style={styles.testText}>Test text 15</Text>
                    <Text style={styles.testText}>Test text 16</Text>
                    <Text style={styles.testText}>Test text 17</Text>
                    <Text style={styles.testText}>Test text 18</Text>
                </ScrollView>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    testText: {
        fontSize: 32
    },
    scrollView: {
        backgroundColor: 'blue',
        margin: 10,
        padding: 10
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    searchAndCreate: {
        flexDirection: 'row',
        padding: 12,
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 12,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderWidth: 1
    },
});