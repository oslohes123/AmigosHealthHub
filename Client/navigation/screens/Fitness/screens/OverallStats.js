import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useGetExerciseNameFreq } from '../hooks/exercise/useGetExerciseNameFreq';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export default function OverallStats({navigation}) {

  const screenWidth = Dimensions.get("window").width;
  const [getExerciseNameFreqData, setExerciseNameFreqData] = useState(null);
  const [getExerciseNameFreqLabels, setExerciseNameFreqLabels] = useState(null);
  const {getExerciseNameFreq, isLoading, error} = useGetExerciseNameFreq();
  const isFocused = useIsFocused();
  useEffect(() => {
    const setDataAndLabels = async () => {
      setExerciseNameFreqData(null);
      const result = await getExerciseNameFreq();
      if (result) {
        const { exerciseNameLabels, exerciseNameData } = result;
        setExerciseNameFreqData(exerciseNameData);
        setExerciseNameFreqLabels(exerciseNameLabels);
      }
    };
    setDataAndLabels();
    console.log(`getExerciseNameFreqData:${getExerciseNameFreqData}`);
    console.log(`getExerciseNameFreqLabels:${getExerciseNameFreqLabels}`);
  }, [navigation, isFocused]);

  // const exerciseNameData = {
  //   labels: getExerciseNameFreqLabels,
  //   datasets: [
  //     {
  //       data: getExerciseNameFreqData,
  //       color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  // };

  const exerciseNameData = {
    labels: getExerciseNameFreqLabels,
    datasets: [
      {
        data: getExerciseNameFreqData
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
      {isLoading && (
        <>
          {/* <Text>Refreshing.....</Text> */}
          <ActivityIndicator
            animating={true}
            size={50}
            color={MD2Colors.lightBlue400}
          />
        </>
      )}
       {getExerciseNameFreqData && getExerciseNameFreqLabels && (
          <TouchableWithoutFeedback>
          <View style={{ marginBottom: 40 }}>
            <Text style={[styles.title]}>Number Of Times An Exercise Was Performed</Text>
            <BarChart
              // style={{ borderRadius: 25 }}
              data={exerciseNameData}
              width={screenWidth}
              height={220}
              // yAxisSuffix={` kg`}
              chartConfig={chartConfig}
              fromZero={true}
            />
          </View>
          </TouchableWithoutFeedback>
        )}

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

