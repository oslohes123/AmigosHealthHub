import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import themeContext from "../../../theme/themeContext";
import { ActivityIndicator, IconButton } from "react-native-paper";
import useDeleteWorkoutPlan from "../hooks/workoutPlans/useDeleteWorkoutPlan";
import { FAB, Snackbar } from "react-native-paper";

import useGetWorkoutDetails from "../hooks/workoutPlans/useGetWorkoutDetails";
import useTrackWorkout from "../hooks/trackedWorkouts/useTrackWorkout";

export default function WorkoutPlanInfoScreen({ route, navigation }) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const theme = useContext(themeContext);
  const [instructionModalData, setInstructionModalData] = useState(
    "No Instructions Available"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [warmUpSet, setWarmUpSet] = useState(false)

  const [workoutDetails, setWorkoutDetails] = useState([]);
  const { getWorkoutDetails, isLoading, error } = useGetWorkoutDetails();
  const { trackWorkout, message } = useTrackWorkout();
  const { deleteWorkoutPlan } = useDeleteWorkoutPlan();

  const [dataToTrack, setDataToTrack] = useState({});
  const [repsInArray, setRepsInArray] = useState({});
  const [weightInArray, setWeightInArray] = useState({});
  
  const [repsPEID, setRepsPEID] = useState(null);
  const [repsToAdd, setRepsToAdd] = useState(null);
  const [repsIndex, setRepsIndex] = useState(null);

  const [weightPEID, setWeightPEID] = useState(null);
  const [weightToAdd, setWeightToAdd] = useState(null);
  const [weightIndex, setWeightIndex] = useState(null);

  const workoutName = route.params;

  useEffect(() => {
    async function fetchWorkoutDetails(item) {
      const data = await getWorkoutDetails(item);
      console.log(`workout data: ${JSON.stringify(data)}`);
      setWorkoutDetails(data);
    }
    console.log(`Route Params: ${JSON.stringify(route.params)}`);
    fetchWorkoutDetails(workoutName);
  }, []);

  function setsToArray(sets) {
    let newArray = [];
    for (let i=0; i<sets; i++) {
        newArray.push(1);
    }
    return newArray;
  }

  function addWeightToArray(itemPEID, item, index) {
    console.log(`weightInArray: ${JSON.stringify(weightInArray)}`)
    if (weightInArray[itemPEID] === undefined) {
      let newArray = new Array(index + 1).fill(0);
      newArray[index] = Number(item);
      setWeightInArray({...weightInArray, [itemPEID]: newArray})
    } else if (weightInArray[itemPEID][index] === undefined || weightInArray[itemPEID][index] === null) {
      let copyArray = weightInArray[itemPEID];
      let newArray = new Array(index + 1);
      typeof copyArray === 'object' && copyArray.map((x, i) => {
          newArray[i] = x
        })
        newArray[index] = Number(item);
        setWeightInArray({...weightInArray, [itemPEID]: newArray})
    } else if (index === (weightInArray[itemPEID]).length - 1 && item === '') {
      let newArray = weightInArray[itemPEID].slice(0, index)
      setWeightInArray({...weightInArray, [itemPEID]: newArray})
    } else {
      let newArray = weightInArray[itemPEID]
      newArray[index] = Number(item)
      setWeightInArray({...weightInArray, [itemPEID]: newArray})
    }
  }

  function addRepsToArray(itemPEID, item, index) {
    console.log(`weightInArray: ${JSON.stringify(repsInArray)}`)
    if (repsInArray[itemPEID] === undefined) {
      let newArray = new Array(index + 1).fill(0);
      newArray[index] = Number(item);
      setRepsInArray({...repsInArray, [itemPEID]: newArray})
    } else if (repsInArray[itemPEID][index] === undefined || repsInArray[itemPEID][index] === null) {
      let copyArray = repsInArray[itemPEID];
      let newArray = new Array(index + 1);
      typeof copyArray === 'object' && copyArray.map((x, i) => {
          newArray[i] = x
        })
        newArray[index] = Number(item);
        setRepsInArray({...repsInArray, [itemPEID]: newArray})
    } else if (index === (repsInArray[itemPEID]).length - 1 && item === '') {
      let newArray = repsInArray[itemPEID].slice(0, index)
      setRepsInArray({...repsInArray, [itemPEID]: newArray})
    } else {
      let newArray = repsInArray[itemPEID]
      newArray[index] = Number(item)
      setRepsInArray({...repsInArray, [itemPEID]: newArray})
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        maxHeight: screenHeight,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: theme.background,
      }}
    >
      {/*Exercise Instruction Modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={[modalStyle.modalMain, { backgroundColor: theme.secondary, width: screenWidth * 0.9 }]}
          >
            <Text style={[modalStyle.modalText, { color: theme.color }]}>
              Instructions
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                borderWidth: 2,
                borderRadius: 26,
                padding: 10,
                margin: 20,
                width: screenWidth * 0.8,
                borderColor: theme.color,
              }}
            >
                <ScrollView style={{ maxHeight: screenHeight * 0.5 }}>
                    <Text style={{ color: theme.color }}>{instructionModalData}</Text>
                </ScrollView>
            </View>

            <FAB
              icon="close"
              style={styles.fab}
              // label="Create Plan"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <Text style={[styles.text, { color: theme.color }]}>{workoutName}</Text>

      {console.log(`Workout Details: ${workoutDetails}`)}

      <ScrollView
        alignContent={"center"}
        borderColor={theme.color}
        borderRadius={26}
        borderWidth={2}
        justifyContent={isLoading ? 'center' : 'flex-start'}
        showsVerticalScrollIndicator={false}
        alignItems="center"
        style={{ margin: 10, width: screenWidth * 0.9 }}
      >

        {isLoading && 
            <ActivityIndicator
            animating={true}
            size={50}
            color={'#c2e7fe'}
          />
        }

        {!isLoading && workoutDetails.map((item) => (
          <TouchableWithoutFeedback style={{ padding: 40 }} key={`${Math.random()}`}>
            <View
              style={[styles.exerciseSection, { borderColor: theme.color }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: theme.color,
                    fontSize: 20,
                    padding: 5,
                    width: screenWidth * 0.6,
                  }}
                >
                  {item.exercise.name}
                </Text>
                <IconButton
                  icon="information"
                  iconColor={theme.theme === 'light' ? '#000087' : theme.color}
                  size={20}
                  key={`${item.exercise.name}Instructions`}
                  onPress={() => {
                    console.log(`instructions: ${item.exercise.instructions}`);
                    setInstructionModalData(item.exercise.instructions);
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <View style={{ justifyContent: "space-evenly", padding: 5 }}>
                <Text style={{ color: theme.color, fontSize: 10 }}>Muscle</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: theme.color,
                    fontSize: 16,
                  }}
                >
                  {item.exercise.muscle}
                </Text>
              </View>
              <View style={{ justifyContent: "space-evenly", padding: 5 }}>
                <Text style={{ color: theme.color, fontSize: 10 }}>
                  Equipment
                </Text>
                {console.log(`item equipment: ${item.exercise.equipment}`)}
                <Text
                  style={{
                    fontWeight: "bold",
                    color: theme.color,
                    fontSize: 16,
                  }}
                >
                  {item.exercise.equipment ||
                  item.exercise.equipment == "body_only"
                    ? "n/a"
                    : item.exercise.equipment}
                </Text>
              </View>

              {(!Object.keys(dataToTrack).includes(item.PEID)) && setDataToTrack({...dataToTrack, [item.PEID] : {
                name: item.exercise.name,
                sets: null,
                reps: null,
                weight: null,
                distance: null,
                mins: null,
                secs: null,
                warmUpSet: false,
                calories: 0, 
              } })}

              <View style={styles.statsRows}>
                    <Text
                    style={[
                        styles.statsText,
                        { color: theme.color, alignSelf: "center" },
                    ]}
                    >
                    Calories: {item.calories} kcal
                    </Text>
                    <TextInput
                        style={[styles.textInput, { borderColor: theme.color }]}
                        placeholder="Calories (kcal)"
                        color={theme.color}
                        placeholderTextColor={theme.color}
                        keyboardType={"numeric"}
                        textAlign={"center"}
                        value={dataToTrack[item.PEID] ? dataToTrack[item.PEID].calories : 0}
                        onChangeText={(caloriesText) => {
                            setDataToTrack({...dataToTrack, [item.PEID]: {...dataToTrack[item.PEID], calories: caloriesText}})
                            console.log(`when cals Set: ${JSON.stringify(dataToTrack)}`)
                    }}
                    />
                </View>

              {item.exercise.type == "cardio" ? (
                <>
                  <View style={styles.statsRows}>
                    {console.log(`distance: ${item.distance}`)}
                    <Text
                      style={[
                        styles.statsText,
                        { color: theme.color, alignSelf: "center" },
                      ]}
                    >
                      Distance: {item.distance} m
                    </Text>
                    <TextInput
                        style={[styles.textInput, { borderColor: theme.color }]}
                        placeholder="Distance (m)"
                        color={theme.color}
                        placeholderTextColor={theme.color}
                        keyboardType={"numeric"}
                        textAlign={"center"}
                        value={dataToTrack[item.PEID] ? dataToTrack[item.PEID].distance : 0}
                        onChangeText={(distanceText) => {
                            setDataToTrack({...dataToTrack, [item.PEID]: {...dataToTrack[item.PEID], distance: distanceText}})
                            console.log(`when cals Set: ${JSON.stringify(dataToTrack)}`)
                    }}
                    />
                  </View>
                  <View style={styles.statsRows}>
                    <Text
                      style={[
                        styles.statsText,
                        { color: theme.color, alignSelf: "center" },
                      ]}
                    >
                      Duration: {Math.trunc(Number(item.duration))}' {Math.trunc((Number(item.duration) - Math.trunc(Number(item.duration))) * 60)}''
                      {/* {console.log(`Number(duration).round(): ${Number(item.duration)}`)} */}
                    </Text>
                    <View style={{flexDirection: 'row', width: styles.textInput.width, justifyContent: 'space-between'}}>
                      <TextInput
                        style={[
                          styles.textInput,
                          { borderColor: theme.color, color: theme.color, width: styles.textInput.width/2.3},
                        ]}
                        placeholder="Mins"
                        placeholderTextColor={theme.color}
                        // onChangeText={setDurationMins}
                        // value={durationMins}
                        keyboardType={"numeric"}
                        textAlign={"center"}
                        value={dataToTrack[item.PEID] ? dataToTrack[item.PEID].mins : 0}
                        onChangeText={(minsText) => {
                            setDataToTrack({...dataToTrack, [item.PEID]: {...dataToTrack[item.PEID], mins: minsText}})
                            console.log(`when cals Set: ${JSON.stringify(dataToTrack)}`)
                    }}
                      />
                      <Text style={{color: theme.color, alignSelf: 'center'}}>:</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { borderColor: theme.color, color: theme.color, width: styles.textInput.width/2.3},
                        ]}
                        placeholder="Secs"
                        placeholderTextColor={theme.color}
                        // onChangeText={setDurationSecs}
                        // value={durationSecs}
                        keyboardType={"numeric"}
                        textAlign={"center"}
                        value={dataToTrack[item.PEID] ? dataToTrack[item.PEID].secs : 0}
                        onChangeText={(secsText) => {
                            setDataToTrack({...dataToTrack, [item.PEID]: {...dataToTrack[item.PEID], secs: secsText}})
                            console.log(`when cals Set: ${JSON.stringify(dataToTrack)}`)
                    }}
                      />
                    </View>
                  </View>
                </>
              ) : (
                <>

                  <View style={styles.statsRows}>
                    <Text
                    style={[
                        styles.statsText,
                        { color: theme.color, alignSelf: "center" },
                    ]}
                    >
                    Warm Up Set: {item.warmUpSet ? 'Yes' : 'No'}
                    </Text>

                    {/* <Checkbox
                      status={item.warmUpSet ? "checked" : "indeterminate"}
                      onPress={() => {
                        // setWarmUpSet(!warmUpSet);
                        setDataToTrack({...dataToTrack, [item.PEID]: {...dataToTrack[item.PEID], warmUpSet: !item.warmUpSet}})
                      }}
                    /> */}

                  </View>

                    <View style={{flexDirection: 'row', justifyContent: "space-evenly"}}>
                        <View>
                            <Text
                                style={[
                                styles.statsText,
                                { color: theme.color, alignSelf: "center", paddingVertical: 5 },
                                ]}
                            >
                                Reps: {item.reps}
                            </Text>

                            {setsToArray(item.sets).map((unusedParam, index) => (
                                <View style={[{justifyContent: 'space-evenly', paddingVertical: 5 }]} key={`${Math.random()}`}>
                                    <TextInput
                                        style={[styles.textInput, { borderColor: theme.color, width: styles.textInput.width * 0.9 }]}
                                        placeholder="Reps"
                                        color={theme.color}
                                        placeholderTextColor={theme.color}
                                        keyboardType={"numeric"}
                                        textAlign={"center"}
                                        value={repsInArray[item.PEID] && repsInArray[item.PEID][index] ? `${repsInArray[item.PEID][index]}` : index }
                                        onChangeText={(repsText) => {
                                            // console.log(`when cals Set: ${JSON.stringify(dataToTrack)}`)
                                            // console.log(`this is the index: ${index}`)
                                            // console.log(`this is the reps array: ${JSON.stringify(repsInArray)}`)
                                            addRepsToArray(item.PEID, repsText, index)
                                        }}
                                        />
                                </View>
                            ))}
                        </View>
                        <View>
                            <Text
                                style={[
                                styles.statsText,
                                { color: theme.color, alignSelf: "center", paddingVertical: 5 },
                                ]}
                            >
                                Weight: {item.weight} kg
                            </Text>
                            
                            {setsToArray(item.sets).map((unusedParam, index) => (
                                <View style={[{justifyContent: 'space-evenly', paddingVertical: 5 }]} key={`${Math.random()}`}>
                                    <TextInput
                                    render
                                        style={[styles.textInput, { borderColor: theme.color, width: styles.textInput.width * 0.9 }]}
                                        placeholder="Weight (kg)"
                                        color={theme.color}
                                        placeholderTextColor={theme.color}
                                        keyboardType={"numeric"}
                                        textAlign={"center"}
                                        value={weightInArray[item.PEID] && weightInArray[item.PEID][index] ? `${weightInArray[item.PEID][index]}` : index}
                                        onChangeText={(weightText) => {
                                          // setWeightPEID(item.PEID);
                                          // setWeightToAdd(weightText);
                                          // setWeightIndex(index);
                                          // console.log(`when cals Set: ${JSON.stringify(dataToTrack)}`);
                                          // console.log(`this is the index: ${index}`);
                                          // console.log(`this is the weight array: ${JSON.stringify(weightInArray)}`);
                                          addWeightToArray(item.PEID, weightText, index);
                                        }} 
                                        />
                                </View> 
                                ))}
                        </View>
                    </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <View style={styles.bottomButtons}>
        <FAB
          icon="delete"
          style={styles.fab}
          label="Delete Plan"
          onPress={() => {
            deleteWorkoutPlan(workoutName);
            navigation.pop();
          }}
        />
        <FAB
          icon="check"
          style={styles.fab}
          label="Track Plan"
          onPress={() => {

            //Sort out duration
            let copyDataToTrack = dataToTrack;
            let copyDataKeys = Object.keys(copyDataToTrack);

            copyDataKeys.forEach((key) => {

              if (key in repsInArray) {
                copyDataToTrack[key].reps = repsInArray[key]
              }
              if (key in weightInArray) {
                copyDataToTrack[key].weight = weightInArray[key]
              }

              if (copyDataToTrack[key].reps != null) {
                copyDataToTrack[key].sets = (copyDataToTrack[key].reps).length
              }

              if (copyDataToTrack[key].mins || copyDataToTrack[key].secs) {
                let mins = copyDataToTrack[key].mins
                let secs = copyDataToTrack[key].secs
                let duration = Number((Number(mins)+(Number(secs)/60)).toFixed(2))
                copyDataToTrack[key].duration = duration;
                copyDataToTrack[key].distance = Number(copyDataToTrack[key].distance)
                
              } else {
                copyDataToTrack[key].duration = null;
              }
              delete copyDataToTrack[key].mins;
              delete copyDataToTrack[key].secs;
              copyDataToTrack[key].calories = Number(copyDataToTrack[key].calories)
            })

            console.log(`this is the objects saved: ${JSON.stringify(dataToTrack)}`);
            console.log(`copyDataToTrack: ${JSON.stringify(copyDataToTrack)}`);
            
            let submittableState = Object.values(copyDataToTrack).map((obj) => {
              if (((obj.sets != null && obj.sets != '' && !isNaN(Number(obj.sets)) &&
              obj.reps != null && obj.reps != '' && obj.reps != [] && (obj.reps).length === obj.sets  &&
              obj.weight != null && obj.weight != '' && obj.weight != [] && (obj.weight).length === obj.sets) ||
              (obj.distance != null && obj.distance != '' && !isNaN(Number(obj.distance)) &&
              obj.duration != null & obj.duration != '' && !isNaN(Number(obj.duration)))) && obj.calories != null & obj.calories != '' && !isNaN(Number(obj.calories))) {
                return true;
              } else {
                return false;
              }
            })


            if (!submittableState.includes(false)){
              trackWorkout(workoutName, Object.values(copyDataToTrack));
              navigation.pop();
            }  else {
              setSnackbarVisible(true)
            }

            if (!message || message != "Successfully tracked a workout!") {
              setSnackbarVisible(true)
            }
          }}
        />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(!snackbarVisible)}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbarVisible(!snackbarVisible);
          },
        }}
      >
        Unable to track workout plan, ensure all fields are valid.
      </Snackbar>

    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    width: screenWidth * 0.35,
    height: screenHeight * 0.05,
    fontWeight: "bold",
  },
  exerciseSection: {
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderRadius: 26,
    padding: 10,
    marginVertical: 10,
    width: screenWidth * 0.8,
  },
  statsText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  statsRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  bottomButtons: {
    width: screenWidth * 0.9,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
  },
};

const modalStyle = {
  modalMain: {
    justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth * 0.8,
    borderRadius: 26,
    padding: 20,
    borderWidth: 3,
  },
  modalText: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    width: screenWidth * 0.15,
    height: screenHeight * 0.05,
    fontWeight: "bold",
  },
};
