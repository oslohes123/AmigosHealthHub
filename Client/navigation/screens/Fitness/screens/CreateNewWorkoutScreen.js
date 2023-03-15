import { StatusBar } from "expo-status-bar";

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Keyboard,
  TextInput,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import themeContext from "../../../theme/themeContext";
import { FAB, Snackbar } from 'react-native-paper';
import { useSearchExercise } from "../hooks/exercise/useSearchExercise";
import { useAddWorkout } from "../hooks/workoutPlans/useAddWorkout";

export default function CreateNewWorkoutScreen({ navigation , route }) {
    const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const theme = useContext(themeContext);
    const [text, setText] = useState("");
    const [results, setResults] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [workoutName, setWorkoutName] = useState('');

  const [modalName, setModalName] = useState("");
  const [modalDistance, setModalDistance] = useState(0);
  const [modalDuration, setModalDuration] = useState(0);
  const [modalSets, setModalSets] = useState(0);
  const [modalReps, setModalReps] = useState(0);
  const [modalWeight, setModalWeight] = useState(0);
  const [modalWarmUpSet, setModalWarmUpSet] = useState(false);
  const [modalCalories, setModalCalories] = useState(0);
  const [modalType, setModalType] = useState("");

    const { searchExercise } = useSearchExercise();
    const { addWorkout, isLoading, message } = useAddWorkout();

    useEffect(() => {
        if (route.params && route.params != selectedExercises) { 
            console.log(`route.params: ${JSON.stringify(route.params)}`)
            setSelectedExercises(route.params)
            console.log(`if exc`) 
        } 
        else { 
            setSelectedExercises([]) 
            console.log(`else exc`)
        }
        console.log(`selected exercises after: ${JSON.stringify(selectedExercises)}`)
    }, [route.params])

    useEffect(() => {
        async function fetchData() {
        const data = await searchExercise(text);
        console.log(`data: ${JSON.stringify(data)}`);
        let resultsList = [];


        data.map((item) => {
            resultsList.push(item);
        });
        setResults(resultsList);
        }
        if (text.length > 2) {
        fetchData();
        } else if (text.length < 3) {
        setResults([]);
        }
    }, [text]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            
            {/*Exercise Info Modal*/}
            <Modal animationType="slide" transparent={true} visible={exerciseModalVisible} onRequestClose={() => {setExerciseModalVisible(!exerciseModalVisible)}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={[modalStyle.modalMain, { backgroundColor: theme.secondary }]}>
                            <Text style={[modalStyle.modalText, { color: theme.color }]}>
                                {modalName} Information
                            </Text>

                            <View style={{justifyContent: "space-evenly", borderWidth: 2, borderRadius: 26, padding: 10, margin: 20, width: screenWidth * 0.7, borderColor: theme.color}}>
                                <View style={{flexDirection: 'row', justifyContent: "space-evenly",}}>
                                    {modalType != 'cardio' ?
                                    <>
                                        <View>
                                            <Text style={{color: theme.color, fontSize: 12, textAlign: "center"}}>Sets</Text>
                                            <Text style={{fontWeight: "bold", color: theme.color, fontSize: 16, textAlign: "center"}}>{modalSets}</Text>
                                            <Text style={{color: theme.color, fontSize: 12, textAlign: "center"}}>Reps</Text>
                                            <Text style={{fontWeight: "bold", color: theme.color, fontSize: 16, textAlign: "center"}}>{modalReps}</Text>
                                        </View>
                                        <View>
                                            <Text style={{color: theme.color, fontSize: 12, textAlign: "center"}}>Weight</Text>
                                            <Text style={{fontWeight: "bold", color: theme.color, fontSize: 16, textAlign: "center"}}>{modalWeight} kg</Text>
                                            <Text style={{color: theme.color, fontSize: 12, textAlign: "center"}}>Warm Up Set</Text>
                                            <Text style={{fontWeight: "bold", color: theme.color, fontSize: 16, textAlign: "center"}}>{modalWarmUpSet ? 'Yes' : 'No'}</Text>
                                        </View>
                                    </>
                                    :
                                    <>
                                        <View>
                                            <View>
                                                <Text style={{color: theme.color, fontSize: 12, textAlign: "center"}}>Distance</Text>
                                                <Text style={{fontWeight: "bold", color: theme.color, fontSize: 16, textAlign: "center"}}>{modalDistance} km</Text>
                                            </View>
                                            <View>
                                                <Text style={{color: theme.color, fontSize: 12, textAlign: "center"}}>Duration</Text>
                                                <Text style={{fontWeight: "bold", color: theme.color, fontSize: 16, textAlign: "center"}}>{modalDuration} mins</Text>
                                            </View>
                                        </View>
                                    </>
                                    }
                                </View>

                                <Text style={{color: theme.color, fontSize: 12, textAlign: "center"}}>Calories</Text>
                                        <Text style={{fontWeight: "bold", color: theme.color, fontSize: 16, textAlign: "center"}}>{modalCalories} kcal</Text>
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                <FAB        
                                    icon="close"
                                    style={styles.fab}
                                    onPress={() => {
                                        setExerciseModalVisible(!exerciseModalVisible)
                                        console.log("Dismiss Info")}}
                                />
                                <FAB        
                                    icon="delete"
                                    style={styles.fab}
                                    onPress={() => {
                                        setExerciseModalVisible(!exerciseModalVisible)
                                        //Remove from workout
                                        console.log("Remove from workout")}}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>

            {/*Workout Name Modal*/}
            <Modal animationType="slide" transparent={true}  visible={nameModalVisible} onRequestClose={() => {setExerciseModalVisible(!exerciseModalVisible)}}>
                <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={[modalStyle.modalMain, { backgroundColor: theme.secondary }]}>
                        <Text style={[modalStyle.modalText, { color: theme.color }]}>Save Workout</Text>

                        <TextInput
                            style={{color: theme.color, width: screenWidth * 0.6, borderColor: theme.color, margin: 10}}
                            placeholder={"Workout Name"}
                            textAlign={"center"}
                            onChangeText={(value) => {setWorkoutName(value)}}
                            value={workoutName}
                            placeholderTextColor={theme.color}
                            clearButtonMode={"always"}
                            borderColor={theme.color}
                            borderWidth={1}
                            borderRadius={10}
                        />

                        <View style={{ flexDirection: "row" }}>
                            <FAB        
                                icon="close"
                                style={styles.fab}
                                onPress={() => {
                                    setNameModalVisible(!nameModalVisible)
                                    console.log("Don't Save Yet")}}
                            />
                            <FAB        
                                icon="check"
                                style={styles.fab}
                                onPress={async () => {
                                        // console.log(`selected exercises: ${JSON.stringify(selectedExercises)}`)
                                        // console.log(`workout name: ${workoutName}`)
                                        if (workoutName.length > 1 && selectedExercises.length > 0) {
                                            await addWorkout(workoutName, selectedExercises);

                                            console.log(`this is the mssg: ${message}`)
                                            if (message === "Workout Plan created!") {
                                                setNameModalVisible(false);
                                                navigation.pop();
                                            }
                                        } else {
                                            setSnackbarVisible(true)
                                        }
                                        if (selectedExercises.length < 1) {
                                            setNameModalVisible(!nameModalVisible)
                                        }
                                    }
                                }
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>

            <View style={styles.searchAndSave}>
                <TextInput
                    clearButtonMode="always"
                    value={text}
                    onChangeText={(value) => setText(value)}
                    style={[styles.search_bar, {borderColor: theme.color, color: theme.color, width: screenWidth * 0.7}]}
                    textAlign={'center'}
                    placeholder="Search Exercises"
                    placeholderTextColor={theme.color}
                />

                <FAB        
                    icon="check"
                    style={styles.fab}
                    onPress={() => {
                        setNameModalVisible(!nameModalVisible)
                        console.log("Save Workout Plan")}}
                />
            </View>

            <Text style={[styles.customWorkout, { color: theme.color }]}>Exercises</Text>

            <ScrollView style={[styles.verticalScroll, {borderColor: theme.color}]} bounces={false}>
                {results.map((item) => (
                    <TouchableOpacity onPress={() => {
                        console.log(`exercises selected: ${selectedExercises}`)
                        navigation.navigate("Exercise Information", {item, selectedExercises})
                    }} key={item}>
                        <Text style={[styles.resultsText, { borderColor: theme.color, color: theme.color }]} key={item}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedExercises.length > 0 && 
                <ScrollView style={[styles.horizontalScroll, { borderColor: theme.color }]} horizontal={true} alignItems={"center"} showsHorizontalScrollIndicator={false}>
                    {selectedExercises.map((item) => (
                        <TouchableOpacity key={`${item.name} Selected`} onPress={() => {
                            setModalCalories(item.calories)
                            setModalDistance(item.distance)
                            setModalDuration(item.duration)
                            setModalName(item.name)
                            setModalReps(item.reps)
                            setModalSets(item.sets)
                            setModalWarmUpSet(item.warmUpSet)
                            setModalWeight(item.weight)
                            setExerciseModalVisible(!exerciseModalVisible)
                            setModalType(item.type)}}>
                            <Text style={[styles.addedText, { borderColor: theme.color, color: theme.color }]}>{item.name}</Text>
                        </TouchableOpacity>

                    ))}
                </ScrollView>
            }

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(!snackbarVisible)}
                action={{
                    label: 'Close',
                    onPress: () => {
                        setSnackbarVisible(!snackbarVisible)
                    },
                }}
                >
                Could not save workout plan. Make sure at least 1 exercise has been selected and you have given the plan a name.
            </Snackbar>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
  }, [route.params]);

  useEffect(() => {
    async function fetchData() {
      const data = await searchExercise(text);
      console.log(`data: ${JSON.stringify(data)}`);
      let resultsList = [];

      data.map((item) => {
        resultsList.push(item);
      });
      setResults(resultsList);
    }
    if (text.length > 2) {
      fetchData();
    } else if (text.length < 3) {
      setResults([]);
    }
  }, [text]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/*Exercise Info Modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={exerciseModalVisible}
        onRequestClose={() => {
          setExerciseModalVisible(!exerciseModalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={[
                modalStyle.modalMain,
                { backgroundColor: theme.secondary },
              ]}
            >
              <Text style={[modalStyle.modalText, { color: theme.color }]}>
                {modalName} Information
              </Text>

              <View
                style={{
                  justifyContent: "space-evenly",
                  borderWidth: 2,
                  borderRadius: 26,
                  padding: 10,
                  margin: 20,
                  width: screenWidth * 0.7,
                  borderColor: theme.color,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  {modalType != "cardio" ? (
                    <>
                      <View>
                        <Text
                          style={{
                            color: theme.color,
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          Sets
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: theme.color,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {modalSets}
                        </Text>
                        <Text
                          style={{
                            color: theme.color,
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          Reps
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: theme.color,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {modalReps}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: theme.color,
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          Weight
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: theme.color,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {modalWeight} kg
                        </Text>
                        <Text
                          style={{
                            color: theme.color,
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          Warm Up Set
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: theme.color,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {modalWarmUpSet ? "Yes" : "No"}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View>
                        <View>
                          <Text
                            style={{
                              color: theme.color,
                              fontSize: 12,
                              textAlign: "center",
                            }}
                          >
                            Distance
                          </Text>
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: theme.color,
                              fontSize: 16,
                              textAlign: "center",
                            }}
                          >
                            {modalDistance} km
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: theme.color,
                              fontSize: 12,
                              textAlign: "center",
                            }}
                          >
                            Duration
                          </Text>
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: theme.color,
                              fontSize: 16,
                              textAlign: "center",
                            }}
                          >
                            {modalDuration} mins
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                </View>

                <Text
                  style={{
                    color: theme.color,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Calories
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: theme.color,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {modalCalories} kcal
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <FAB
                  icon="close"
                  style={styles.fab}
                  onPress={() => {
                    setExerciseModalVisible(!exerciseModalVisible);
                    console.log("Dismiss Info");
                  }}
                />
                <FAB
                  icon="delete"
                  style={styles.fab}
                  onPress={() => {
                    setExerciseModalVisible(!exerciseModalVisible);
                    //Remove from workout
                    console.log("Remove from workout");
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>

      {/*Workout Name Modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nameModalVisible}
        onRequestClose={() => {
          setExerciseModalVisible(!exerciseModalVisible);
        }}
      >
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={[modalStyle.modalMain, { backgroundColor: theme.secondary }]}
          >
            <Text style={[modalStyle.modalText, { color: theme.color }]}>
              Save Workout
            </Text>

            <TextInput
              style={{
                color: theme.color,
                width: screenWidth * 0.6,
                borderColor: theme.color,
                margin: 10,
              }}
              placeholder={"Workout Name"}
              textAlign={"center"}
              onChangeText={(value) => {
                setWorkoutName(value);
              }}
              value={workoutName}
              placeholderTextColor={theme.color}
              clearButtonMode={"always"}
              borderColor={theme.color}
              borderWidth={1}
              borderRadius={10}
            />

            <View style={{ flexDirection: "row" }}>
              <FAB
                icon="close"
                style={styles.fab}
                onPress={() => {
                  setNameModalVisible(!nameModalVisible);
                  console.log("Don't Save Yet");
                }}
              />
              <FAB
                icon="check"
                style={styles.fab}
                onPress={() => {
                  console.log(
                    `selected exercises: ${JSON.stringify(selectedExercises)}`
                  );
                  console.log(`workout name: ${workoutName}`);
                  addWorkout(workoutName, selectedExercises);
                  setNameModalVisible(!nameModalVisible);
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <View style={styles.searchAndSave}>
        <TextInput
          clearButtonMode="always"
          value={text}
          onChangeText={(value) => setText(value)}
          style={[
            styles.search_bar,
            {
              borderColor: theme.color,
              color: theme.color,
              width: screenWidth * 0.7,
            },
          ]}
          textAlign={"center"}
          placeholder="Search Exercises"
          placeholderTextColor={theme.color}
        />

        <FAB
          icon="check"
          style={styles.fab}
          onPress={() => {
            setNameModalVisible(!nameModalVisible);
            console.log("Save Workout Plan");
          }}
        />
      </View>

      <Text style={[styles.customWorkout, { color: theme.color }]}>
        Exercises
      </Text>

      <ScrollView
        style={[styles.verticalScroll, { borderColor: theme.color }]}
        bounces={false}
      >
        {results.map((item) => (
          <TouchableOpacity
            onPress={() => {
              console.log(`exercises selected: ${selectedExercises}`);
              navigation.navigate("Exercise Information", {
                item,
                selectedExercises,
              });
            }}
            key={item}
          >
            <Text
              style={[
                styles.resultsText,
                { borderColor: theme.color, color: theme.color },
              ]}
              key={item}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedExercises.length > 0 && (
        <ScrollView
          style={[styles.horizontalScroll, { borderColor: theme.color }]}
          horizontal={true}
          alignItems={"center"}
          showsHorizontalScrollIndicator={false}
        >
          {selectedExercises.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setModalCalories(item.calories);
                setModalDistance(item.distance);
                setModalDuration(item.duration);
                setModalName(item.name);
                setModalReps(item.reps);
                setModalSets(item.sets);
                setModalWarmUpSet(item.warmUpSet);
                setModalWeight(item.weight);
                setExerciseModalVisible(!exerciseModalVisible);
                setModalType(item.type);
              }}
            >
              <Text
                style={[
                  styles.addedText,
                  { borderColor: theme.color, color: theme.color },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
  customWorkout: {
    fontSize: 22,
    margin: 5,
    fontWeight: "bold",
  },
  resultsText: {
    fontSize: 26,
    padding: 5,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    textAlign: "center",
  },
  addedText: {
    fontSize: 26,
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  verticalScroll: {
    height: "60%",
    borderWidth: 2,
    borderRadius: 26,
    paddingHorizontal: 16,
    margin: 10,
    width: "90%",
  },
  horizontalScroll: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.15,
    borderWidth: 2,
    borderRadius: 26,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 40,
  },
  searchAndSave: {
    flexDirection: "row",
    padding: 12,
    alignContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
    flex: 1,
  },
  container: {
    alignItems: "center",
    height: "100%",
  },
  search_bar: {
    borderRadius: 2,
    borderWidth: 2,
    borderRadius: 25,
    padding: 12,
  },
  fab: {
    marginHorizontal: 8,
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
