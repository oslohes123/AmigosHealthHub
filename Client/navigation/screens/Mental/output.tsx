import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TextInput,  Dimensions} from "react-native";
import WordCloud from '../../../cloud.js';
import { LineChart } from 'react-native-chart-kit';
// npm install , npm install react-native-chart-kit , npx expo install react-native-svg ,  npm install react-native-word-cloud, npm install prop-types
import React from 'react';
 
const words = [
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
]
 
const screenWidth = Dimensions.get("window").width;
export default function App({navigation}: {navigation: any}) {
  const back = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Text>Graph</Text>
      <LineChart
      data={line}
      width={screenWidth}
      height={220}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, 
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />   

    <Text>Text is the WordCloud for the Past Week</Text>
    <WordCloud />
    <StatusBar style="auto" />
    <Button title="<--" onPress={back}></Button>      
    </View>
  );
}
const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2, // optional
    },
  ],
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
