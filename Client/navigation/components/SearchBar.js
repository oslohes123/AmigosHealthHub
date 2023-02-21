import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function SearchBar({ placeholder = 'Search', customStyle = styles.search_bar, textAlign = 'center' }) {
  return (
    <TextInput style={customStyle} placeholder={placeholder} textAlign={textAlign} />
  )
}

const styles = {
  search_bar: {
    borderRadius: 2,
    borderWidth: 2,
    flex: .9,
    marginHorrizontal: 12,
    borderRadius: 25,
    padding: 12
  }
}