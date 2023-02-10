import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView} from 'react-native';

export default function Search({ navigation }) {
  
  // const pressHandler = () => {
  //   navigation.navigate('foodDetails');
  // }

const data = [
{ name: 'Apple'},
{ name: 'Banana' },
{ name: 'Bacon' },
{ name: 'Bagel' },
{ name: 'Basil' },
{ name: 'Bacon Bits' },
{ name: 'Beef' },
{ name: 'Bread' },
{ name: 'Butter' },
{ name: 'Broccoli' },
{ name: 'Brownie' },
{ name: 'Cherry' },
{ name: 'Date' },
{ name: 'Elderberry' },
{ name: 'Fig' },
{ name: 'Grape' },
{ name: 'Honeydew' },
{ name: 'Iced watermelon' },
{ name: 'Jackfruit' },
{ name: 'Kiwi' },
{ name: 'Lemon' },
{ name: 'Mango' },
{ name: 'Nectarine' },
{ name: 'Orange' },
{ name: 'Papaya' },
{ name: 'Quince' },
{ name: 'Raspberry' },
{ name: 'Strawberry' },
{ name: 'Tangerine' },
{ name: 'Ugli fruit' },
{ name: 'Vegetable juice' },
{ name: 'Watermelon' },
{ name: 'Xigua' },
{ name: 'Yellow watermelon' },
{ name: 'Zucchini' }
];


  const [text, setText] = useState('');

  const filteredData = data.filter(item => item.name.toLowerCase().startsWith(text.toLowerCase()));

  return (
      <View> 
          <TextInput 
          value={text}
          onChangeText = {(value) => setText(value)} 
          style={styles.input} 
          placeholder='Find food...'/>
        {text.length > 0 && (
        <ScrollView style={styles.scroll}> 
          {filteredData.length > 0 && filteredData.map(item => (
          <TouchableOpacity //onPress={pressHandler}
          style={styles.textContainer} key={item.name}>
            <Text style={styles.textData} key={item.name}>{item.name}</Text>
          </TouchableOpacity> 
          ))}
        </ScrollView>
        )}
      </View>
  );

}

const styles = StyleSheet.create({
  input: {
    color: '#fff',
    //marginTop: 10,
    //marginBottom: 10,
    //paddingHorizontal: 8,
    //paddingVertical: 6,
    //borderBottomWidth: 1,
    //borderBottomColor: '#ddd',
    width: 350,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    //marginVertical: 10,
    paddingVertical: 12,
    marginTop: 35,
    marginBottom: 20,
    //borderWidth: 1,
    //borderColor: '#CCCCCC',
  },
  textData: {
    fontSize: 25,
    color: 'black',
    marginLeft: 20,
    marginTop: 5,
    fontWeight: 'bold'
  },
  textContainer: {
    backgroundColor: '#48D1CC',
    borderRadius: 5,
    padding: 10,
    height: 60,
    marginVertical: 10,
    width: 350,
    alignSelf: 'center'
  },
  scroll: {
    marginTop: 10,
    height: 600,
  },
});