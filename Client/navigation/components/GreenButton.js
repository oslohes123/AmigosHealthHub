import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export default function GreenButton({ textColor = '#fff', marginHorzontal = 10, fontSize = 16, height = screenHeight * 0.2, width = screenWidth * 0.4, text = 'Submit', buttonDisabled = false, buttonFunction}) {
    const styles = {
        textData: {
          fontSize: fontSize,
          color: textColor,
          fontWeight: 'bold',
          alignSelf: 'center'
        },
        textContainer: {    
          backgroundColor: !buttonDisabled ? '#8bf2f3' : '#697a76',       
          borderRadius: 15,
          marginHorizontal: marginHorzontal,
          width: width,
          height: height,
          alignSelf: 'center',
        }
    }
  return (
    <TouchableOpacity onPress={buttonFunction} style={styles.textContainer} disabled={buttonDisabled}>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.textData}>{text}</Text>
      </View>       

    </TouchableOpacity>
  )
}

