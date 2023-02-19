import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, ScrollView } from 'react-native';

export default function TrackExerciseScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see the workout plans that I have saved.")
            }}>
                Track Exercise
            </Text>

            <View style={styles.searchAndCreate}>

                <TextInput
                    style={styles.textInput}
                    placeholder="Search"
                    keyboardType='default'
                    clearButtonMode='always'
                />

                <Button title='+' onPress={() => {
                    console.log("Create new workout plan.")
                }} />

            </View>

                <Text style={styles.customWorkout}>Exercises</Text>
        
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} alignItems={'center'}>
                <Text style={styles.testText}>Run (5K)</Text>
                <Text style={styles.testText}>Sprint (100m)</Text>
                <Text style={styles.testText}>Swim (Freestyle)</Text>
                <Text style={styles.testText}>Swim (Butterfly)</Text>
                <Text style={styles.testText}>Cycle (10K)</Text>
                <Text style={styles.testText}>Run (5K)</Text>
                <Text style={styles.testText}>Sprint (100m)</Text>
                <Text style={styles.testText}>Swim (Freestyle)</Text>
                <Text style={styles.testText}>Swim (Butterfly)</Text>
                <Text style={styles.testText}>Run (5K)</Text>
                <Text style={styles.testText}>Sprint (100m)</Text>
                <Text style={styles.testText}>Swim (Freestyle)</Text>
                <Text style={styles.testText}>Swim (Butterfly)</Text>
                <Text style={styles.testText}>Cycle (10K)</Text>
                <Text style={styles.testText}>Run (5K)</Text>
                <Text style={styles.testText}>Sprint (100m)</Text>
                <Text style={styles.testText}>Swim (Freestyle)</Text>
                <Text style={styles.testText}>Swim (Butterfly)</Text>
                <Text style={styles.testText}>Cycle (10K)</Text>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    customWorkout: {
        fontSize: 22,
        margin: 5,
        fontWeight: "bold",
    },
    testText: {
        fontSize: 32,
        padding: 5,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        textAlign: 'center',
    },
    scrollView: {
        height: '60%',
        borderWidth: 2,
        borderRadius: 26,
        paddingHorizontal: 16,
        margin: 10,
        width: '90%'
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 20,
    },
    searchAndCreate: {
        flexDirection: 'row',
        padding: 12,
        alignContent: 'space-between'
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 12,
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '100%'
    },
});