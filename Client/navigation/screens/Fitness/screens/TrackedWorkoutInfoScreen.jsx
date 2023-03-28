import {
  View,
  Text,
  SafeAreaView,
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
import { FAB, IconButton, ActivityIndicator } from 'react-native-paper';
import themeContext from '../../../theme/themeContext';
import useGetTrackedWorkoutDetails from '../hooks/trackedWorkouts/useGetTrackedWorkoutDetails';
import useDeleteTrackedWorkout from '../hooks/trackedWorkouts/useDeleteTrackedWorkout';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = {
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  exerciseSection: {
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderRadius: 26,
    padding: 10,
    marginVertical: 10,
    width: screenWidth * 0.9,
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
    width: screenWidth * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
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
};

export default function TrackedWorkoutInfoScreen({ route, navigation }) {
  const {
    background,
    secondary,
    color,
    theme,
  } = useContext(themeContext);
  const [instructionModalData, setInstructionModalData] = useState(
    'No Instructions Available',
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [workoutDetails, setWorkoutDetails] = useState([]);
  const { getTrackedWorkoutDetails, isLoading } = useGetTrackedWorkoutDetails();
  const { deleteTrackedWorkout } = useDeleteTrackedWorkout();
  const { workoutname, date, time } = route.params;

  useEffect(() => {
    async function fetchWorkoutDetails(workoutname, date, time) {
      const data = await getTrackedWorkoutDetails(workoutname, date, time);
      setWorkoutDetails(data.reverse());
    }
    fetchWorkoutDetails(workoutname, date, time);
  }, []);

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
            style={[modalStyle.modalMain, { backgroundColor: secondary }]}
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
                width: screenWidth * 0.85,
                borderColor: color,
                maxHeight: screenHeight * 0.5,
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: screenWidth * 0.95 }}>
        <Text style={[styles.text, {
          color, width: screenWidth * 0.6, textAlign: 'left', alignSelf: 'center',
        }]}
        >
          {workoutname}
        </Text>
        <View style={{ alignSelf: 'center' }}>
          <Text style={{
            borderColor: color, color, fontSize: 20, alignSelf: 'center', fontWeight: 'bold',
          }}
          >
            {date}
          </Text>
          <Text style={{
            borderColor: color, color, fontSize: 20, alignSelf: 'center', fontWeight: 'bold',
          }}
          >
            {time}
          </Text>
        </View>
      </View>

      <ScrollView
        alignContent="center"
        borderColor={color}
        borderRadius={26}
        borderWidth={2}
        showsVerticalScrollIndicator={false}
        justifyContent={isLoading ? 'center' : 'flex-start'}
        alignItems="center"
        style={{ margin: 10, width: screenWidth * 0.95 }}
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
          <TouchableWithoutFeedback style={{ padding: 40 }} key={`${Math.random()}`}>
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

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ justifyContent: 'space-evenly', padding: 5 }}>
                  <Text style={{ color, fontSize: 10, alignSelf: 'center' }}>Muscle</Text>
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
                      alignSelf: 'center',
                    }}
                  >
                    {item.exercise.equipment
                        || item.exercise.equipment === 'body_only'
                      ? 'n/a'
                      : item.exercise.equipment}
                  </Text>
                </View>
              </View>

              {item.exercise.type === 'cardio' ? (
                <>
                  <View style={styles.statsRows}>
                    <Text style={[styles.statsText, { color, alignSelf: 'center' }]}>
                      Distance:
                      {' '}
                      {item.distance}
                      {' '}
                      m
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.statsRows}>
                    <Text style={[styles.statsText, { color, alignSelf: 'center' }]}>
                      Sets:
                      {' '}
                      {item.sets ? item.sets : 'n/a'}
                    </Text>
                  </View>
                  <View style={styles.statsRows}>
                    <Text style={[styles.statsText, { color, alignSelf: 'center' }]}>
                      Reps:
                      {' '}
                      {item.reps ? JSON.stringify(item.reps) : 'n/a'}
                    </Text>
                  </View>
                  <View style={styles.statsRows}>
                    <Text style={[styles.statsText, { color, alignSelf: 'center' }]}>
                      Weight:
                      {' '}
                      {item.weight ? JSON.stringify(item.weight) : 'n/a'}
                    </Text>
                  </View>
                </>
              )}
              <View style={styles.statsRows}>
                <Text style={[styles.statsText, { color, alignSelf: 'center' }]}>
                  Calories:
                  {' '}
                  {item.calories ? item.calories : 'n/a'}
                  {' '}
                  kcal
                </Text>
                <View style={styles.statsRows}>
                    <Text style={[styles.statsText, { color, alignSelf: 'center' }]}>
                      Duration:
                      {' '}
                      {Math.trunc(Number(item.duration))}
                      &apos;
                      {' '}
                      {Math.trunc((Number(item.duration) - Math.trunc(Number(item.duration))) * 60)}
                      &quot;
                    </Text>
                  </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}

        {!isLoading && workoutDetails.length > 0 && <Text style={{ alignSelf: 'center', color, paddingVertical: screenHeight * 0.1 }}>End of exercises</Text>}

      </ScrollView>
      <View style={styles.bottomButtons}>
        <FAB
          icon="delete"
          style={[styles.fab, { width: screenWidth * 0.95 }]}
          label="Delete History"
          onPress={() => {
            deleteTrackedWorkout(workoutname, date, time);
            navigation.pop();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
