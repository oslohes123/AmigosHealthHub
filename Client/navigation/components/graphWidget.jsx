import { BarChart } from 'react-native-chart-kit';
import {
  Dimensions, StyleSheet, Text, View,
} from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

//
function GraphWidget(inputLabel, inputDataset, graphTitle, graphAttributes) {
  const chartData = {
    labels: inputLabel,
    datasets: [
      {
        data: inputDataset,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
      },
    ],
  };
  const screenWidth = Dimensions.get('window').width * 0.95;
  const { yAxisSuffix } = graphAttributes;
  return (
    <View>
      <Text style={styles.title}>{graphTitle}</Text>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={220}
        yAxisSuffix={yAxisSuffix}
        fromZero
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: '#38D689',
          fillShadowGradientFrom: '#233037',
          fillShadowGradientTo: '#252628',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default GraphWidget;
