import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button, Image} from 'react-native';
import Slider from '@react-native-community/slider'
import React, { useState } from 'react';
//npm install , npm install @react-native-community/slider --save

const moodImage = [require('../../../assets/Worst.png'), require('../../../assets/Sad.png'), require('../../../assets/Neutral.png'), require('../../../assets/Happy.png'), require('../../../assets/Perfect.png'),]

export default function App({navigation}: {navigation: any}) {
  const [moodI, setRangeI] = useState(require('../../../assets/Neutral.png'))
  const back = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Image source = {moodI}/>
      <Slider
        style = {{ width: 250, height: 40 }}
        minimumValue = {0}
        maximumValue = {4}
        minimumTrackTintColor = 'green'
        maximumTrackTintColor = 'green'
        thumbTintColor = 'green'
        value = {3}
        step={1}
        onValueChange = {(value: number) => setRangeI(moodImage[value])}
        />
      <TextInput
        style={styles.input}
        placeholder="Input Your Word Of The Day Here"
      />
      <Button title="Submit"></Button>      
      <Button title="<--" onPress={back}></Button>      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});