import { SafeAreaView, View, Text, Dimensions } from 'react-native'
import { useState, useContext } from 'react';
import themeContext from '../../../theme/themeContext';

export default function AddCustomExerciseScreen() {
  const theme = useContext(themeContext)
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', maxHeight: screenHeight, alignItems:'center', paddingVertical: 10, backgroundColor: theme.background}}>
     
      <Text style={{color: theme.color, fontWeight: 'bold'}}>Create a custom exercise</Text>
      
    </SafeAreaView>
  )
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;