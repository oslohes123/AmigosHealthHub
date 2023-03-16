import { StatusBar } from 'expo-status-bar';

import { Text, View, Button, SafeAreaView, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Modal, Keyboard } from 'react-native';
import { useState, useContext } from 'react';
import themeContext from '../../theme/themeContext';
import SearchBar from '../../components/SearchBar';
import GreenButton from '../../components/GreenButton';
import { formikTrackExerciseForm } from './forms/TrackExerciseForm';

export default function WorkoutPlansScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    const theme = useContext(themeContext)
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

            {/*Exercise Info Modal*/}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible)}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                        <View style={[modalStyle.modalMain, {backgroundColor: theme.secondary}]}>
                            
                            <Text style={[modalStyle.modalText, {color: theme.color}]}>Workout Information</Text>

                            <ScrollView alignContent={'center'} borderRadius={26} borderColor={theme.color} showsVerticalScrollIndicator={false} style={{margin: 10}}>
                                <TouchableWithoutFeedback style={{padding: 40}}>
                                    <View style={{justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, marginVertical: 10, width: screenWidth * 0.7, borderColor: theme.color}}>
                                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, padding: 5}}>Exercise Name</Text>
                                        <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                            <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>MUSCLE</Text>
                                        </View>
                                        <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                            <Text style={{color: theme.color, fontSize: 10}}>Equiptment</Text>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Sets 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Sets Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                                />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Reps 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Reps Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Calories 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Reps Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback style={{padding: 40}}>
                                    <View style={{justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, marginVertical: 10, width: screenWidth * 0.7, borderColor: theme.color}}>
                                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, padding: 5}}>Exercise Name</Text>
                                        <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                            <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>MUSCLE</Text>
                                        </View>
                                        <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                            <Text style={{color: theme.color, fontSize: 10}}>Equiptment</Text>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Sets 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Sets Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                                />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Reps 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Reps Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Calories 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Reps Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback style={{padding: 40}}>
                                    <View style={{justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, marginVertical: 10, width: screenWidth * 0.7, borderColor: theme.color}}>
                                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, padding: 5}}>Exercise Name</Text>
                                        <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                            <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>MUSCLE</Text>
                                        </View>
                                        <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                            <Text style={{color: theme.color, fontSize: 10}}>Equiptment</Text>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Sets 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Sets Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                                />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Reps 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Reps Completed' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                            <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>Calories 0</Text>
                                            <TextInput 
                                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                                placeholder='Calories Burnt' 
                                                placeholderTextColor={theme.color} 
                                                keyboardType={'numeric'} 
                                                textAlign={'center'}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                
                            </ScrollView>

                            <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly', padding: 5}}>
                                <Button title='Edit' onPress={() => {setModalVisible(!modalVisible)}}/>
                                <Button title='Track' onPress={() => {setModalVisible(!modalVisible)}}/>
                            </View>
                                <Button title='Dismiss' onPress={() => {setModalVisible(!modalVisible)}}/>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Main Page */}
            <View style={styles.searchAndCreate}>

                {SearchBar({themeColor: theme.color, width: screenWidth * 0.7})}
                {GreenButton({height: screenHeight * 0.05, width: screenWidth * 0.15, fontSize: 20, text: "+", buttonFunction: () => {navigation.navigate('Create New Workout')}})}

            </View>

                <Text style={[styles.customWorkout, {color: theme.color}]}>Custom Workouts</Text>
        
            <ScrollView style={[styles.scrollView, {borderColor: theme.color}]} showsVerticalScrollIndicator={false} alignItems={'center'}>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 4</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 5</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 6</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 7</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 8</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 9</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 10</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 11</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 12</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 13</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 14</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 15</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 16</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 17</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                    <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]}>Test text 18</Text>
                </TouchableOpacity>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

const styles = {
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
        height: screenHeight * 0.2,
        borderWidth: 2,
        borderRadius: 26,
        paddingHorizontal: 16,
        margin: 10,
        width: screenWidth * 0.9
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    searchAndCreate: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-evenly'
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 12,
        flex: 1,
    },
    container: {
        alignItems: 'center',
        flex: 1
    },
}

const modalStyle = {
    modalMain: {
        justifyContent: 'space-between', 
        alignItems:'center', 
        height: screenHeight * 0.8, 
        width: screenWidth * 0.9, 
        borderRadius: 26, 
        padding: 20,
        borderWidth: 3
    },
    modalText: {
        fontSize: 30,
        textAlign: 'center', 
        fontWeight: 'bold', 
    },
    textInput: { 
        borderRadius: 10, 
        borderWidth: 1, 
        width: screenWidth * 0.35, 
        height: screenHeight * 0.05,
        fontWeight: 'bold'
    },
}
