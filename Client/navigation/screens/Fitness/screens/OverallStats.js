import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function OverallStats() {

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "white",
    //backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#0040ff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: 'center', marginTop: '10%'}}>
            <BarChart
              style={{borderRadius: 25}}
              data={data}
              width={0.8 * screenWidth}
              height={270}
              yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#203038',
      flex: 1,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        color: 'white',
        alignSelf: 'center',
      },
})

