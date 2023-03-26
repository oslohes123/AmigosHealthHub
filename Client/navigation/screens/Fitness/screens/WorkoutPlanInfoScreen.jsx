/* eslint-disable no-unused-expressions */
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import {
  useState,
  useContext,
  useEffect,
  React,
} from 'react';
import {
  ActivityIndicator, IconButton, FAB, Snackbar,
} from 'react-native-paper';
import themeContext from '../../../theme/themeContext';
import useDeleteWorkoutPlan from '../hooks/workoutPlans/useDeleteWorkoutPlan';

import useGetWorkoutDetails from '../hooks/workoutPlans/useGetWorkoutDetails';
import useTrackWorkout from '../hooks/trackedWorkouts/useTrackWorkout';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = {
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    width: screenWidth * 0.35,
    height: screenHeight * 0.05,
    fontWeight: 'bold',
  },
  exerciseSection: {
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderRadius: 26,
    padding: 10,
    marginVertical: 10,
    width: screenWidth * 0.8,
  },
  statsText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  bottomButtons: {
    width: screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
  },
};

const modalStyle = {
  modalMain: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.8,
    borderRadius: 26,
    padding: 20,
    borderWidth: 3,
  },
  modalText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    width: screenWidth * 0.15,
    height: screenHeight * 0.05,
    fontWeight: 'bold',
  },
};

export default function WorkoutPlanInfoScreen({ route, navigation }) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const {
    theme,
    background,
    secondary,
    color,
  } = useContext(themeContext);
  const [instructionModalData, setInstructionModalData] = useState(
    'No Instructions Available',
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [workoutDetails, setWorkoutDetails] = useState([]);
  const { getWorkoutDetails, isLoading } = useGetWorkoutDetails();
  const { trackWorkout, message } = useTrackWorkout();
  const { deleteWorkoutPlan } = useDeleteWorkoutPlan();

  const [dataToTrack, setDataToTrack] = useState({});
  const [repsInArray, setRepsInArray] = useState({});
  const [weightInArray, setWeightInArray] = useState({});

  const workoutName = route.params;

  useEffect(() => {
    async function fetchWorkoutDetails(item) {
      const data = await getWorkoutDetails(item);
      setWorkoutDetails(data);
    }
    fetchWorkoutDetails(workoutName);
  }, []);

  function setsToArray(sets) {
    const newArray = [];
    for (let i = 0; i < sets; i += 1) {
      newArray.push(1);
    }
    return newArray;
  }

  function addWeightToArray(itemPEID, item, index) {
    if (weightInArray[itemPEID] === undefined) {
      const newArray = new Array(index + 1).fill(0);
      newArray[index] = Number(item);
      setWeightInArray({ ...weightInArray, [itemPEID]: newArray });
    } else if (weightInArray[itemPEID][index] === undefined
      || weightInArray[itemPEID][index] === null) {
      const copyArray = weightInArray[itemPEID];
      const newArray = new Array(index + 1);
      typeof copyArray === 'object'
      && copyArray.map(
        (x, i) => {
          newArray[i] = x;
        },
      );
      newArray[index] = Number(item);
      setWeightInArray({ ...weightInArray, [itemPEID]: newArray });
    } else if (index === (weightInArray[itemPEID]).length - 1 && item === '') {
      const newArray = weightInArray[itemPEID].slice(0, index);
      setWeightInArray({ ...weightInArray, [itemPEID]: newArray });
    } else {
      const newArray = weightInArray[itemPEID];
      newArray[index] = Number(item);
      setWeightInArray({ ...weightInArray, [itemPEID]: newArray });
    }
  }

  function addRepsToArray(itemPEID, item, index) {
    if (repsInArray[itemPEID] === undefined) {
      const newArray = new Array(index + 1).fill(0);
      newArray[index] = Number(item);
      setRepsInArray({ ...repsInArray, [itemPEID]: newArray });
    } else if (repsInArray[itemPEID][index] === undefined
      || repsInArray[itemPEID][index] === null) {
      const copyArray = repsInArray[itemPEID];
      const newArray = new Array(index + 1);
      typeof copyArray === 'object'
      && copyArray.map(
        (x, i) => {
          newArray[i] = x;
        },
      );
      newArray[index] = Number(item);
      setRepsInArray({ ...repsInArray, [itemPEID]: newArray });
    } else if (index === (repsInArray[itemPEID]).length - 1 && item === '') {
      const newArray = repsInArray[itemPEID].slice(0, index);
      setRepsInArray({ ...repsInArray, [itemPEID]: newArray });
    } else {
      const newArray = repsInArray[itemPEID];
      newArray[index] = Number(item);
      setRepsInArray({ ...repsInArray, [itemPEID]: newArray });
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        maxHeight: screenHeight,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: background,
      }}
    >
      {/* Exercise Instruction Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={[modalStyle.modalMain, { backgroundColor: secondary, width: screenWidth * 0.9 }]}
          >
            <Text style={[modalStyle.modalText, { color }]}>
              Instructions
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderWidth: 2,
                borderRadius: 26,
                padding: 10,
                margin: 20,
                width: screenWidth * 0.8,
                borderColor: color,
              }}
            >
              <ScrollView style={{ maxHeight: screenHeight * 0.5 }}>
                <Text style={{ color }}>{instructionModalData}</Text>
              </ScrollView>
            </View>

            <FAB
              icon="close"
              style={styles.fab}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <Text style={[styles.text, { color }]}>{workoutName}</Text>

      <ScrollView
        alignContent="center"
        borderColor={color}
        borderRadius={26}
        borderWidth={2}
        justifyContent={isLoading ? 'center' : 'flex-start'}
        showsVerticalScrollIndicator={false}
        alignItems="center"
        style={{ margin: 10, width: screenWidth * 0.9 }}
      >

        {isLoading
            && (
            <ActivityIndicator
              animating
              size={50}
              color="#c2e7fe"
            />
            )}

        {!isLoading && workoutDetails.map((item) => (
          <TouchableWithoutFeedback style={{ padding: 40 }} key={`${item.PEID}`}>
            <View
              style={[styles.exerciseSection, { borderColor: color }]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    color,
                    fontSize: 20,
                    padding: 5,
                    width: screenWidth * 0.6,
                  }}
                >
                  {item.exercise.name}
                </Text>
                <IconButton
                  icon="information"
                  iconColor={theme === 'light' ? '#000087' : color}
                  size={20}
                  key={`${item.exercise.name}Instructions`}
                  onPress={() => {
                    setInstructionModalData(item.exercise.instructions);
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <View style={{ justifyContent: 'space-evenly', padding: 5 }}>
                <Text style={{ color, fontSize: 10 }}>Muscle</Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color,
                    fontSize: 16,
                  }}
                >
                  {item.exercise.muscle}
                </Text>
              </View>
              <View style={{ justifyContent: 'space-evenly', padding: 5 }}>
                <Text style={{ color, fontSize: 10 }}>
                  Equipment
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color,
                    fontSize: 16,
                  }}
                >
                  {item.exercise.equipment
                  || item.exercise.equipment === 'body_only'
                    ? 'n/a'
                    : item.exercise.equipment}
                </Text>
              </View>

              {(!Object.keys(dataToTrack).includes(item.PEID)) && setDataToTrack({
                ...dataToTrack,
                [item.PEID]: {
                  name: item.exercise.name,
                  sets: null,
                  reps: null,
                  weight: null,
                  distance: null,
                  mins: null,
                  secs: null,
                  warmUpSet: false,
                  calories: 0,
                },
              })}

              <View style={styles.statsRows}>
                <Text
                  style={[
                    styles.statsText,
                    { color, alignSelf: 'center' },
                  ]}
                >
                  Calories:
                  {' '}
                  {item.calories}
                  {' '}
                  kcal
                </Text>
                <TextInput
                  style={[styles.textInput, { borderColor: color }]}
                  placeholder="Calories (kcal)"
                  color={color}
                  placeholderTextColor={color}
                  keyboardType="numeric"
                  textAlign="center"
                  value={dataToTrack[item.PEID] && dataToTrack[item.PEID].calories !== null && dataToTrack[item.PEID].calories !== undefined ? `${dataToTrack[item.PEID].calories}` : ``}
                  onChangeText={(caloriesText) => {
                    setDataToTrack(
                      {
                        ...dataToTrack,
                        [item.PEID]: { ...dataToTrack[item.PEID], calories: caloriesText },
                      },
                    );
                  }}
                />
              </View>
              <View style={styles.statsRows}>
                    <Text
                      style={[
                        styles.statsText,
                        { color, alignSelf: 'center' },
                      ]}
                    >
                      Duration:
                      {' '}
                      {Math.trunc(Number(item.duration))}
                      &apos;
                      {' '}
                      {Math.trunc((Number(item.duration) - Math.trunc(Number(item.duration))) * 60)}
                      &quot;
                    </Text>
                    <View style={{ flexDirection: 'row', width: styles.textInput.width, justifyContent: 'space-between' }}>
                      <TextInput
                        style={[
                          styles.textInput,
                          { borderColor: color, color, width: styles.textInput.width / 2.3 },
                        ]}
                        placeholder="Mins"
                        placeholderTextColor={color}
                        keyboardType="numeric"
                        textAlign="center"
                        value={dataToTrack[item.PEID] && dataToTrack[item.PEID].mins !== null && dataToTrack[item.PEID].mins !== undefined? `${dataToTrack[item.PEID].mins}` : `${0}`}
                        onChangeText={(minsText) => {
                          setDataToTrack(
                            {
                              ...dataToTrack,
                              [item.PEID]: { ...dataToTrack[item.PEID], mins: minsText },
                            },
                          );
                        }}
                      />
                      <Text style={{ color, alignSelf: 'center', fontWeight: 'bold' }}>:</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { borderColor: color, color, width: styles.textInput.width / 2.3 },
                        ]}
                        placeholder="Secs"
                        placeholderTextColor={color}
                        keyboardType="numeric"
                        textAlign="center"
                        value={dataToTrack[item.PEID] && dataToTrack[item.PEID].secs !== null && dataToTrack[item.PEID].secs !== undefined ? `${dataToTrack[item.PEID].secs}` : `${0}`}
                        onChangeText={(secsText) => {
                          setDataToTrack(
                            {
                              ...dataToTrack,
                              [item.PEID]: { ...dataToTrack[item.PEID], secs: secsText },
                            },
                          );
                        }}
                      />
                    </View>
                  </View>

              {item.exercise.type === 'cardio' ? (
                <>
                  <View style={styles.statsRows}>
                    <Text
                      style={[
                        styles.statsText,
                        { color, alignSelf: 'center' },
                      ]}
                    >
                      Distance:
                      {' '}
                      {item.distance}
                      {' '}
                      m
                    </Text>
                    <TextInput
                      style={[styles.textInput, { borderColor: color }]}
                      placeholder="Distance (m)"
                      color={color}
                      placeholderTextColor={color}
                      keyboardType="numeric"
                      textAlign="center"
                      value={dataToTrack[item.PEID] && dataToTrack[item.PEID].distance !== undefined && dataToTrack[item.PEID].distance !== null ? `${dataToTrack[item.PEID].distance}` : `${''}`}
                      onChangeText={(distanceText) => {
                        setDataToTrack(
                          {
                            ...dataToTrack,
                            [item.PEID]: { ...dataToTrack[item.PEID], distance: distanceText },
                          },
                        );
                      }}
                    />
                  </View>
                </>
              ) : (
                <>

                  <View style={styles.statsRows}>
                    <Text
                      style={[
                        styles.statsText,
                        { color, alignSelf: 'center' },
                      ]}
                    >
                      Warm Up Set:
                      {' '}
                      {item.warmUpSet ? 'Yes' : 'No'}
                    </Text>

                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View>
                      <Text
                        style={[
                          styles.statsText,
                          { color, alignSelf: 'center', paddingVertical: 5 },
                        ]}
                      >
                        Reps:
                        {' '}
                        {item.reps}
                      </Text>

                      {setsToArray(item.sets).map((unusedParam, index) => (
                        <View style={[{ justifyContent: 'space-evenly', paddingVertical: 5 }]} key={`${item.PEID}reps${index}`}>
                          <TextInput
                            style={[styles.textInput,
                              { borderColor: color, width: styles.textInput.width * 0.9 }]}
                            placeholder="Reps"
                            color={color}
                            placeholderTextColor={color}
                            keyboardType="numeric"
                            textAlign="center"
                            value={repsInArray[item.PEID] && repsInArray[item.PEID][index] != undefined && repsInArray[item.PEID][index] != undefined ? `${repsInArray[item.PEID][index]}` : `${''}`}
                            onChangeText={(repsText) => {
                              addRepsToArray(item.PEID, repsText, index);
                            }}
                          />
                        </View>
                      ))}
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.statsText,
                          { color, alignSelf: 'center', paddingVertical: 5 },
                        ]}
                      >
                        Weight:
                        {' '}
                        {item.weight}
                        {' '}
                        kg
                      </Text>

                      {setsToArray(item.sets).map((unusedParam, index) => (
                        <View style={[{ justifyContent: 'space-evenly', paddingVertical: 5 }]} key={`${item.PEID}weight${index}`}>
                          <TextInput
                            render
                            style={[styles.textInput,
                              { borderColor: color, width: styles.textInput.width * 0.9 }]}
                            placeholder="Weight (kg)"
                            color={color}
                            placeholderTextColor={color}
                            keyboardType="numeric"
                            textAlign="center"
                            value={weightInArray[item.PEID] && weightInArray[item.PEID][index] != undefined && weightInArray[item.PEID][index] != null ? `${weightInArray[item.PEID][index]}` : `${''}`}
                            onChangeText={(weightText) => {
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
            // Sort out duration
            const copyDataToTrack = dataToTrack;
            const copyDataKeys = Object.keys(copyDataToTrack);

            
            copyDataKeys.forEach((key) => {
              if (key in repsInArray) {
                copyDataToTrack[key].reps = repsInArray[key];
              }
              if (key in weightInArray) {
                copyDataToTrack[key].weight = weightInArray[key];
              }

              if (copyDataToTrack[key].reps != null) {
                copyDataToTrack[key].sets = (copyDataToTrack[key].reps).length;
              }
              console.log(copyDataToTrack[key].mins)
              console.log(copyDataToTrack[key].secs)

              if (copyDataToTrack[key].mins || copyDataToTrack[key].secs) {
                const { mins } = copyDataToTrack[key];
                const { secs } = copyDataToTrack[key];
                const duration = Number((Number(mins) + (Number(secs) / 60)).toFixed(2));
                copyDataToTrack[key].duration = duration;
                copyDataToTrack[key].distance = Number(copyDataToTrack[key].distance);
              } else {
                copyDataToTrack[key].duration = null;
              }
              delete copyDataToTrack[key].mins;
              delete copyDataToTrack[key].secs;
              copyDataToTrack[key].calories = Number(copyDataToTrack[key].calories);
            });

            const submittableState = Object.values(copyDataToTrack).map((obj) => {
              
              console.log(obj.duration)
              // if (((obj.sets != null && obj.sets !== '' && !Number.isNaN(Number(obj.sets))
              // && obj.reps != null && obj.reps !== '' && obj.reps !== [] && (obj.reps).length === obj.sets
              // && obj.weight != null && obj.weight !== '' && obj.weight !== [] && (obj.weight).length === obj.sets)
              // || (obj.distance != null && obj.distance !== '' && !Number.isNaN(Number(obj.distance))
              // && obj.duration != null && obj.duration !== '' && !Number.isNaN(Number(obj.duration))))
              // && !Number.isNaN(Number(obj.calories))) {

              if ((!Number.isNaN(Number(obj.duration)) || !Number.isNaN(Number(obj.distance)))
              || ((obj.sets != null && obj.sets !== '' && !Number.isNaN(Number(obj.sets)) && obj.reps != null && obj.reps !== '' && obj.reps !== [] && !Number.isNaN(Number(obj.reps))) 
              || (obj.distance != null && obj.distance !== '' && !Number.isNaN(Number(obj.distance))))) {
                return true;
              }
              return false;
            });

            if (!submittableState.includes(false)) {
              trackWorkout(workoutName, Object.values(copyDataToTrack));
              navigation.pop();
            } else {
              setSnackbarVisible(true);
            }

            if (!message || message !== 'Successfully tracked a workout!') {
              setSnackbarVisible(true);
            }
          }}
        />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(!snackbarVisible)}
        action={{
          label: 'Close',
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
