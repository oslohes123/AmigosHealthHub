import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Dimensions,
} from 'react-native';
import Cloud from 'react-native-word-cloud';
import { LineChart } from 'react-native-chart-kit';
// npx expo install react-native-svg
import React, {
  useEffect, useState, Component, useContext,
} from 'react';
import themeContext from '../../../theme/themeContext';
import useGetFaceValues from '../hooks/useGetFaceValues';
import useGetWordValues from '../hooks/useGetWordValues';
import useGetDateValues from '../hooks/useGetDateValues';

const screenWidth = Dimensions.get('window').width;
const colours = ['#ABDEE6', '#CBAACB', '#FFFFB5', '#FFCCB6', '#8FCACA', '#FFC8A2', '#55CBCD', '#FCB9AA', '#ECD5E3', '#C6DBDA', '#FED7C3', '#A2E1DB', '#97C1A9'];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function OutputMentalGraphs() {
  const { background, color } = useContext(themeContext);
  const [getFaceValuesArray, setFaceValuesArray] = useState([1]);
  const [getDateValuesArray, setDateValuesArray] = useState([0]);
  const [getWordValuesArray, setWordValuesArray] = useState([{ word: '', freq: 0, colour: '#ffffff' }]);
  class WordCloud extends Component {
    render() {
      return (
        <Cloud keywords={getWordValuesArray} scale={300} largestAtCenter />
      );
    }
  }
  // make button press change current screen to form screen
  // make a useEffect function to get the date values
  const { getDateValues } = useGetDateValues();
  useEffect(() => {
    async function getDateValuesCall() {
      const dateValues = await getDateValues();
      setDateValuesArray(dateValues);
    }
    getDateValuesCall();
  }, []);
  // declare x/y axis values for the line graph
  const line = {
    labels: getDateValuesArray,
    datasets: [
      {
        data: getFaceValuesArray,
        // thickness of line
        strokeWidth: 2,
      },
    ],
  };
  // make a useEffect function to get the face values
  const { getFaceValues } = useGetFaceValues();
  useEffect(() => {
    async function getFaceValuesCall() {
      const faceValues = await getFaceValues();
      const numberFaceValues = faceValues.map(Number);
      setFaceValuesArray(numberFaceValues);
    }
    getFaceValuesCall();
  }, []);
  // make a useEffect function to get the word values
  const { getWordValues } = useGetWordValues();
  useEffect(() => {
    async function getWordValuesCall() {
      const wordValues = await getWordValues();
      const wordfreqcolor = [];
      // convert json into the form of array that is accepted by the wordcloud package
      for (let i = 0; i < wordValues.words.length; i += 1) {
        wordfreqcolor.push({ keyword: (`${wordValues.words[i]}`).slice(1, -1), frequency: Math.cbrt(Number(wordValues.freq[i])), color: colours[Math.floor(Math.random() * colours.length)] });
      }
      if (wordfreqcolor === '') {
        setWordValuesArray([{ keyword: '', frequency: 1, color: '#ffffff' }]);
      } else {
        setWordValuesArray(wordfreqcolor);
      }
    }
    getWordValuesCall();
  }, []);
  // components for the screen
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={{ color, fontWeight: 'bold', margin: 10 }}>Past Submissions (max 7)</Text>
      <LineChart
        data={line}
        width={screenWidth * 0.95}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text style={{ color, fontWeight: 'bold', margin: 10 }}>WordCloud for the Past Submissions (max 7)</Text>
      <WordCloud />
      <StatusBar style="auto" />
    </View>
  );
}
