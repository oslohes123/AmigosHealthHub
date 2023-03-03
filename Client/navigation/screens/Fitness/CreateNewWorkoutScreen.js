import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Modal, Keyboard } from 'react-native';
import { useState, useContext } from 'react';
import themeContext from '../../theme/themeContext';
import SearchBar from '../../components/SearchBar';

export default function CreateNewWorkoutScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    const theme = useContext(themeContext)
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

            {/*Exercise Info Modal*/}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible)}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                        <View style={[modalStyle.modalMain, {backgroundColor: theme.secondary}]}>
                            
                            <Text style={[modalStyle.modalText, {color: theme.color}]}>Exercise Information</Text>
                            
                            <View style={{justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10,  width: screenWidth * 0.7, borderColor: theme.color}}>
                                <Text style={{textAlign: 'center', fontWeight: 'bold', color: theme.color, fontSize: 20, paddingVertical: 5}}>Information</Text>
                                <Text style={{textAlign: 'justify', color: theme.color, fontSize: 16}}>This text is an example of the text that will be rendered within this text box. 
                                    It will contain information on the workout including how to perform said workout.</Text>
                            </View>

                            <View style={{justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10,  width: screenWidth * 0.7, borderColor: theme.color}}>
                                <View style={{justifyContent: 'space-evenly'}}>
                                    <Text style={{color: theme.color, fontSize: 10}}>Type</Text>
                                    <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>TYPENAME</Text>
                                    <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                    <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>MUSCLE</Text>
                                    <Text style={{color: theme.color, fontSize: 10}}>Difficulty</Text>
                                    <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>0</Text>
                                </View>
                                <View style={{justifyContent: 'space-evenly'}}>
                                    <Text style={{color: theme.color, fontSize: 10}}>Equiptment</Text>
                                    <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                                </View>
                            </View>
                            
                            <View style={{width: screenWidth * 0.3, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                                <TextInput 
                                    style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                    placeholder='Sets' 
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                    />
                                <TextInput 
                                    style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                    placeholder='Reps' 
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                    />
                            </View>

                            <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Button title='Dismiss' onPress={() => {setModalVisible(!modalVisible)}}/>
                                <Button title='Add' onPress={() => {setModalVisible(!modalVisible)}}/>
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.searchAndCreate}>
              
                {SearchBar({themeColor: theme.color})}

            </View>

                <Text style={[styles.customWorkout, {color: theme.color}]}>Exercises</Text>
        
            <ScrollView style={[styles.verticalScroll, {borderColor: theme.color}]} showsVerticalScrollIndicator={false} alignItems={'center'}>
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

            <ScrollView style={[styles.horizontalScroll, {borderColor: theme.color}]} horizontal={true} alignItems={'center'} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                <Text style={[styles.addedText, {borderColor: theme.color, color: theme.color}]}>Test 1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                <Text style={[styles.addedText, {borderColor: theme.color, color: theme.color}]}>Test 2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                <Text style={[styles.addedText, {borderColor: theme.color, color: theme.color}]}>Test 3</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                <Text style={[styles.addedText, {borderColor: theme.color, color: theme.color}]}>Test 4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>                    
                <Text style={[styles.addedText, {borderColor: theme.color, color: theme.color}]}>Test 5</Text>
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
    addedText: {
      fontSize: 26,
      padding: 5,
      borderRadius: 20,
      marginHorizontal: 5,
      borderWidth: 1,
      textAlign: 'center',
      justifyContent: 'center'
  },
    verticalScroll: {
      height: '60%',
      borderWidth: 2,
      borderRadius: 26,
      paddingHorizontal: 16,
      margin: 10,
      width: '90%'
    },
    horizontalScroll: {
      width: screenWidth * 0.9,
      borderWidth: 2, 
      borderRadius: 26, 
      marginVertical: 10
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
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
        alignItems: 'center',
        height: '100%'
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
        width: screenWidth * 0.12, 
        height: screenHeight * 0.05,
        fontWeight: 'bold'
    },
}
