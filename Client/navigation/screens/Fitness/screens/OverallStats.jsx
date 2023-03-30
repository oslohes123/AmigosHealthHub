import React, { useState, useEffect, useContext } from 'react';
import {
  View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView, SafeAreaView,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import useGetExerciseNameFreq from '../hooks/exercise/useGetExerciseNameFreq';
import useTrackedWorkoutFreq from '../hooks/trackedWorkouts/useTrackedWorkoutFreq';
import useGetExerciseTypeFreq from '../hooks/exercise/useGetExerciseTypeFreq';
import themeContext from '../../../theme/themeContext';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pieWidget: {
    backgroundColor: '#c2e7fe',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 5,
    marginTop: '10%',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default function OverallStats() {
  const { background, color } = useContext(themeContext);
  const [getExerciseNameFreqData, setExerciseNameFreqData] = useState(null);
  const [getExerciseNameFreqLabels, setExerciseNameFreqLabels] = useState(null);

  const [getTrackedWorkoutFreqData, setTrackedWorkoutFreqData] = useState(null);
  const [getTrackedWorkoutFreqLabels, setTrackedWorkoutFreqLabels] = useState(null);

  const [getExerciseTypeFreqData, setExerciseTypeFreqData] = useState(null);
  const [getExerciseTypeFreqLabels, setExerciseTypeFreqLabels] = useState(null);

  const {
    getTrackedWorkoutFreq, isLoadingGetWorkoutFreq, getErrorGetWorkoutFreq,
  } = useTrackedWorkoutFreq();
  const {
    getExerciseTypeFreq, getErrorGetExerciseType, isLoadingExerciseType,
  } = useGetExerciseTypeFreq();
  const { getExerciseNameFreq, isLoading, error } = useGetExerciseNameFreq();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    const setDataAndLabels = async () => {
      setExerciseNameFreqData(null);
      setTrackedWorkoutFreqData(null);
      setExerciseTypeFreqData(null);
      const result = await getExerciseNameFreq();
      const workoutFreq = await getTrackedWorkoutFreq();
      const exerciseTypeFreq = await getExerciseTypeFreq();
      if (exerciseTypeFreq) {
        const { exerciseTypeLabels, exerciseTypeData } = exerciseTypeFreq;
        if (JSON.stringify(exerciseTypeLabels) === JSON.stringify([])
        || JSON.stringify(exerciseTypeData) === JSON.stringify([])) {
          setExerciseTypeFreqData(null);
          setExerciseTypeFreqLabels(null);
        } else {
          setExerciseTypeFreqData(exerciseTypeData);
          setExerciseTypeFreqLabels(exerciseTypeLabels);
        }
      }
      if (result) {
        const { exerciseNameLabels, exerciseNameData } = result;
        if (JSON.stringify(exerciseNameLabels) === JSON.stringify([])
        || JSON.stringify(exerciseNameData) === JSON.stringify([])) {
          setExerciseNameFreqData(null);
          setExerciseNameFreqLabels(null);
        } else {
          setExerciseNameFreqData(exerciseNameData);
          setExerciseNameFreqLabels(exerciseNameLabels);
        }
      }
      if (workoutFreq) {
        const { workoutNameLabels, workoutNameData } = workoutFreq;
        if (JSON.stringify(workoutNameLabels) === JSON.stringify([])
        || JSON.stringify(workoutNameData) === JSON.stringify([])) {
          setTrackedWorkoutFreqData(null);
          setTrackedWorkoutFreqLabels(null);
        } else {
          setTrackedWorkoutFreqData(workoutNameData);
          setTrackedWorkoutFreqLabels(workoutNameLabels);
        }
      }
    };
    setDataAndLabels();
  }, [navigation, isFocused]);

  const exerciseNameData = {
    labels: getExerciseNameFreqLabels,
    datasets: [
      {
        data: getExerciseNameFreqData,
      },
    ],
  };

  const workoutNameFreq = {
    labels: getTrackedWorkoutFreqLabels,
    datasets: [
      {
        data: getTrackedWorkoutFreqData,
      },
    ],
  };

  const exerciseTypeData = {
    labels: getExerciseTypeFreqLabels,
    datasets: [
      {
        data: getExerciseTypeFreqData,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: '#0040ff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <ScrollView>
        <TouchableWithoutFeedback style={{ alignSelf: 'center', marginTop: '10%' }}>
          <>
            {(isLoading || isLoadingExerciseType || isLoadingGetWorkoutFreq) && (
              <ActivityIndicator
                animating
                size={30}
                color={MD2Colors.lightBlue400}
              />
            )}
            {error && (<Text>{error}</Text>)}

            {!isLoading && !getExerciseNameFreqData && !getExerciseNameFreqLabels && (

            <Text style={[styles.title, { color }]}>No Exercise Name Freq Data!</Text>
            )}

            {getExerciseNameFreqData && getExerciseNameFreqLabels && (
              <TouchableWithoutFeedback testID="exercise_frequency_graph">
                <View style={{ marginVertical: 20, alignSelf: 'center' }}>
                  <Text style={[styles.title, { color }]}>Exercise frequency</Text>
                  <BarChart
                    style={{ borderRadius: 25 }}
                    data={exerciseNameData}
                    width={0.95 * screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    fromZero
                  />
                </View>
              </TouchableWithoutFeedback>
            )}

            {getErrorGetExerciseType && (
              <Text>{getErrorGetExerciseType}</Text>
            )}

            {!isLoading && !getExerciseTypeFreqData && !getExerciseTypeFreqData && (
              <Text style={[styles.title]}>No Exercise Type Freq Data!</Text>
            )}

            {getExerciseTypeFreqData && getExerciseTypeFreqLabels && (
              <TouchableWithoutFeedback testID="type_frequency_graph">
                <View style={{ marginBottom: 20, alignSelf: 'center' }}>
                  <Text style={[styles.title, { color }]}>Type frequency</Text>
                  <BarChart
                    style={{ borderRadius: 25 }}
                    data={exerciseTypeData}
                    width={0.95 * screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    fromZero
                  />
                </View>
              </TouchableWithoutFeedback>
            )}

            {getErrorGetWorkoutFreq && (
              <Text>{getErrorGetWorkoutFreq}</Text>
            )}

            {!isLoading && !getTrackedWorkoutFreqData && !getTrackedWorkoutFreqData && (
              <Text style={[styles.title]}>No Tracked Workout Type Freq Data!</Text>
            )}

            {getTrackedWorkoutFreqData && getTrackedWorkoutFreqLabels && (
              <TouchableWithoutFeedback testID="workout_frequency_graph">
                <View style={{ marginBottom: 20, alignSelf: 'center' }}>
                  <Text style={[styles.title, { color }]}>Workout frequency</Text>
                  <BarChart
                    style={{ borderRadius: 25 }}
                    data={workoutNameFreq}
                    width={0.95 * screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    fromZero
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}
