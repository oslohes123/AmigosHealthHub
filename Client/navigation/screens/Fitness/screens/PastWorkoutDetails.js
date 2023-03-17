import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars'
import { AntDesign } from '@expo/vector-icons';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { useGetWorkoutHistoryByDate } from '../hooks/trackedWorkouts/useGetWorkoutHistoryByDate';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { uuid } from 'uuidv4';
export default function PastWorkoutDetails({navigation}) {
  const isFocused = useIsFocused();
   const {isLoading, error, getWorkoutHistoryByDate}= useGetWorkoutHistoryByDate()
  const screenWidth = Dimensions.get("window").width;
  const [getArrayOfWorkoutNames, setArrayOfWorkoutNames] = useState(null);
  const [getExerciseData, setExerciseData] = useState(null);
  const [getExerciseLabels, setExerciseLabels] = useState(null);
  const[selectDay, setSelectDay] = useState(null);

  const [viewCalendar, setViewCalendar] = useState(false);

  useEffect(() => {
    
    const setWorkoutData = async() => {
      setExerciseData(null);
      setExerciseLabels(null);
      setArrayOfWorkoutNames(null);
      const result = await getWorkoutHistoryByDate(selectDay);
      if(result){
       const {arrayOfWorkoutNames, graphLabels, graphData} = result;

      if(JSON.stringify(graphLabels)===JSON.stringify([]) ||JSON.stringify(graphData)===JSON.stringify([])|| JSON.stringify(arrayOfWorkoutNames)===JSON.stringify([])){
        setArrayOfWorkoutNames(null);
        setExerciseData(null);
        setExerciseLabels(null);
      }
      else{
        setArrayOfWorkoutNames(arrayOfWorkoutNames);
        setExerciseData(graphData);
        setExerciseLabels(graphLabels);
      }
       
     
      }
    }
    setWorkoutData();
    console.log(`getExerciseData: ${JSON.stringify(getExerciseData)}`);
    console.log(`getExerciseLabels: ${JSON.stringify(getExerciseLabels)}`);
  }, [selectDay])


  const currentDate = new Date();

  const markedDate = {
    [currentDate.toISOString().split('T')[0]]: {
      selected: true,
      marked: true,
      dotColor: 'red'
    }
  };

  const toggleCalendar = () => {
    setViewCalendar(!viewCalendar);
  }

  const handleDayPress = (day) => {
    setSelectDay(day.dateString);
    console.log('selected day', day);
    setViewCalendar(false);
  }

  const exerciseData = {
    labels: getExerciseLabels,
    datasets: [
      {
        data: getExerciseData
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
      <View style={styles.primary}>
        {!selectDay && (
          <Text style={styles.text}>Select a day from the Calendar to View Workout History</Text>
        )}
        {selectDay && (
          <Text style={styles.text}>Date: {selectDay}</Text>
        )}
        <TouchableOpacity style={styles.icon} onPress={toggleCalendar}>
          <AntDesign name="calendar" size={35} color="white" />
        </TouchableOpacity>
      </View>
      {selectDay && !viewCalendar  &&  (


          <TouchableOpacity style={{alignSelf: 'center'}}>


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


              {/* {Unique Key prop problem here!!!!!} */}
              {/* {
                getArrayOfWorkoutNames &&(
                  getArrayOfWorkoutNames.map((exercise) => (<Text key={uuid()}>{exercise}</Text>)
                ))
              } */}

              {
                getArrayOfWorkoutNames &&(
                <Text>{JSON.stringify(getArrayOfWorkoutNames)}</Text>
                )
              }

              {
                !getExerciseData && !getExerciseLabels &&!getArrayOfWorkoutNames &&(
                  <Text>No workouts to show!</Text>
                )
              }
            {getExerciseData && getExerciseLabels&& (
            <BarChart
              style={{borderRadius: 25}}
              data={exerciseData}
              width={0.8 * screenWidth}
              height={270}
              fromZero = {true}
              // yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />)}
          </TouchableOpacity>
        )}
      {viewCalendar && (
        <Calendar
          style={styles.calendar}
          onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
          onDayPress={handleDayPress}
          maxDate={new Date().toISOString().split('T')[0]}
          markedDates={markedDate}
        />
    )}
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
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '15%',
    marginVertical: '5%',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white'
  },
  calendar: {
    width: '90%',
    alignSelf: 'center',
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    //backgroundColor: 'black'
  },
  // pieWidget: {
  //   backgroundColor: '#3eda9b',
  //   borderRadius: 25,
  //   alignSelf: 'center',
  //   padding: 5
  // },
  workoutText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    //backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    marginVertical: '5%'
  },
})

