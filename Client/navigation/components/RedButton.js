import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export default function RedButton({ textColor = '#fff', fontSize = 16, height = screenHeight * 0.2, width = screenWidth * 0.4, text = 'Submit', buttonFunction}) {
    const styles = {
        textData: {
          fontSize: fontSize,
          color: textColor,
          fontWeight: 'bold',
          alignSelf: 'center'
        },
        textContainer: {
          backgroundColor: '#ff565e',
          borderRadius: 15,
          marginHorizontal: 10,
          width: width,
          height: height,
          alignSelf: 'center',
        }
    }
  return (
    <TouchableOpacity onPress={buttonFunction} style={[styles.textContainer, {width: width}]}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.textData}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}