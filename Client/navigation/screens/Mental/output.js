import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TextInput,  Dimensions} from "react-native";
import WordCloud from './components/cloud.js';
import Cloud from "react-native-word-cloud";
import { LineChart } from 'react-native-chart-kit';
// npm install , npm install react-native-chart-kit , npx expo install react-native-svg ,  npm install react-native-word-cloud, npm install prop-types
import React , {useEffect, useState, Component} from 'react';
// import { useAuthContext } from '../Authentication/context/AuthContext.js';
 import { useGetFaceValues } from './hooks/useGetFaceValues.js';
 import { useGetWordValues } from './hooks/useGetWordValues.js'
const screenWidth = Dimensions.get("window").width;
const colours = ["#ABDEE6","#CBAACB","FFFFB5","FFCCB6","8FCACA","FFC8A2","55CBCD","FCB9AA","ECD5E3","C6DBDA","FED7C3","A2E1DB","97C1A9"]

export default function App({navigation}) {

  const [getFaceValuesArray, setFaceValuesArray]= useState([1]);
  const [getWordValuesArray, setWordValuesArray]= useState([{word:"",freq:0,colour:"#ffffff"}]);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  class WordCloud extends Component {
    render() {
        return (
            <Cloud keywords={getWordValuesArray} scale={300} largestAtCenter={true} />
        )
    }
}
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
      data: getFaceValuesArray,
      strokeWidth: 2, // optional
    },
  ],
};
  const {getFaceValues} = useGetFaceValues();
  useEffect(() => {
    async function getFaceValuesCall(){
      const faceValues = await getFaceValues();
      const numberFaceValues = faceValues.map(Number)
      setFaceValuesArray(numberFaceValues);
      console.log(`faceValuesUseEffect: ${JSON.stringify(faceValues)}`)
    }
      getFaceValuesCall();
  }, [])

  const {getWordValues} = useGetWordValues();
  
  useEffect(() => {
    async function getWordValuesCall(){
      const wordValues = await getWordValues();
      console.log(`wordValuesUseEffect: ${JSON.stringify(wordValues)}`)
      const wordfreqcolor = [];
      for (let i = 0; i < wordValues.words.length; i++) {
        wordfreqcolor.push({keyword:(wordValues.words[i] + "").slice(1, -1),frequency:Number(wordValues.freq[i]),color: colours[Math.floor(Math.random() * colours.length)]})
      }
      if(wordfreqcolor==""){
        setWordValuesArray([{keyword:"", frequency:1, color:"#ffffff"}])
      }
      else{
        setWordValuesArray(wordfreqcolor)
      }    }
      getWordValuesCall();
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
