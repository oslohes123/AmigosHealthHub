import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, ScrollView } from 'react-native';

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
                    clearButtonMode='always'
                />

                <Button title='+' onPress={() => {
                    console.log("Create new workout plan.")
                    navigation.navigate('Create New Workout')
                }} />

            </View>

                <Text style={styles.customWorkout}>Custom Workouts</Text>
        
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} alignItems={'center'}>
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

            <Button title='TEST Workout Info' onPress={ () => {
                navigation.navigate("Workout Info")
            }} />
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