import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TextInput,  Dimensions} from "react-native";
import WordCloud from '../../../cloud.js';
import { LineChart } from 'react-native-chart-kit';
// npm install , npm install react-native-chart-kit , npx expo install react-native-svg ,  npm install react-native-word-cloud, npm install prop-types
import React , {useEffect, useState} from 'react';
// import { useAuthContext } from '../Authentication/context/AuthContext.js';
 import { useGetFaceValues } from './hooks/useGetFaceValues.js';
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
//: {navigation: any}
export default function App({navigation}) {

   const [getFaceValuesArray, setFaceValuesArray]= useState([1]);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getCurrentDayOfWeek = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  return dayOfWeek;
};

  const currentDayOfWeek = getCurrentDayOfWeek();
  const daysOfWeekWithCurrentDayLast = [
    ...daysOfWeek.slice(currentDayOfWeek + 1),
    ...daysOfWeek.slice(0, currentDayOfWeek + 1),
  ];


const line = {
  labels: daysOfWeekWithCurrentDayLast,
  datasets: [
    {
      data: getFaceValuesArray.reverse(),
      strokeWidth: 2, // optional
    },
  ],
};
  const {getFaceValues} = useGetFaceValues();
  useEffect(() => {

    async function getFaceValuesCall(){
      const faceValues = await getFaceValues();
      setFaceValuesArray(faceValues);
      console.log(`faceValuesUseEffect: ${JSON.stringify(faceValues)}`)
    }

      getFaceValuesCall();
  }, [])
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    aligItems: 'center',
    justifyContent: 'center',
  },
});
