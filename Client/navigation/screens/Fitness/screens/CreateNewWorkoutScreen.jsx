import { StatusBar } from 'expo-status-bar';

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
} from 'react-native';
import {
  useState,
  useContext,
  useEffect,
  React,
} from 'react';
import { FAB, Snackbar, ActivityIndicator } from 'react-native-paper';
import themeContext from '../../../theme/themeContext';
import useSearchExercise from '../hooks/exercise/useSearchExercise';
import useAddWorkout from '../hooks/workoutPlans/useAddWorkout';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = {
  customWorkout: {
    fontSize: 22,
    margin: 5,
    fontWeight: 'bold',
  },
  resultsText: {
    fontSize: 26,
    padding: 5,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
  addedText: {
    height: screenHeight * 0.13,
    maxWidth: screenWidth * 0.5,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
  verticalScroll: {
    height: '60%',
    borderWidth: 2,
    borderRadius: 26,
    paddingHorizontal: 16,
    margin: 10,
    width: '90%',
  },
  horizontalScroll: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.15,
    borderWidth: 2,
    borderRadius: 26,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 40,
  },
  searchAndSave: {
    flexDirection: 'row',
    padding: 12,
    alignContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
    flex: 1,
  },
  container: {
    alignItems: 'center',
    height: '100%',
  },
  search_bar: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.9,
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

export default function CreateNewWorkoutScreen({ navigation, route }) {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const { background, secondary, color } = useContext(themeContext);
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState('');

  const [modalName, setModalName] = useState('');
  const [modalDistance, setModalDistance] = useState(0);
  const [modalDuration, setModalDuration] = useState(0);
  const [modalSets, setModalSets] = useState(0);
  const [modalReps, setModalReps] = useState(0);
  const [modalWeight, setModalWeight] = useState(0);
  const [modalWarmUpSet, setModalWarmUpSet] = useState(false);
  const [modalCalories, setModalCalories] = useState(0);
  const [modalType, setModalType] = useState('');

  const { searchExercise } = useSearchExercise();
  const { addWorkout, isLoading, message } = useAddWorkout();

  useEffect(() => {
    if (route.params && route.params !== selectedExercises) {
      setSelectedExercises(route.params);
    } else {
      setSelectedExercises([]);
    }
  }, [route.params]);

  useEffect(() => {
    async function fetchData() {
      const data = await searchExercise(text);
      const resultsList = [];

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
      style={[styles.container, { backgroundColor: background }]}
    >
      {/* Exercise Info Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={exerciseModalVisible}
        onRequestClose={() => {
          setExerciseModalVisible(!exerciseModalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={[
                modalStyle.modalMain,
                { backgroundColor: secondary },
              ]}
            >
              <Text style={[modalStyle.modalText, { color }]}>
                {modalName}
                {' '}
                Information
              </Text>

              <View
                style={{
                  justifyContent: 'space-evenly',
                  borderWidth: 2,
                  borderRadius: 26,
                  padding: 10,
                  margin: 20,
                  width: screenWidth * 0.7,
                  borderColor: color,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  {modalType !== 'cardio' ? (
                    <>
                      <View>
                        <Text
                          style={{
                            color,
                            fontSize: 12,
                            textAlign: 'center',
                          }}
                        >
                          Sets
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color,
                            fontSize: 16,
                            textAlign: 'center',
                          }}
                        >
                          {modalSets}
                        </Text>
                        <Text
                          style={{
                            color,
                            fontSize: 12,
                            textAlign: 'center',
                          }}
                        >
                          Reps
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color,
                            fontSize: 16,
                            textAlign: 'center',
                          }}
                        >
                          {modalReps}
                        </Text>

                        <Text
                          style={{
                            color,
                            fontSize: 12,
                            textAlign: 'center',
                          }}
                          >
                          Duration
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color,
                            fontSize: 16,
                            textAlign: 'center',
                          }}
                          >
                          {modalDuration}
                          {' '}
                          mins
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color,
                            fontSize: 12,
                            textAlign: 'center',
                          }}
                        >
                          Weight
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color,
                            fontSize: 16,
                            textAlign: 'center',
                          }}
                        >
                          {modalWeight}
                          {' '}
                          kg
                        </Text>
                        <Text
                          style={{
                            color,
                            fontSize: 12,
                            textAlign: 'center',
                          }}
                        >
                          Warm Up Set
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color,
                            fontSize: 16,
                            textAlign: 'center',
                          }}
                        >
                          {modalWarmUpSet ? 'Yes' : 'No'}
                        </Text>

                        <Text
                          style={{
                            color,
                            fontSize: 12,
                            textAlign: 'center',
                          }}
                          >
                          Calories
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color,
                            fontSize: 16,
                            textAlign: 'center',
                          }}
                          >
                          { modalCalories || 0 }
                          {' '}
                          kcal
                        </Text>

                      </View>
                    </>
                  ) : (
                    <View>
                      <View>
                        <Text
                          style={{
                            color,
                            fontSize: 12,
                            textAlign: 'center',
                          }}
                        >
                          Distance
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color,
                            fontSize: 16,
                            textAlign: 'center',
                          }}
                        >
                          {modalDistance}
                          {' '}
                          km
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: screenWidth * 0.6 }}>
                        
                        <View>
                          <Text
                            style={{
                              color,
                              fontSize: 12,
                              textAlign: 'center',
                            }}
                            >
                            Duration
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color,
                              fontSize: 16,
                              textAlign: 'center',
                            }}
                            >
                            {modalDuration}
                            {' '}
                            mins
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={{
                              color,
                              fontSize: 12,
                              textAlign: 'center',
                            }}
                            >
                            Calories
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color,
                              fontSize: 16,
                              textAlign: 'center',
                            }}
                            >
                            { modalCalories || 0 }
                            {' '}
                            kcal
                          </Text>
                        </View>

                      </View>
                    </View>
                  )}
                </View>

              </View>

              <View style={{ flexDirection: 'row' }}>
                <FAB
                  icon="close"
                  style={styles.fab}
                  onPress={() => {
                    setExerciseModalVisible(!exerciseModalVisible);
                  }}
                />
                <FAB
                  icon="delete"
                  style={styles.fab}
                  onPress={() => {
                    const copySelectedExercises = selectedExercises;

                    const indexToDelete = copySelectedExercises.findIndex((exercise) => {
                      if (exercise.name === modalName
                        && exercise.sets === modalSets
                        && exercise.reps === modalReps
                        && exercise.weight === modalWeight
                        && exercise.distance === modalDistance
                        && exercise.duration === modalDuration) {
                        return true;
                      }
                      return false;
                    });

                    copySelectedExercises.splice(indexToDelete, 1);

                    setExerciseModalVisible(!exerciseModalVisible);
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Workout Name Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={nameModalVisible}
        onRequestClose={() => {
          setExerciseModalVisible(!exerciseModalVisible);
        }}
      >
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={[modalStyle.modalMain, { backgroundColor: secondary }]}
          >
            <Text style={[modalStyle.modalText, { color }]}>
              Save Workout
            </Text>

            <TextInput
              style={{
                color,
                width: screenWidth * 0.6,
                height: screenHeight * 0.05,
                borderColor: color,
                margin: 10,
              }}
              placeholder="Workout Name"
              textAlign="center"
              onChangeText={(value) => {
                setWorkoutName(value);
              }}
              value={workoutName}
              placeholderTextColor={color}
              clearButtonMode="always"
              borderColor={color}
              borderWidth={1}
              borderRadius={10}
            />

            <View style={{ flexDirection: 'row' }}>
              <FAB
                icon="close"
                style={styles.fab}
                onPress={() => {
                  setNameModalVisible(!nameModalVisible);
                }}
              />
              <FAB
                icon="check"
                style={styles.fab}
                onPress={async () => {
                  if (workoutName.length > 1 && selectedExercises.length > 0) {
                    await addWorkout(workoutName, selectedExercises);

                    if (message === 'Workout Plan created!') {
                      Keyboard.dismiss();
                      setNameModalVisible(false);
                      navigation.pop();
                    }
                  } else {
                    setSnackbarText('Could not save workout plan. Make sure at least 1 exercise has been selected and you have given the plan a name.');
                    setSnackbarVisible(true);
                  }
                  if (selectedExercises.length < 1) {
                    setNameModalVisible(!nameModalVisible);
                  }
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <View style={styles.searchAndSave}>
        <TextInput
          autoFocus
          clearButtonMode="always"
          value={text}
          onChangeText={(value) => setText(value)}
          style={[
            styles.search_bar,
            {
              borderColor: color,
              color,
              width: screenWidth * 0.7,
            },
          ]}
          textAlign="center"
          placeholder="Search Exercises"
          placeholderTextColor={color}
        />

        <FAB
          icon="check"
          style={styles.fab}
          onPress={() => {
            setNameModalVisible(!nameModalVisible);
          }}
        />
      </View>

      <Text style={[styles.customWorkout, { color }]}>
        Exercises
      </Text>

      {isLoading
      && (
        <ActivityIndicator
          animating
          size={50}
          color="#c2e7fe"
        />
      )}

      <ScrollView
        style={[styles.verticalScroll, { borderColor: color }]}
        bounces={false}
      >

        {!isLoading && results.map((item) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Exercise Information', {
                item,
                selectedExercises,
              });
            }}
            key={item}
          >
            <Text
              style={[
                styles.resultsText,
                { borderColor: color, color },
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
          style={[styles.horizontalScroll, { borderColor: color }]}
          horizontal
          alignItems="center"
          showsHorizontalScrollIndicator={false}
        >
          {selectedExercises.map((item) => (
            <TouchableOpacity
              key={`${Math.random()}`}
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
                  { borderColor: color, color, textAlignVertical: 'center' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {message === 'Internal server error' && setSnackbarText(message)}

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
        {snackbarText}
      </Snackbar>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
