import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
// import Header from './components/Header';
// import Header1 from './components/Header1';
// import NavBar from '../../components/NavBar';
//import NutrientsButton from '../components/NutrientsButton';
// import { Feather } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PieChart} from "react-native-chart-kit";
import themeContext from '../../theme/themeContext';
import { EventRegister } from 'react-native-event-listeners'
import { genericSearch , specificSearch} from '../../../functions/foodSearch'


export default function DietDashboardScreen({ navigation }) {

  const theme = useContext(themeContext)

  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const HListener = EventRegister.addEventListener('ChangeHeader', (data) => {
        setShowHeader(data)
    })
    return () => {
        EventRegister.removeEventListener(HListener)
    }
    }, [showHeader])

  const Piedata = [
    {
      name: "Protein",
      amount: 60,
      color: "orange",
      legendFontColor: "black",
      legendFontSize: 18
    },
    {
      name: "Carbs",
      amount: 120,
      color: "green",
      legendFontColor: "black",
      legendFontSize: 18



    },
    {
      name: "Fat",
      amount: 25,
      color: "yellow",
      legendFontColor: "black",
      legendFontSize: 18
    },
    {
      name: "Vitamins",
      amount: 55,
      color: "blue",
      legendFontColor: "black",
      legendFontSize: 18
    },
    {
      name: "Fibre",
      amount: 34,
      color: "red",
      legendFontColor: "black",
      legendFontSize: 18
    }
  ];

  const [foodNames,setFoodNames] = useState([
  ]);

  const [text, setText] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await genericSearch(text);
      setFoodNames(data)
    }
    if(text.length > 2){
      fetchData();
    }
  }, [text]);


  const pressHandler = () => {
    navigation.navigate('Nutrients');
  }

  // const newPressHandler = () => {
  //   navigation.navigate('foodSearch');
  // }

  // const pressHandler1 = () => {
  //   navigation.navigate('Settings');
  // }

  const pressHandler2 = (name, calories, Protein, Carbs, Fat, Sugars, Vitamins, Fibre) => {
    navigation.navigate('Food Details', { name, calories, Protein, Carbs, Fat, Sugars, Vitamins, Fibre });
  }

  const pressHandler3 = () => {
    navigation.navigate('Food History');
  }

  // const [text, setText] = useState('')

  // const submitHandler = (inputText) => {
  //   setText(inputText)
  // }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={styles.headerView}>
        <Text style={[styles.title, {color:theme.color}]}>Calorie Goal-:</Text>
        <Text style={[styles.number, {color:theme.color}, {borderColor:theme.color}]}>1000cal</Text>
      </View>
      <View style={styles.headerView1}>
        <Text style={[styles.title, {color:theme.color}]}>Calories Remaining-:</Text>
        <Text style={[styles.number, {color:theme.color}, {borderColor:theme.color}]}>250cal</Text>
      </View>
      {/* <Header /> */}
      {/* {showHeader ? <Header /> : <Header1 />} */}
      {/* <View style={styles.icon}>
        <TouchableOpacity>
          <Feather name="settings" size={24} color={theme.color} onPress={pressHandler1} />
        </TouchableOpacity>
      </View> */}
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
          clearButtonMode='always'
          value={text}
          onChangeText={(value) => setText(value)}
          style={[styles.input, {borderColor: theme.color}, {color: theme.color}]}
          placeholder='Find food...' 
          placeholderTextColor={theme.color}/>

        <View style={styles.chart}>
        {text.length == 0 && (
          <TouchableOpacity style={styles.pieWidget} onPress={pressHandler}>
          <PieChart
          data={Piedata}
          width={340}
          height={210}
          paddingLeft='10'
          chartConfig={{
            //backgroundColor: "#e26a00",
            //backgroundGradientFrom: "#fb8c00",
            //backgroundGradientTo: "#ffa726",
            //decimalPlaces: 2,
            color: () => "black",
            // labelColor: () => 'black',
            // style: {
            //   borderRadius: 16,
            // },
            // propsForDots: {
            //   r: "6",
            //   strokeWidth: "2",
            //   stroke: "#ffa726"
            // }
            
          }}
          accessor="amount"
          backgroundColor="transparent"
        />
        </TouchableOpacity>
        )}
        </View>

        {text.length > 2 && (
          <ScrollView style={styles.scroll}>
            {foodNames.items && foodNames.items.map(item => (
              <TouchableOpacity onPress={() => pressHandler2(item.food_name)}
                style={styles.textContainer} key={item.food_name}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.textData} key={item.food_name}>{item.food_name} {item.item_id? ": Brand Item":null}</Text>
                  <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
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
        <Button title="View Food History" onPress={pressHandler3} color='black' />
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
  // icon: {
  //   position: 'absolute',
  //   top: 27,
  //   right: 20,
  // },


  input: {
    //marginTop: 10,
    //marginBottom: 10,
    //paddingHorizontal: 8,
    //paddingVertical: 6,
    //borderBottomWidth: 1,
    //borderBottomColor: '#ddd',
    width: 350,
    alignSelf: 'center',
    //backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    //marginVertical: 10,
    paddingVertical: 12,
    marginTop: -190,
    position: 'absolute',
    borderWidth: 1
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
    // marginTop: 10,
    height: 300,
    position: 'absolute',
    marginLeft: 40,

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
    marginTop: -70,
    width: '90%',
  },
  pieWidget: {
    backgroundColor: '#3eda9b',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 5
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 1,
  },
  number: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingBottom: 5,
    width: '30%',
    alignSelf: 'center',
    borderRadius: 15
  },
  headerView: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    margin: '7%'
  },
  headerView1: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: '-50%',
    margin: '7%'
  }
});
