import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function WorkoutPlansScreen({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>

                <Text style={styles.title} onLongPress={() => {
                    console.log("The user wants to see the workout plans that I have saved.")
                }}>
                    Workout Plans
                </Text>

                <View style={styles.searchAndCreate}>

                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        keyboardType='default'
                    />

                    <Button style={styles.button} title='+' onPress={() => {
                        console.log("Create new workout plan.")
                    }} />

                </View>

                {/* <View style={styles.blankSpace}>

                </View> */}

                <StatusBar style="auto" />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    searchAndCreate: {
        flexDirection: 'row',
        marginHorizontal: 12,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 12,
        flex: 1,
        flexDirection: 'row',
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
    blankSpace: {
        flex: 1,
    }
});