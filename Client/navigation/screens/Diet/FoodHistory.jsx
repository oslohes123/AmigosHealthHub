/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, ScrollView,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

import {
  getFood, getTrackedFood, getSpecificTrackedFood, getPieChartData,
} from './hooks/Food';
import { getLatestCalorieGoal, getCaloriesRemaining } from './hooks/Calories';
import { useAuthContext } from '../Authentication/context/AuthContext';
import themeContext from '../../theme/themeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: '15%',
    marginVertical: '5%',
    width: '95%',
    alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
  },
  foodText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#c2e7fe',
    width: '95%',
  },
  icon: {
    margin: 5,
  },
  pieWidget: {
    backgroundColor: '#c3e7fe',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 5,
    marginVertical: 10
  },
  scroll: {
    height: 400,
  },
  calendar: {
    width: '100%',
    alignSelf: 'center',
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
  },
});

export default function FoodHistory({ navigation }) {
  const theme = useContext(themeContext);
  const screenWidth = Dimensions.get('window').width;
  const [foodData, setFoodData] = useState([]);
  const [viewCalendar, setViewCalendar] = useState(false);
  const [selectDay, setSelectDay] = useState(new Date().toISOString().split('T')[0]);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [caloriesRemaining, setCaloriesRemaining] = useState(0);
  const [pieChartData, setPieChartData] = useState([]);

  const currentDate = new Date();
  const markedDate = {
    [currentDate.toISOString().split('T')[0]]: {
      selected: true,
      marked: true,
      dotColor: 'red',
    },
  };

  const { user } = useAuthContext();
  const { id } = user;

  async function getCalorieData() {
    const data = await getLatestCalorieGoal(id, selectDay);
    if (data === -1) {
      setCalorieGoal(0);
      setCaloriesRemaining(0);
    } else {
      setCalorieGoal(data.CalorieGoal);
      const calories = await getCaloriesRemaining(id, selectDay, data.CalorieGoal);
      setCaloriesRemaining(calories);
    }
  }

  async function updatePieChart() {
    const data = await getPieChartData(id, selectDay);
    setPieChartData(data);
  }

  async function gettingTrackedFood() {
    const response = await getTrackedFood(selectDay, id);
    setFoodData(response);
    getCalorieData();
  }

  useEffect(() => {
    setViewCalendar(false);
    gettingTrackedFood();
    updatePieChart();
  }, [selectDay]);

  const toggleCalendar = () => {
    setViewCalendar(!viewCalendar);
  };

  async function foodPress(item) {
    const selectedFoodDetails = await getFood(item.FoodID);
    const trackedFoodDetails = await getSpecificTrackedFood(item.LogID);
    navigation.navigate('Food History Details', { selectedFoodDetails, trackedFoodDetails });
  }

  const pressHandler = () => {
    navigation.navigate('Nutrients', pieChartData);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scroll} justifyContent={viewCalendar ? 'flex-end' : 'flex-start'}>
        <View style={styles.primary}>
          {!selectDay && (
            <Text style={[styles.text, { color: theme.color }]}>
              Select a day from the Calendar to View Food History
            </Text>
          )}
          {selectDay && (
            <Text style={[styles.text, { color: theme.color, borderColor: theme.color, width: screenWidth * 0.7 }]}>
              Date:
              {' '}
              {selectDay}
              {'\n'}
              Calorie-goal:
              {' '}
              {calorieGoal}
              {'\n'}
              Calories-remaining:
              {' '}
              {caloriesRemaining}
            </Text>
          )}
          <TouchableOpacity style={styles.icon} onPress={toggleCalendar}>
            <AntDesign testID='calendarIcon' name="calendar" size={35} color={theme.color} />
          </TouchableOpacity>
        </View>

        {selectDay && !viewCalendar && pieChartData.length > 0 && (
          <TouchableOpacity style={styles.pieWidget} onPress={pressHandler}>
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
        )}
        
        {!viewCalendar && foodData && (
          <View>
            {foodData.length > 0
              ? foodData.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => foodPress(item)}>
                    <Text style={styles.foodText}>
                      Name:
                      {' '}
                      {item.FoodName}
                      {'\n'}
                      Total meal Calories:
                      {' '}
                      {item.CaloriesInMeal}
                      {'\n'}
                      Quantity:
                      {' '}
                      {item.Quantity}
                      {'\n'}
                      Measure:
                      {' '}
                      {item.Measure}
                      {'\n'}
                      {item.BrandName ? `Brand: ${item.BrandName}` : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              )) : <Text style={styles.foodText}>No food item consumed on this day</Text>}
          </View>
        )}

        {viewCalendar && (
          <Calendar
            testID='calendar'
            style={styles.calendar}
            onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
            onDayPress={(day) => setSelectDay(day.dateString)}
            maxDate={new Date().toISOString().split('T')[0]}
            markedDates={markedDate}
          />
        )}
      </ScrollView>
    </View>
  );
}
