import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = {
  textContainer: {
    backgroundColor: '#3eda9b',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  textData: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
};

export default function SearchItems(item, searchFunction) {
  const { name } = item;
  return (
    <TouchableOpacity
      onPress={(thisItem) => searchFunction(thisItem)}
      style={styles.textContainer}
      key={name}
    >
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textData} key={name}>{name}</Text>
        <Ionicons name="chevron-forward-outline" size="32px" color="white" />
      </View>
    </TouchableOpacity>
  );
}
