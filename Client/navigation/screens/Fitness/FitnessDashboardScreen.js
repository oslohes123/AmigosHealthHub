import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import GreenButton from '../../components/GreenButton';
import RedButton from '../../components/RedButton';


//Screen Names
const trackWorkoutName = 'Workout Plans'
const fitnessDashboardName = 'Fitness Dashboard'

export default function FitnessScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see info about the fitness page.")
            }}>
                Fitness Dashboard
            </Text>
            <View style={styles.blankSpace}>
                {/* <Image style={styles.mainImage} source={require('../../assets/favicon.png')} /> */}
            </View>

            <View style={styles.buttonView}>
                <Button title="Workouts Plans" onPress={() => {
                    console.log("The user wants to see their workout plans.")
                    navigation.navigate("Workout Plans")
                }} />
                <Button title="Track Exercises" onPress={() => {
                    console.log("The user wants to track a single exercise.")
                    navigation.navigate("Track Exercise")
                }} />
                <Button title="Stats" onPress={() => {
                    console.log("Show the user their fitness stats/trends")
                    navigation.navigate("Fitness Stats")
                }} />
            </View>
            <View>
                {GreenButton({})}
                {RedButton({})}
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
        justifyContent: 'center'
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
    buttonView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 40,
    }
});