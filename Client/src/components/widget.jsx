import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function widget({
  iconName = 'chevron-forward-outline', widgetText = 'Widget Title', fontSize = 16, height = 50, width = 50, buttonFunction, widgetColor = '#ffc542',
}) {
  const styles = {
    textData: {
      fontSize,
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    textContainer: {
      backgroundColor: '#3eda9b',
      borderRadius: 15,
      padding: 20,
      marginVertical: 10,
      width: `${width}%`,
      height: `${height}%`,
      alignSelf: 'center',
      marginHorizontal: 10,
    },
  };

  return (
    <TouchableOpacity onPress={buttonFunction} style={styles.textContainer}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textData}>{widgetText}</Text>
        <Ionicons name={`${iconName}`} size={fontSize} color={widgetColor} />
      </View>
    </TouchableOpacity>
  );
}
