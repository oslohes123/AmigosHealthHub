import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height


export default function GreenButton({iconName = 'chevron-forward-outline', fontSize = 16, height = screenHeight * 0.2, width = screenWidth * 0.4, text = 'Submit', buttonFunction}) {
    const styles = {
        textData: {
          fontSize: fontSize,
          color: 'white',
          fontWeight: 'bold',
          alignSelf: 'center'
        },
        textContainer: {
          backgroundColor: '#3eda9b',
          borderRadius: 15,
          padding: 20,
          marginVertical: 10,
          width: width,
          height: height,
          alignSelf: 'center',
          marginHorizontal: 10
        }
    }
  return (
    <TouchableOpacity onPress={buttonFunction} style={styles.textContainer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textData}>{text}</Text>
            <Ionicons name={`${iconName}`} size={fontSize} color={'white'} />
        </View>
    </TouchableOpacity>
  )
}

