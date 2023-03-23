import {
  View, StyleSheet, Text, TouchableOpacity, Modal, TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useIsFocused } from '@react-navigation/native';
import { FAB, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import useGetExerciseHistory from '../hooks/exercise/useGetExerciseHistory';
import useGetAllExercises from '../hooks/exercise/useGetAllExercises';
import themeContext from '../../../theme/themeContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: screenWidth,
  },
  dropDownContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    width: screenWidth * 0.5,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalButton: {
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.5,
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
});

export default function Graph({ navigation }) {
  const { background, color } = useContext(themeContext);

  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);
  const [getArrayOfExercises, setArrayOfExercises] = useState([]);
  const [getWeightedLabels, setWeightedLabels] = useState(null);
  const [getWeightedData, setWeightedData] = useState(null);

  const [getDurationLabels, setDurationLabels] = useState(null);
  const [getDurationData, setDurationData] = useState(null);
  const [getDistanceLabels, setDistanceLabels] = useState(null);
  const [getDistanceData, setDistanceData] = useState(null);

  const [getCaloriesLabels, setCaloriesLabels] = useState(null);
  const [getCaloriesData, setCaloriesData] = useState(null);

  const { getAllExercises, error } = useGetAllExercises();
  const { getExerciseHistory, isLoading, errorExerciseHistory } = useGetExerciseHistory();
  const isFocused = useIsFocused();

  const weightedData = {
    labels: getWeightedLabels,
    datasets: [
      {
        data: getWeightedData,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const durationData = {
    labels: getDurationLabels,
    datasets: [
      {
        data: getDurationData,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    // legend: ["Duration"],
  };

  const caloriesData = {
    labels: getCaloriesLabels,
    datasets: [
      {
        data: getCaloriesData,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    // legend: ["Calories"],
  };
  const distanceData = {
    labels: getDistanceLabels,
    datasets: [
      {
        data: getDistanceData,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    // legend: ["Distance"],
  };
  const setAllExercises = async () => {
    setArrayOfExercises(await getAllExercises());
  };

  useEffect(() => {
    if (isFocused) {
      setAllExercises();
    }
  }, [navigation, isFocused]);

  useEffect(() => {
    const setDataAndLabels = async () => {
      setDurationData(null);
      setWeightedData(null);
      setDistanceData(null);
      setCaloriesData(null);

      const result = await getExerciseHistory(selected);
      if (result) {
        // Look into have one state that manages labels as they all have the same labels
        const { labels, type, data } = result;

        if (type === 'muscle/strength') {
          if (data.arrayOfWeightPulled.indexOf(null) === -1) {
            setWeightedData(data.arrayOfWeightPulled);
            setWeightedLabels(labels);
          } else {
            setWeightedData(null);
            setWeightedLabels(null);
          }
        } else if (type === 'Other') {
          if (data.arrayOfDuration.indexOf(null) === -1) {
            setDurationData(data.arrayOfDuration);
            setDurationLabels(labels);
          }

          if (data.arrayOfDistance.indexOf(null) === -1) {
            setDistanceData(data.arrayOfDistance);
            setDistanceLabels(labels);
          }

          if (data.arrayOfCalories.indexOf(null) === -1) {
            setCaloriesData(data.arrayOfCalories);
            setCaloriesLabels(labels);
          }
        }
      }
    };
    setDataAndLabels();
  }, [selected]);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#0040ff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.modalContainer}>
        <View>

          <FAB
            style={{ width: screenWidth * 0.6 }}
            label={selected || 'Select an exercise'}
            onPress={() => {
              setVisible(true);
            }}
          />

          <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => setVisible(false)}
          >
            <View style={styles.modal}>
              {!getArrayOfExercises && (
                <Text style={{ color }}>No exercise data</Text>
              )}
              <ScrollView style={{ maxHeight: screenHeight * 0.2 }}>
                {getArrayOfExercises
                  && getArrayOfExercises.map((exercise) => (
                    <TouchableOpacity
                      style={styles.modalButton}
                      key={exercise}
                      onPress={() => {
                        setSelected(exercise);
                        setVisible(false);
                      }}
                    >
                      <Text>{exercise}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>

              <FAB
                icon="close"
                style={{ margin: 10 }}
                onPress={() => {
                  setVisible(!visible);
                }}
              />
            </View>
          </Modal>
        </View>
      </View>

      {isLoading && (
        <>
          {/* <Text>Refreshing.....</Text> */}
          <ActivityIndicator
            animating
            size={50}
            color={MD2Colors.lightBlue400}
          />
        </>
      )}
      <View style={{ alignItems: 'center' }}>
        {/* This is the WeightedGraph */}

        {getWeightedData && getWeightedLabels && (
          <TouchableWithoutFeedback>
            <View style={{ marginBottom: 40 }}>
              <Text style={[styles.title, { color }]}>Weight pulled per exercise</Text>
              <LineChart
                style={{ borderRadius: 15 }}
                data={weightedData}
                width={screenWidth * 0.9}
                height={280}
                yAxisSuffix=" kg"
                chartConfig={chartConfig}
                bezier
                fromZero
                verticalLabelRotation={50}
                xLabelsOffset={-25}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
        {errorExerciseHistory && <Text style={{ color }}>{errorExerciseHistory}</Text>}
        {/* This is the duration graph for an Other exercise */}
        {getDurationData && getDurationLabels && (
          <TouchableWithoutFeedback>
            <View style={{ marginBottom: 40 }}>
              <Text style={[styles.title, { color }]}>Duration</Text>
              <LineChart
                style={{ borderRadius: 25 }}
                data={durationData}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={chartConfig}
                fromZero
                bezier
                yAxisSuffix=" min"
                verticalLabelRotation={50}
                xLabelsOffset={-25}
              />
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* This is the distance graph for an Other exercise */}
        {getDistanceData && getDistanceLabels && (
          <TouchableWithoutFeedback>
            <View style={{ marginBottom: 40 }}>
              <Text style={[styles.title, { color }]}>Distance</Text>
              <LineChart
                style={{ borderRadius: 25 }}
                data={distanceData}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={chartConfig}
                fromZero
                bezier
                yAxisSuffix=" m"
                verticalLabelRotation={50}
                xLabelsOffset={-25}
              />
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* This is the calories graph for an Other exercise */}
        {getCaloriesData && getCaloriesLabels && (
          <TouchableWithoutFeedback>
            <View style={{ marginBottom: 40 }}>
              <Text style={[styles.title, { color }]}>Calories</Text>
              <LineChart
                style={{ borderRadius: 25 }}
                data={caloriesData}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={chartConfig}
                fromZero
                bezier
                yAxisSuffix=" kcal"
                verticalLabelRotation={50}
                xLabelsOffset={-25}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </ScrollView>
  );
}
