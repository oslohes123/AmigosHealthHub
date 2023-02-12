import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import Header from './components/Header';
import NavBar from '../../components/NavBar';
//import NutrientsButton from '../components/NutrientsButton';
import { Feather } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PieChart} from "react-native-chart-kit";

export default function DietDashboardScreen({ navigation }) {

  const Piedata = [
    {
      name: "Protein",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Carbs",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Fat",
      population: 527612,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Vitamins",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Fibre",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const [data] = useState([
    { name: 'Apple', calories: '50 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Banana', calories: '20 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Bacon', calories: '30 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Bagel', calories: '70 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Basil', calories: '90 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Bacon Bits', calories: '25 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Beef', calories: '45 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Bread', calories: '47 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Butter', calories: '74 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Broccoli', calories: '53 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Brownie', calories: '58 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Cherry', calories: '59 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Date', calories: '65 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Elderberry', calories: '47 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Fig', calories: '94 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Grape', calories: '41 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Honeydew', calories: '222 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Iced watermelon', calories: '120 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Jackfruit', calories: '450 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Kiwi', calories: '61 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Lemon', calories: '11 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Mango', calories: '4 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Nectarine', calories: '96 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Orange', calories: '68 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Papaya', calories: '16 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Quince', calories: '17 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Raspberry', calories: '518 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Strawberry', calories: '18 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Tangerine', calories: '9 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Ugli fruit', calories: '3 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Vegetable juice', calories: '89 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Watermelon', calories: '32 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Xigua', calories: '98 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Yellow watermelon', calories: '32 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' },
    { name: 'Zucchini', calories: '45 cal', Protein: '2g', Carbs: '3g', Fat: '1g', Sugars: '2g', Vitamins: '4g', Fibre: '2.5g' }
  ]);

  const [text, setText] = useState('');

  const filteredData = data.filter(item => item.name.toLowerCase().startsWith(text.toLowerCase()));


  const pressHandler = () => {
    navigation.navigate('Nutrients');
  }

  // const newPressHandler = () => {
  //   navigation.navigate('foodSearch');
  // }

  const pressHandler1 = () => {
    navigation.navigate('Settings');
  }

  const pressHandler2 = (name, calories, Protein, Carbs, Fat, Sugars, Vitamins, Fibre) => {
    navigation.navigate('Food Details', { name, calories, Protein, Carbs, Fat, Sugars, Vitamins, Fibre });
  }

  // const [text, setText] = useState('')

  // const submitHandler = (inputText) => {
  //   setText(inputText)
  // }

  return (
    
    <SafeAreaView style={styles.container}>
      
      <Header />
      <View style={styles.icon}>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="white" onPress={pressHandler1} />
        </TouchableOpacity>
      </View>
      {/* <View>
        <Search submitHandler={submitHandler} />
      </View> */}
      {/* <TouchableOpacity> */}
      {/* <View>
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View> */}
      {/* </TouchableOpacity> */}
      {/* <ScrollView style={styles.fullScroll}> */}
      <View>
        <TextInput
          value={text}
          onChangeText={(value) => setText(value)}
          style={styles.input}
          placeholder='Find food...' />
        <View style={styles.chart}>
        {text.length == 0 && (
          <PieChart
          data={Piedata}
          width={385}
          height={240}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          accessor="population"
          backgroundColor="transparent"
        />
        )}
        </View>
        {text.length > 0 && (
          <ScrollView style={styles.scroll}>
            {filteredData.length > 0 && filteredData.map(item => (
              <TouchableOpacity onPress={() => pressHandler2(item.name, item.calories, item.Protein, item.Carbs, item.Fat, item.Sugars, item.Vitamins, item.Fibre)}
                style={styles.textContainer} key={item.name}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.textData} key={item.name}>{item.name}</Text>
                  <Ionicons name={'chevron-forward-outline'} size={'32px'} color={'black'} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        </View>
        {/* <Pie 
           radius={70}
           innerRadius={45}
           sections={pieData}
           backgroundColor="#ddd"
          /> */}
      <View style={styles.button}>
        <Button title="View Stats" onPress={pressHandler} color='black' />
      </View>
      {/* 
      <TouchableOpacity onPress={newPressHandler}>
      <View style={styles.searchFood}>
      <Feather name="search" size={18} color="black"  />
      <Text style={{color: 'grey', marginLeft: 15}}>Search for a food...</Text>
      </View>
      </TouchableOpacity> */}
      <View>
        {/* <NavBar /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203038',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    width: 200,
    alignSelf: 'center',
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
    marginBottom: -180,
    backgroundColor: '#48D1CC',
    //margin: 10,
    //marginBottom: -100,
  },
  // searchFood: {
  //   color: '#fff',
  //   height: 42,
  //   width: 300,
  //   alignSelf: 'center',
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 25,
  //   paddingHorizontal: 16,
  //   fontSize: 12,
  //   color: '#000000',
  //   paddingVertical: 12,
  //   flexDirection: 'row',
  //   marginTop: 250,
  // },
  icon: {
    position: 'absolute',
    top: 27,
    right: 20,
  },


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
    marginTop: -190,
    marginBottom: 20,
    position: 'absolute',
    //borderWidth: 1,
    //borderColor: '#CCCCCC',
  },
  textData: {
    fontSize: 25,
    color: 'black',
    // marginLeft: 20,
    //marginTop: 1,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    
  },
  textContainer: {
    backgroundColor: '#3eda9b',
    borderRadius: 15,
    padding: 20,
    // height: 50,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: 10
  },
  scroll: {
    marginTop: 10,
    height: 300,
    position: 'absolute',
    marginLeft: 40,
    marginTop: -120,
    alignSelf: 'center',
    // textAlign: 'flex-start',
    flex: 1,
    width: '100%'
  },
  // surr: {
  //   borderWidth: 2,
  //   borderColor: 'white',
  //   padding: 200,
  //   // height: 200,
  //   position: 'absolute',
  //   // right: 1,
  //   // width: 380
  // }
  chart: {
    alignSelf: 'center',
    flex: 1,
    marginTop: -90,
    marginLeft: 40
  }
});
