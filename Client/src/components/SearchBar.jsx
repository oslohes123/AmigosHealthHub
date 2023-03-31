import { TextInput, Dimensions } from 'react-native';
import React from 'react';

const styles = {
  search_bar: {
    borderRadius: 2,
    borderWidth: 2,
    borderRadius: 25,
    padding: 12,
  },
};

const screenWidth = Dimensions.get('window').width;

export default function SearchBar({
  placeholder = 'Search', customStyle = styles.search_bar, textAlign = 'center', themeColor = '#000', width = screenWidth * 0.95,
}) {
  return (
    <TextInput
      style={[customStyle, { borderColor: themeColor, color: themeColor, width }]}
      placeholder={placeholder}
      textAlign={textAlign}
      placeholderTextColor={themeColor}
      clearButtonMode="always"
    />
  );
}
