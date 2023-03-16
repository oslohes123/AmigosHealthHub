import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars'
import { date } from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { PieChart } from "react-native-chart-kit";
import { getFood, getTrackedFood,getSpecificTrackedFood, getPieChartData } from '../../../functions/Food';
import { getLatestCalorieGoal, getCaloriesRemaining } from '../../../functions/Calories';
import { useAuthContext } from '../Authentication/context/AuthContext';
import { useEffect } from 'react';


export default function FoodHistory({ navigation }) {

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
      dotColor: 'red'
    }
  };
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

  const { user } = useAuthContext();
  const id = user.id;

  async function getCalorieData() {
    let data = await getLatestCalorieGoal(id, selectDay);
    setCalorieGoal(data.CalorieGoal);
    let calories = await getCaloriesRemaining(id, selectDay, data.CalorieGoal);
    setCaloriesRemaining(calories)
  }

  async function updatePieChart() {
    let data = await getPieChartData(id,selectDay);
    setPieChartData(data);
  }

  async function gettingTrackedFood() {
    let response = await getTrackedFood(selectDay, id);
    setFoodData(response);
    getCalorieData();
  }

  useEffect(() => {
    setViewCalendar(false);
    gettingTrackedFood();
    updatePieChart();
  },[selectDay])


  const toggleCalendar = () => {
    setViewCalendar(!viewCalendar);
  }

  async function foodPress(item) {
    let selectedFoodDetails = await getFood(item.FoodID);
    let trackedFoodDetails = await getSpecificTrackedFood(item.LogID);
    navigation.navigate('Food History Details', {selectedFoodDetails,trackedFoodDetails});
  }

  const pressHandler = () => {
    navigation.navigate('Nutrients',pieChartData);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.primary}>
          {!selectDay && (
            <Text style={styles.text}>Select a day from the Calendar to View Food History</Text>
          )}
          {selectDay && (
            <Text style={styles.text}>Date: {selectDay} Calorie-goal: {calorieGoal} Calories-remaining: {caloriesRemaining}</Text>
          )}
          <TouchableOpacity style={styles.icon} onPress={toggleCalendar}>
            <AntDesign name="calendar" size={35} color="white" />
          </TouchableOpacity>
        </View>

        {selectDay && !viewCalendar && pieChartData.length > 0 &&  (
          <TouchableOpacity style={styles.pieWidget} onPress={pressHandler}>
            <PieChart
              data={pieChartData}
              width={340}
              height={210}
              paddingLeft='10'
              chartConfig={{
                color: () => "black",
              }}
              accessor="amount"
              backgroundColor="transparent"
            />
          </TouchableOpacity>
        )}
        {viewCalendar && (
          <Calendar
            style={styles.calendar}
            onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
            onDayPress={(day) => setSelectDay(day.dateString)}
            maxDate={new Date().toISOString().split('T')[0]}
            markedDates={markedDate}
          />
        )}
        {!viewCalendar && foodData && (
          <View >
            {foodData.length > 0 ?
            foodData.map((item, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => foodPress(item)}>
                  <Text style={styles.foodText}>
                    Name: {item.FoodName}
                    {"\n"}
                    Total meal Calories: {item.CaloriesInMeal}
                    {"\n"}
                    Quantity: {item.Quantity}
                    {"\n"}
                    Measure: {item.Measure}
                    {"\n"}
                    {item.BrandName ? "Brand: " + item.BrandName : null}
                  </Text>
                </TouchableOpacity>
              </View>)): <Text style={styles.foodText}>No food item consumed on this day</Text>}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#203038',
    flex: 1,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '15%',
    marginVertical: '5%',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white'
  },
  foodText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 25,
    //borderWidth: 1,
    //borderColor: 'white',
    alignSelf: 'center',
    marginVertical: '5%',
    backgroundColor: '#3eda9b',
    width: '60%'
  },
  icon: {
    marginLeft: '4%'
  },
  pieWidget: {
    backgroundColor: '#3eda9b',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 5
  },
  scroll: {
    height: 400,
  },
  calendar: {
    width: '90%',
    alignSelf: 'center',
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    //backgroundColor: 'black'
  }
})

