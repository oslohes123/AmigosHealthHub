/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useContext } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, SafeAreaView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, MD2Colors, DataTable } from 'react-native-paper';
import useGetWorkoutHistoryByDate from '../hooks/trackedWorkouts/useGetWorkoutHistoryByDate';
import themeContext from '../../../theme/themeContext';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#203038',
    // backgroundColor: 'white',
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    color: 'white',
    alignSelf: 'center',
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '15%',
    marginVertical: '5%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
  },
  calendar: {
    width: '100%',
    alignSelf: 'center',
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
  },
  workoutText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  tableContainer: {
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius: 5,
    padding: 10,
    width: '85%',
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    marginTop: '5%',
    borderBottomWidth: 3,
  },
  data: {
    fontSize: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: '5%',
    alignSelf: 'center',
  },
});

export default function PastWorkoutDetails() {
  const theme = useContext(themeContext);

  // eslint-disable-next-line no-unused-vars
  const { isLoading, error, getWorkoutHistoryByDate } = useGetWorkoutHistoryByDate();
  const [getArrayOfWorkoutNamesAndIDs, setArrayOfWorkoutNamesAndIDs] = useState(null);
  const [getExerciseData, setExerciseData] = useState(null);
  const [getExerciseLabels, setExerciseLabels] = useState(null);
  const [selectDay, setSelectDay] = useState(null);

  const [viewCalendar, setViewCalendar] = useState(false);

  useEffect(() => {
    const setWorkoutData = async () => {
      setExerciseData(null);
      setExerciseLabels(null);
      setArrayOfWorkoutNamesAndIDs(null);
      const result = await getWorkoutHistoryByDate(selectDay);
      if (result) {
        const { arrayOfWorkoutNamesAndIDs, graphLabels, graphData } = result;

        if (JSON.stringify(graphLabels) === JSON.stringify([])
        || JSON.stringify(graphData) === JSON.stringify([])
        || JSON.stringify(arrayOfWorkoutNamesAndIDs) === JSON.stringify([])) {
          setArrayOfWorkoutNamesAndIDs(null);
          setExerciseData(null);
          setExerciseLabels(null);
        } else {
          setArrayOfWorkoutNamesAndIDs(arrayOfWorkoutNamesAndIDs);
          setExerciseData(graphData);
          setExerciseLabels(graphLabels);
        }
      }
    };
    setWorkoutData();
  }, [selectDay]);

  const currentDate = new Date();

  const markedDate = {
    [currentDate.toISOString().split('T')[0]]: {
      selected: true,
      marked: true,
      dotColor: 'red',
    },
  };

  const toggleCalendar = () => {
    setViewCalendar(!viewCalendar);
  };

  const handleDayPress = (day) => {
    setSelectDay(day.dateString);
    setViewCalendar(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.primary}>
        {!selectDay && (
          <Text style={[styles.text, { borderColor: theme.color }, { color: theme.color }]}>
            Select a date
          </Text>
        )}
        {selectDay && (
          <Text style={[styles.text, { borderColor: theme.color }, { color: theme.color }]}>
            Date:
            {' '}
            {selectDay}
          </Text>
        )}
        <TouchableOpacity style={styles.icon} onPress={toggleCalendar}>
          <AntDesign name="calendar" size={35} color={theme.color} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {selectDay && !viewCalendar && (
        <TouchableWithoutFeedback style={{ alignSelf: 'center', width: '100%' }}>
          <>
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

            {/* {Unique Key prop problem here!!!!!} */}
            {
              getArrayOfWorkoutNamesAndIDs && (

                <>
                  <Text style={[styles.infoText, { color: theme.color }]}>
                    Workouts performed on this day:
                  </Text>
                  {getArrayOfWorkoutNamesAndIDs.map((workout) => (
                    <Text
                      style={[styles.infoText, { color: theme.color }]}
                      key={workout.workoutID}
                    >
                      {workout.workoutname}
                    </Text>
                  ))}
                </>
              )
            }

            {
              !getExerciseData && !getExerciseLabels && !getArrayOfWorkoutNamesAndIDs && (
                <Text style={[styles.infoText, { color: theme.color }]}>
                  No workouts to show!
                </Text>
              )
            }

            {getExerciseData && getExerciseLabels && (
            <View style={[styles.tableContainer, { borderColor: theme.color }]}>
              <DataTable>
                <DataTable.Header style={{ borderBottomWidth: 3, borderBottomColor: 'red' }}>
                  <DataTable.Title>
                    <Text style={[styles.tableHeader, { color: theme.color }]}>Exercise Name</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric>
                    <Text style={[styles.tableHeader, { color: theme.color }]}>Frequency</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {getExerciseLabels.map((exercise) => (

                  <DataTable.Row style={styles.row} key={exercise}>
                    <DataTable.Cell style={[{ color: theme.color }, { borderColor: theme.color }]}>
                      <Text style={[styles.data, { color: theme.color }]}>{exercise}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell
                      numeric
                      style={[{ color: theme.color }, { borderColor: theme.color }]}
                    >
                      <Text
                        style={[styles.data, { color: theme.color }]}
                      >
                        {getExerciseData[getExerciseLabels.indexOf(exercise)]}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
            )}
          </>
        </TouchableWithoutFeedback>
        )}
      </ScrollView>

      {viewCalendar && (
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          maxDate={new Date().toISOString().split('T')[0]}
          markedDates={markedDate}
        />
      )}
    </SafeAreaView>
  );
}
