import { View, Text, TextInput, Dimensions } from 'react-native'
import React from 'react'

export default function SearchBar({ placeholder = 'Search', customStyle = styles.search_bar, textAlign = 'center', themeColor = '#000', width = screenWidth * 0.9}) {
  return (
    <TextInput 
      style={[customStyle, {borderColor: themeColor, color: themeColor, width: width}]} 
      placeholder={placeholder} 
      textAlign={textAlign} 
      placeholderTextColor={themeColor}
      clearButtonMode={'always'}
    />
  )
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

const styles = {
  search_bar: {
    borderRadius: 2,
    borderWidth: 2,
    borderRadius: 25,
    padding: 12
  }
}