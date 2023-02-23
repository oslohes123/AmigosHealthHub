import { TouchableOpacity, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

export default function widget({interactive = true, iconName = 'chevron-forward-outline', widgetText = "Widget Title", fontSize = 16, height = screenHeight * 0.2, width = screenWidth * 0.4, buttonFunction = () => {}, widgetColor = "#ffc542", iconColor = '#fff', mainComponent = <View></View> }) {
    const styles = {
        textData: {
          fontSize: fontSize,
          color: '#fff',
          fontWeight: 'bold',
          alignSelf: 'center'
        },
        textContainer: {
          backgroundColor: widgetColor,
          borderRadius: 15,
          padding: 20,
          width: width,
          height: height,
          alignSelf: 'center',
          margin: 10
        }
    }

  return (
    interactive ? 
    <TouchableOpacity onPress={buttonFunction} style={styles.textContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.textData}>{widgetText}</Text>
          <Ionicons name={`${iconName}`} size={fontSize} color={iconColor} />
        </View>
        {mainComponent}
    </TouchableOpacity>
    :
    <View style={styles.textContainer}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.textData}>{widgetText}</Text>
      <Ionicons name={`${iconName}`} size={fontSize} color={iconColor} />
    </View>
    {mainComponent}
    </View>
  )
}
