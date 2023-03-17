import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useGetExerciseNameFreq } from '../hooks/exercise/useGetExerciseNameFreq';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTrackedWorkoutFreq } from '../hooks/trackedWorkouts/useTrackedWorkoutFreq';
import { useNavigation } from '@react-navigation/native';
import { useGetExerciseTypeFreq } from '../hooks/exercise/useGetExerciseTypeFreq';
export default function OverallStats() {

  const screenWidth = Dimensions.get("window").width;
  const [getExerciseNameFreqData, setExerciseNameFreqData] = useState(null);
  const [getExerciseNameFreqLabels, setExerciseNameFreqLabels] = useState(null);

  const [getTrackedWorkoutFreqData, setTrackedWorkoutFreqData] = useState(null);
  const [getTrackedWorkoutFreqLabels, setTrackedWorkoutFreqLabels] = useState(null);

  const [getExerciseTypeFreqData, setExerciseTypeFreqData] = useState(null);
  const [getExerciseTypeFreqLabels, setExerciseTypeFreqLabels] = useState(null);


   const {getTrackedWorkoutFreq, isLoadingGetWorkoutFreq, getErrorGetWorkoutFreq}= useTrackedWorkoutFreq()
   const {getExerciseTypeFreq, getErrorGetExerciseType, isLoadingExerciseType} = useGetExerciseTypeFreq()
   const {getExerciseNameFreq, isLoading, error} = useGetExerciseNameFreq();

  const isFocused = useIsFocused();
  const navigation = useNavigation()
  useEffect(() => {
    const setDataAndLabels = async () => {
      setExerciseNameFreqData(null);
      setTrackedWorkoutFreqData(null);
      setExerciseTypeFreqData(null);
      const result = await getExerciseNameFreq();
       const workoutFreq= await getTrackedWorkoutFreq();
      const exerciseTypeFreq = await getExerciseTypeFreq();
      if(exerciseTypeFreq){
        const {  exerciseTypeLabels,  exerciseTypeData } = exerciseTypeFreq;
        setExerciseTypeFreqData(exerciseTypeData);
        setExerciseTypeFreqLabels(exerciseTypeLabels);
      }
      if (result) {
        const { exerciseNameLabels, exerciseNameData } = result;
        setExerciseNameFreqData(exerciseNameData);
        setExerciseNameFreqLabels(exerciseNameLabels);
      }
       if (workoutFreq) {
        const { workoutNameLabels, workoutNameData } = workoutFreq;
        setTrackedWorkoutFreqData(workoutNameData);
        setTrackedWorkoutFreqLabels(workoutNameLabels);
      }
    };
    setDataAndLabels();
    console.log(`getExerciseNameFreqData:${getExerciseNameFreqData}`);
    console.log(`getTrackedWorkoutFreqData:${getTrackedWorkoutFreqData}`);
    console.log(`getExerciseTypeFreqData:${getExerciseTypeFreqData}`);

  }, [navigation, isFocused]);

  const exerciseNameData = {
    labels: getExerciseNameFreqLabels,
    datasets: [
      {
        data: getExerciseNameFreqData
      }
    ]
  };

  const workoutNameFreq = {
    labels: getTrackedWorkoutFreqLabels,
    datasets: [
      {
        data: getTrackedWorkoutFreqData
      }
    ]
  };

  const exerciseTypeData = {
    labels: getExerciseTypeFreqLabels,
    datasets: [
      {
        data: getExerciseTypeFreqData
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
          <ActivityIndicator
            animating={true}
            size={30}
            color={MD2Colors.lightBlue400}
          />
        </>
      )}
      {
        error && (<Text>{error}</Text>)
      }
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



{isLoadingExerciseType && (
        <>
          <ActivityIndicator
            animating={true}
            size={30}
            color={MD2Colors.lime400}
          />
        </>
      )}
      {
        getErrorGetExerciseType && (<Text>{getErrorGetExerciseType}</Text>)
      }
       {getExerciseTypeFreqData && getExerciseTypeFreqLabels && (
        
          <TouchableWithoutFeedback>
          <View style={{ marginBottom: 40 }}>
            <Text style={[styles.title]}>Frequency of all exercise types</Text>
            <BarChart
              // style={{ borderRadius: 25 }}
              data={exerciseTypeData}
              width={screenWidth}
              height={220}
              // yAxisSuffix={` kg`}
              chartConfig={chartConfig}
              fromZero={true}
            />
          </View>
          </TouchableWithoutFeedback>
        )}


{isLoadingGetWorkoutFreq && (
        <>
       
          <ActivityIndicator
            animating={true}
            size={30}
            color={MD2Colors.red100}
          />
        </>
      )}
      {
        getErrorGetWorkoutFreq && (<Text>{getErrorGetWorkoutFreq}</Text>)
      }
       {getTrackedWorkoutFreqData && getTrackedWorkoutFreqLabels && (
        
          <TouchableWithoutFeedback>
          <View style={{ marginBottom: 40 }}>
            <Text style={[styles.title]}>Frequency of all workouts</Text>
            <BarChart
              // style={{ borderRadius: 25 }}
              data={workoutNameFreq}
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
  )}


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
      pieWidget: {
        backgroundColor: "#c2e7fe",
        borderRadius: 25,
        alignSelf: "center",
        padding: 5,
        marginTop: '10%'
      },
})

