import React from 'react'
import { StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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

export default function SleepScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sleep</Text>

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
}
  