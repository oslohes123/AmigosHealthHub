import {
  FAB, Checkbox, Snackbar, ActivityIndicator,
} from 'react-native-paper';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  useContext,
  useState,
  useEffect,
  React,
} from 'react';
import themeContext from '../../../theme/themeContext';
import useGetExerciseByName from '../hooks/exercise/useGetExerciseByName';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = {
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    width: screenWidth * 0.2,
    height: screenHeight * 0.05,
    fontWeight: 'bold',
    fontSize: 10,
  },
};

export default function ExerciseInfoScreen({ route, navigation }) {
  const { background, color } = useContext(themeContext);
  const { getExerciseByName, isLoading, error } = useGetExerciseByName();
  const { item, selectedExercises } = route.params;

  const [exerciseInfo, setExerciseInfo] = useState({});

  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [distance, setDistance] = useState(null);
  const [durationMins, setDurationMins] = useState(null);
  const [durationSecs, setDurationSecs] = useState(null);
  const [weight, setWeight] = useState(null);
  const [calories, setCalories] = useState(null);
  const [warmUpSet, setWarmUpSet] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getExerciseByName(item);
      setExerciseInfo(data);
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: background,
        alignContent: 'center',
        maxHeight: screenHeight,
      }}
    >

      {isLoading
            && (
            <ActivityIndicator
              animating
              size={50}
              color="#c2e7fe"
            />
            )}

      {!isLoading && (exerciseInfo === null || error)
        && <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Unable to retreive exercise information. Try again later.</Text>}

      {!isLoading && exerciseInfo !== null
      && (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            margin: 10,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              textAlign: 'left',
              fontWeight: 'bold',
              color,
              maxWidth: screenWidth * 0.7,
            }}
          >
            {exerciseInfo.name ? exerciseInfo.name : 'No name data'}
          </Text>
          <FAB
            label="Add"
            style={{ marginHorizontal: 5 }}
            onPress={() => {
              if (
                (exerciseInfo.type === 'cardio'
                && (distance != null && distance.trim() !== '' && !Number.isNaN(Number(distance)) && Number(distance) >= 0
                || durationMins != null && durationMins.trim() !== '' && !Number.isNaN(Number(durationMins)) && Number(durationMins) >= 0
                && durationSecs != null && durationSecs.trim() !== '' && !Number.isNaN(Number(durationSecs)) && Number(durationSecs) >= 0 && Number(durationSecs) <= 60))
              || (exerciseInfo.type !== 'cardio'
                && weight != null && weight.trim() !== '' && !Number.isNaN(Number(weight)) && Number(weight) >= 0
                && reps != null && reps.trim() !== '' && !Number.isNaN(Number(reps)) && Number(reps) >= 0
                && sets != null && sets.trim() !== '' && !Number.isNaN(Number(sets)) && Number(sets) >= 0)
              ) {
                let updatedSelectedExercises;
                if (selectedExercises) {
                  updatedSelectedExercises = selectedExercises.concat([
                    {
                      name: exerciseInfo.name,
                      sets,
                      reps,
                      distance,
                      duration: (Number(durationMins) + (Number(durationSecs) / 60)).toFixed(2),
                      weight,
                      calories,
                      warmUpSet,
                      type: exerciseInfo.type,
                      muscle: exerciseInfo.muscle,
                      difficulty: exerciseInfo.difficulty,
                      instructions: exerciseInfo.instructions,
                      equipment: exerciseInfo.equipment,
                    },
                  ]);
                } else {
                  updatedSelectedExercises = [
                    {
                      name: exerciseInfo.name,
                      sets,
                      reps,
                      distance,
                      duration: (Number(durationMins) + (Number(durationSecs) / 60)).toFixed(2),
                      weight,
                      calories,
                      warmUpSet,
                      type: exerciseInfo.type,
                      muscle: exerciseInfo.muscle,
                      difficulty: exerciseInfo.difficulty,
                      instructions: exerciseInfo.instructions,
                      equipment: exerciseInfo.equipment,
                    },
                  ];
                }
                navigation.navigate(
                  'Create New Workout',
                  updatedSelectedExercises,
                );
              } else {
                setSnackbarVisible(true);
              }
            }}
          />
        </View>

        <View style={{ justifyContent: 'space-evenly' }}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              borderWidth: 2,
              borderRadius: 26,
              padding: 10,
              margin: 10,
              width: screenWidth * 0.95,
              borderColor: color,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color,
                fontSize: 12,
                paddingVertical: 5,
              }}
            >
              Instructions
            </Text>
            <ScrollView style={{ maxHeight: screenHeight * 0.2 }}>
              <TouchableWithoutFeedback>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color,
                    fontSize: 16,
                  }}
                >
                  {exerciseInfo.instructions
                    ? exerciseInfo.instructions
                    : 'No instruction data'}
                </Text>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>

          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              borderWidth: 2,
              borderRadius: 26,
              padding: 10,
              margin: 10,
              width: screenWidth * 0.95,
              borderColor: color,
            }}
          >
            <View style={{ justifyContent: 'space-evenly' }}>
              <Text
                style={{ color, fontSize: 12, textAlign: 'center' }}
              >
                Type
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color,
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                {exerciseInfo.type ? exerciseInfo.type : 'No type data'}
              </Text>
              <Text
                style={{ color, fontSize: 12, textAlign: 'center' }}
              >
                Muscle
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color,
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                {exerciseInfo.muscle ? exerciseInfo.muscle : 'No mucle data'}
              </Text>
              <Text
                style={{ color, fontSize: 12, textAlign: 'center' }}
              >
                Difficulty
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color,
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                {exerciseInfo.difficulty
                  ? exerciseInfo.difficulty
                  : 'No difficulty data'}
              </Text>
            </View>
            <View style={{ justifyContent: 'space-evenly' }}>
              <Text
                style={{ color, fontSize: 12, textAlign: 'center' }}
              >
                Equipment
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color,
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                {exerciseInfo.equipment
                  ? exerciseInfo.equipment
                  : 'No equipment data'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between', padding: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                width: screenWidth * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignContent: 'center',
              }}
            >
              <View
                style={{
                  width: screenWidth * 0.4,
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignContent: 'center',
                }}
              >
                <View
                  style={{
                    width: screenWidth * 0.4,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                  }}
                >
                  {exerciseInfo.type !== 'cardio' ? (
                    <>
                      <TextInput
                        style={[
                          styles.textInput,
                          { borderColor: color, color },
                        ]}
                        placeholder="Sets"
                        placeholderTextColor={color}
                        onChangeText={setSets}
                        value={sets}
                        keyboardType="numeric"
                        textAlign="center"
                      />
                      <TextInput
                        style={[
                          styles.textInput,
                          { borderColor: color, color },
                        ]}
                        placeholder="Reps"
                        placeholderTextColor={color}
                        onChangeText={setReps}
                        value={reps}
                        keyboardType="numeric"
                        textAlign="center"
                      />
                    </>
                  ) : (
                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <TextInput
                          style={[
                            styles.textInput,
                            { borderColor: color, color },
                          ]}
                          placeholder="Distance (km)"
                          placeholderTextColor={color}
                          onChangeText={setDistance}
                          value={distance}
                          keyboardType="numeric"
                          textAlign="center"
                        />
                      </View> 
                    </View>
                  )}
                </View>

                {exerciseInfo.type !== 'cardio' && (
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderColor: color,
                        alignSelf: 'center',
                        color,
                      },
                    ]}
                    placeholder="Weight (kg)"
                    placeholderTextColor={color}
                    onChangeText={setWeight}
                    value={weight}
                    keyboardType="numeric"
                    textAlign="center"
                  />
                  )}

                <View
                  style={{
                    width: screenWidth * 0.5,
                    flexDirection: 'row',
                    justifyContent:
                    exerciseInfo.type !== 'cardio' ? 'space-evenly' : 'center',
                    alignContent: 'center',
                    alignSelf: 'center'
                  }}
                >

                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={[
                        styles.textInput,
                        { borderColor: color, color, width: screenWidth * 0.1 },
                      ]}
                      placeholder="Mins"
                      placeholderTextColor={color}
                      onChangeText={setDurationMins}
                      value={durationMins}
                      keyboardType="numeric"
                      textAlign="center"
                    />
                    <Text style={{ color, alignSelf: 'center', fontWeight: 'bold' }}>:</Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        { borderColor: color, color, width: screenWidth * 0.1 },
                      ]}
                      placeholder="Secs"
                      placeholderTextColor={color}
                      onChangeText={setDurationSecs}
                      value={durationSecs}
                      keyboardType="numeric"
                      textAlign="center"
                    />
                  </View>

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderColor: color,
                        alignSelf: 'center',
                        color,
                      },
                    ]}
                    placeholder="Calories (kcal)"
                    placeholderTextColor={color}
                    onChangeText={setCalories}
                    value={calories}
                    keyboardType="numeric"
                    textAlign="center"
                  />
                </View>
              </View>

              {exerciseInfo.type !== 'cardio' && (
              <View
                style={{
                  width: screenWidth * 0.3,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color,
                    fontSize: 16,
                    alignSelf: 'center',
                    padding: 5,
                    fontWeight: 'bold',
                  }}
                  onPress={() => {
                    setWarmUpSet(!warmUpSet);
                  }}
                >
                  Warm Up Set
                </Text>

                <Checkbox
                  status={warmUpSet ? 'checked' : 'indeterminate'}
                  onPress={() => {
                    setWarmUpSet(!warmUpSet);
                  }}
                />
              </View>
              )}
            </View>
          </View>
        </View>
      </>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(!snackbarVisible)}
        action={{
          label: 'Close',
          onPress: () => {
            setSnackbarVisible(!snackbarVisible);
          },
        }}
        duration={3000}
      >
        Fields left empty or have invalid values!
      </Snackbar>
    </SafeAreaView>
  );
}
