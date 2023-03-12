import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import theme from '../../../theme/theme';
import themeContext from '../../../theme/themeContext';

//Screen Names
const trackWorkoutName = 'Workout Plans'
const fitnessDashboardName = 'Fitness Dashboard'

export default function FitnessScreen({ navigation }) {
    const theme = useContext(themeContext)
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

            <View style={styles.blankSpace}>
                {/* <Image style={styles.mainImage} source={require('../../assets/favicon.png')} /> */}
            </View>

            <View style={styles.buttonView}>
                <Button title="Workouts Plans" onPress={() => {
                    console.log("The user wants to see their workout plans.")
                    navigation.navigate("Workout Plans")
                }} />
                <Button title="Exercises" onPress={() => {
                    console.log("The user wants to track a single exercise.")
                    navigation.navigate("Track Exercise")
                }} />
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