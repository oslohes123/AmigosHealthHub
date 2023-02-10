import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RedButton({fontSize = 16, height = 50, width = 50, text = 'Submit', buttonFunction}) {
    const styles = {
        textData: {
            fontSize: fontSize,
            color: 'white',
            fontWeight: 'bold',
          },
          textContainer: {
            backgroundColor: '#ff565e',            
            borderRadius: 15,
            padding: 20,
            marginVertical: 10,
            width: `${width}%`,
            height: `${height}%`,
            alignSelf: 'center',
            marginHorizontal: 10
          },
    }
  return (
    <TouchableOpacity onPress={buttonFunction} style={styles.textContainer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textData}>{text}</Text>
            <Ionicons name={'chevron-forward-outline'} size={`${fontSize}px`} color={'white'} />
        </View>
    </TouchableOpacity>
  )
}