import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import GreenButton from '../../components/GreenButton';
import SearchBar from '../../components/SearchBar';
import { useContext } from 'react';
import themeContext from '../../theme/themeContext';

export default function TrackExerciseScreen({ navigation }) {
    const theme = useContext(themeContext)
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

            <View style={styles.searchAndCreate}>

            {SearchBar({themeColor: theme.color, width: screenWidth * 0.7})}
            {GreenButton({height: screenHeight * 0.05, width: screenWidth * 0.15, fontSize: 20, text: "+", buttonFunction: () => {console.log("Add custom exercise")}})}

            </View>

                <Text style={[styles.customWorkout, {color: theme.color}]}>Exercises</Text>
        
            <ScrollView style={[styles.scrollView, {borderColor: theme.color}]} showsVerticalScrollIndicator={false} alignItems={'center'}>          
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Cycle (10K)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Swim (Butterfly)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Swim (Freestyle)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Sprint (100m)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Run (5K)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Cycle (10K)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Swim (Butterfly)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Swim (Freestyle)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Sprint (100m)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Run (5K)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Cycle (10K)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Swim (Butterfly)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Swim (Freestyle)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Sprint (100m)</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Run (5K)</Text>
                </TouchableOpacity>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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