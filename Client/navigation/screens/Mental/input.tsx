

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button, Image, ScrollView, SafeAreaView} from 'react-native';
import Slider from '@react-native-community/slider'
import React, { useState } from 'react';
//npm install , npm install @react-native-community/slider --save
const date = new Date();

const moodImage = [require('../../../assets/Worst.png'), require('../../../assets/Sad.png'), require('../../../assets/Neutral.png'), require('../../../assets/Happy.png'), require('../../../assets/Perfect.png'),]

export default function App({navigation}: {navigation: any}) {
  //set initial picture in view
  const [moodI, setRangeI] = useState(require('../../../assets/Neutral.png'))

  //use states to make sure variables can change when input or slider value changes
  const [textInputValue, setTextInputValue] = useState('');
  const [faceInputValue, setFaceValue] = useState(3);

//make function to change text,face value variable if there is change in inputbox/slider
  const handleTextInputChange = (value: string) => {
    setTextInputValue(value);
  };
  const handleFaceInputChange = (value: number) => {
    setFaceValue(value);
    setRangeI(moodImage[value])
  };
  //when the user submits the information, check if its not empty and return to check value is correct
  const handleButtonClick = () => {
    if(textInputValue==''){
      console.log(`Input can't be empty`);
    }
    else{
      //insert supabase insert function here
      console.log(`Text input value: ${textInputValue}`);
      console.log(`Slider value: ${faceInputValue}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.label}>Word:</Text>
      <TextInput
        style={styles.input}
        placeholder="Input Your Word Of The Day Here"
        value={textInputValue}
        onChangeText={handleTextInputChange}
      
      />
      <Text style = {styles.label}>Face:</Text>
      <Image source = {moodI} style={styles.image}/>
      <Slider
        style = {{ width: 250, height: 40 }}
        minimumValue = {0}
        maximumValue = {4}
        minimumTrackTintColor = 'green'
        maximumTrackTintColor = 'green'
        thumbTintColor = 'green'
        value = {3}
        step={1}
        onValueChange = {(value: number) => handleFaceInputChange(value)}
        />
      <Button title="Submit" onPress={handleButtonClick}></Button>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
  },
  button: {
  },
  scrollbar: {
  },
  label:{
    fontSize: 24,
    padding: 10,
  },
});