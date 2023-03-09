import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars'
import { date } from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { PieChart } from "react-native-chart-kit";

export default function FoodHistory({ navigation }) {

  const currentDate = new Date();
  const markedDate = {
    [currentDate.toISOString().split('T')[0]]: {
      selected: true,
      marked: true,
      dotColor: 'red'
    }
  };

  const foodData = {
    '2023-03-08': [
      {
        name: "Apple",
        calories: "20cal",
        Carbs: "5g",
        Protein: "4g"
      },
      {
        name: "Orange",
        calories: "15cal",
        Carbs: "7g",
        Protein: "5g"
      },
      {
        name: "Banana",
        calories: "17cal",
        Carbs: "8g",
        Protein: "2g"
      },
      {
        name: "Mango",
        calories: "37cal",
        Carbs: "7g",
        Protein: "9g"
      },
      {
        name: "Grapes",
        calories: "20cal",
        Carbs: "5g",
        Protein: "4g"
      },
      {
        name: "Bread",
        calories: "20cal",
        Carbs: "5g",
        Protein: "4g"
      },
    ],
  }

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

  const [viewCalendar, setViewCalendar] = useState(false);
  const [selectDay, setSelectDay] = useState(null);
  const [food, setFood] = useState('');

  const toggleCalendar = () => {
    setViewCalendar(!viewCalendar);
  }

  const handleDayPress = (day) => {
    setSelectDay(day.dateString);
    console.log('selected day', day);
    setViewCalendar(false);
    setFood(getFood(day.dateString));
  }

  const getFood = (dateString) => {
    const food = foodData[dateString];
    if (food) {
      return food.map((item, index) => (
        <View key={index}>
          <TouchableOpacity>
            <Text style={styles.foodText}>
              Name: {item.name}
              {"\n"}
              Calories: {item.calories}
              {"\n"}
              Carbs: {item.Carbs}
              {"\n"}
              Protein: {item.Protein}
            </Text>
          </TouchableOpacity>
        </View>
      ));
    } else {
      return <Text style={styles.foodText}>No food item consumed on this day</Text>;
    }
  };

  const pressHandler = () => {
    navigation.navigate('Nutrients');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.primary}>
          {!selectDay && (
            <Text style={styles.text}>Select a day from the Calendar to View Food History</Text>
          )}
          {selectDay && (
            <Text style={styles.text}>{selectDay}-: 2500cal consumed</Text>
          )}
          <TouchableOpacity style={styles.icon} onPress={toggleCalendar}>
            <AntDesign name="calendar" size={35} color="white" />
          </TouchableOpacity>
        </View>

        {selectDay && !viewCalendar && (
          <TouchableOpacity style={styles.pieWidget} onPress={pressHandler}>
            <PieChart
              data={Piedata}
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
            onDayPress={handleDayPress}
            maxDate={new Date().toISOString().split('T')[0]}
            markedDates={markedDate}
          />
        )}
        {!viewCalendar && food !== '' && (
        <View >
          {getFood(selectDay)}
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
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    marginVertical: '5%'
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

