/* eslint-disable  */
import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView, TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PieChart } from 'react-native-chart-kit';

import { useIsFocused } from '@react-navigation/native';
import themeContext from '../../theme/themeContext';
import { genericSearch, specificSearch } from './hooks/searchFood';
import { getCaloriesRemaining, getLatestCalorieGoal } from './hooks/Calories';
import { useAuthContext } from '../Authentication/context/AuthContext';

import { getPieChartData } from './hooks/Food';
import { FAB, SegmentedButtons } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  input: {
    color: '#fff',
    width: screenWidth * 0.95,
    alignSelf: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  textData: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  textContainer: {
    backgroundColor: '#c2e7fe',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  brandedTextContainer: {
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  scroll: {
    marginTop: 10,
    height: screenHeight * 0.48,
    alignSelf: 'center',
    width: screenWidth * 0.95,
  },
  chart: {
    alignSelf: 'center',
    width: '85%',
  },
  pieWidget: {
    backgroundColor: '#c3e7fe',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 5,
    marginVertical: 10
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  number: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
    alignSelf: 'center',
  },
  headerView: {
    borderWidth: 2,
    borderRadius: 15,
    width: '44%',
    margin: '5%',
    padding: 10,
  },
  headerView1: {
    borderWidth: 2,
    borderRadius: 15,
    width: '44%',
    margin: '5%',
    padding: 10,
  },
  info: {
    fontSize: 20,
    position: 'absolute',
    alignSelf: 'center'
  }
});

export default function DietDashboardScreen({ navigation }) {

  const theme = useContext(themeContext);
  const { color, background } = theme;
  const isFocused = useIsFocused();

  const { user } = useAuthContext(); 
  const { id } = user;
  const todaysDate = new Date().toISOString().split('T')[0];
  const [pieChartData, setPieChartData] = useState([]);

  const [genericFoodList, setGenericFoodList] = useState([]);

  const [specificFoodList, setSpecificFoodList] = useState([]);

  const [foodInput, setText] = useState('');

  const [calorieGoal, setCalorieGoal] = useState(0);

  const [caloriesRemaining, setCaloriesRemaining] = useState(0);

  const [segValue, setSegValue] = useState('Unbranded');

  async function getCalorieData() {
    const data = await getLatestCalorieGoal(id);
    setCalorieGoal(data.CalorieGoal);
    const calories = await getCaloriesRemaining(id, todaysDate, data.CalorieGoal);
    setCaloriesRemaining(calories);
  }

  async function updatePieChart() {
    const data = await getPieChartData(id);
    setPieChartData(data);
  }

  useEffect(() => {
    if (isFocused) {
      getCalorieData();
      updatePieChart();
    }
  }, [navigation, isFocused]);

  useEffect(() => {
    async function fetchData() {
      const data = await genericSearch(foodInput);
      if (data.items.length == 0) {
        Alert.alert('Api keys have expired for food, please contact the developers');
      }
      const brandedList = [];
      const genericList = [];
      data.items.map((item) => {
        if (item.item_id) {
          brandedList.push(item);
        } else {
          genericList.push(item);
        }
      });
      setGenericFoodList(genericList);
      setSpecificFoodList(brandedList);
    }
    if (foodInput.length > 2) {
      fetchData();
    } else if (foodInput.length < 3) {
      setGenericFoodList([]);
    }
  }, [foodInput]);

  const pieChartPress = async () => {
    navigation.navigate('Nutrients', pieChartData);
  };

  async function foodPress(name = null, nixItemId = null) {
    let data;
    if (nixItemId == null) {
      data = { foodData: await specificSearch(name), foodIdentifier: name };
    } else {
      data = { foodData: await specificSearch(nixItemId), foodIdentifier: nixItemId };
    }
    if(data.length == 0){
      Alert.alert('API keys have expired. Please contact the developers.');
      return;
    }
    navigation.navigate('Food Details', data);
  }

  const pressHandler3 = () => {
    navigation.navigate('Food History');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 20 }}>
        <View testID='goal' style={[styles.headerView, { borderColor: color, justifyContent: 'center' }]}>
          <Text style={[styles.title, { color }]}>Calorie Goal</Text>
          <Text style={[styles.number, { color }, { borderColor: color }]}>{calorieGoal}</Text>
        </View>
        <View testID='remaining' style={[styles.headerView, { borderColor: color }]}>
          <Text style={[styles.title, { color }]}>Calories Remaining</Text>
          <Text style={[styles.number, { color }, { borderColor: color }]}>
            {caloriesRemaining}
          </Text>
        </View>
      </View>
      <View>
        <TextInput
          clearButtonMode="always"
          value={foodInput}
          onChangeText={(value) => setText(value)}
          style={[styles.input, { borderColor: color, color, margin: 10 }]}
          placeholder="Find food..."
          placeholderTextColor={color}
        />

        {foodInput.length > 2 && (        <SegmentedButtons 
          style={{ width: screenWidth * 0.95, alignSelf: 'center' }}
          value={segValue}
          onValueChange={setSegValue}
          buttons={[
            {
              value: 'Unbranded',
              label: 'Unbranded',
              testID:'Unbranded',
            },
            {
              value: 'Branded',
              label: 'Branded',
              testID:'branded',
            },
          ]}
          />
          )}
        </View>
        </View>
      <View>
          {foodInput.length <= 2 && pieChartData.length > 0 && (
            
            <View style={{ height: screenHeight * 0.4, justifyContent: 'center'}}>
              <TouchableOpacity testID='pie' style={styles.pieWidget} onPress={pieChartPress}>
              <PieChart
                data={pieChartData}
                width={0.95 * screenWidth}
                height={210}
                chartConfig={{
                  color: () => 'black',
                  }}
                  accessor="amount"
                  backgroundColor="transparent"
                  />
              </TouchableOpacity>
            </View>
          )}
          {foodInput.length === 0 && pieChartData.length === 0 && (
            <Text style={[styles.info, {color: color}]}>Add Food to view Diet Info</Text>
          )}

        <View style={{flexDirection: 'row'}}>
        {foodInput.length > 2
          && segValue === 'Unbranded' && (
            <ScrollView testID='UnbrandedScroll' style={styles.scroll}>
              {genericFoodList.length > 2 && genericFoodList.map((item) => (
                <TouchableOpacity
                  onPress={() => foodPress(item.food_name, null)}
                  style={styles.textContainer}
                  key={item.food_name}
                >
                  <View>
                    <View>
                      <Text style={styles.textData} key={item.food_name}>{item.food_name}</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={32} color="black" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {foodInput.length > 2
            && segValue === 'Branded' && (
            <ScrollView testID='brandedScroll' style={styles.scroll}>
              {specificFoodList.length > 2 && specificFoodList.map((item) => (
                <TouchableOpacity
                  onPress={() => foodPress(null, item.item_id)}
                  style={styles.brandedTextContainer}
                  key={item.food_name}
                >
                  <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.textData} key={item.food_name}>{item.food_name}</Text>
                      <Text style={{ fontSize: 15, alignSelf: 'center', width: '100%' }}>({item.brand_name})</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={32} color="black" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            )}

        </View>
        {foodInput.length <= 2 && (
          <FAB 
            testID='foodHistory'
            onPress={pressHandler3} 
            style={{ alignSelf: 'center', width: screenWidth * 0.6, margin: 20 }}
            label="View Food History" 
            />
        )}
        </View>
    </SafeAreaView>
  );
}
