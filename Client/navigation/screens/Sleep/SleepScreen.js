import React, { useState } from 'react'
import { View, Text, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import widget from '../../components/widget';

import ScrollPicker from 'react-native-wheel-scrollview-picker';

const line = {
  labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [7.4, 7.6, 5.5, 6.7, 7.2, 7.1, 7.0],
      strokeWidth: 2, // optional
    },
  ],
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

function avgSleepRating() {
  return (
    <View style={styles.content}>
      <Text style={styles.ratingText}>8.4</Text>
    </View>
  )
}

function latestRating() {
  // const [text, setText] = useState('');
  return (
    <ScrollPicker
      dataSource={['1', '2', '3', '4', '5', '6']}
      selectedIndex={0}
      // renderItem={(data, index) => {
      //   <Text>{data}</Text>
      // }}
      // onValueChange={(data, selectedIndex) => {
      //   <Text>{data}</Text>
      // }}
      itemHeight={60}
      wrapperHeight={screenHeight * 0.15}
      wrapperColor='#01009c'
      highlightBorderWidth={2}
      highlightColor='#fff'
      style={styles.ratingText}
      // itemHeight={20}
      // highlightColor='#d8d8d8'
      // highlightBorderWidth={2}
    />
    )
  }

export default function SleepScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sleep</Text>

      <View style={{padding: 10}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {widget({interactive: false, widgetText: 'Average Rating', widgetColor: '#01009c', iconName: 'analytics', mainComponent: avgRating(), fontSize: 12})}
          {widget({interactive: false, widgetText: 'Latest Rating', widgetColor: '#01009c', iconName: 'analytics', mainComponent: latestRating(), fontSize: 12})}
        </View>

        <LineChart
          data={line}
          width={screenWidth * 0.9}
          height={screenHeight * 0.3}
          fromZero={true}
          chartConfig={{
            // backgroundColor: '#01004c',
            backgroundGradientFrom: '#01007c',
            backgroundGradientTo: '#0100cc',
            decimalPlaces: 2, 
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 26,
            padding: 10,
          }}
        />   
      </View>

    </SafeAreaView>
  )
}

const styles = {
  title: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  ratingText: {
    color: '#fff',
    fontSize: 56,
    fontWeight: 'bold'
  }
}
  