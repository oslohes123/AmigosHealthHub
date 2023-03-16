import {
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    Modal,
  } from "react-native";
  import { useState, useContext, useEffect } from "react";
  import themeContext from "../../../theme/themeContext";
  import { IconButton } from "react-native-paper";
  import { FAB } from "react-native-paper";
  
  import { useGetTrackedWorkoutDetails } from "../hooks/trackedWorkouts/useGetTrackedWorkoutDetails";
  import { useDeleteTrackedWorkout } from "../hooks/trackedWorkouts/useDeleteTrackedWorkout";

  export default function TrackedWorkoutInfoScreen({ route, navigation }) {
    const theme = useContext(themeContext);
    const [instructionModalData, setInstructionModalData] = useState(
      "No Instructions Available"
    );
    const [modalVisible, setModalVisible] = useState(false);
  
    const [workoutDetails, setWorkoutDetails] = useState([]);
    const { getTrackedWorkoutDetails, isLoading, error } = useGetTrackedWorkoutDetails();
    const { deleteTrackedWorkout } = useDeleteTrackedWorkout();
    const { workoutname, date, time } = route.params;
  
    useEffect(() => {
      async function fetchWorkoutDetails(workoutname, date, time) {
        const data = await getTrackedWorkoutDetails(workoutname, date, time);
        console.log(`workout data: ${JSON.stringify(data)}`);
        setWorkoutDetails(data);
      }
      console.log(`Route Params: ${JSON.stringify(route.params)}`);
      fetchWorkoutDetails(workoutname, date, time);
    }, []);
  
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
              style={[modalStyle.modalMain, { backgroundColor: theme.secondary }]}
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
                  width: screenWidth * 0.7,
                  borderColor: theme.color,
                }}
              >
                <Text style={{ color: theme.color }}>{instructionModalData}</Text>
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
  
        <View style={{flexDirection: 'row', justifyContent: "space-evenly", width: screenWidth * 0.9}}>
            <Text style={[styles.text, { color: theme.color, alignSelf: 'center' }]}>{workoutname}</Text>
            <View>
                <Text style={{ borderColor: theme.color, color: theme.color, fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>{date}</Text>
                <Text style={{ borderColor: theme.color, color: theme.color, fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>{time}</Text>
            </View>
        </View>
  
        <ScrollView
          alignContent={"center"}
          borderColor={theme.color}
          borderRadius={26}
          borderWidth={2}
          showsVerticalScrollIndicator={false}
          alignItems="center"
          style={{ margin: 10, width: screenWidth * 0.9 }}
        >
          {workoutDetails.map((item) => (
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
                    iconColor={theme.color}
                    size={20}
                    key={`${item.exercise.name}Instructions`}
                    onPress={() => {
                      console.log(`instructions: ${item.exercise.instructions}`);
                      setInstructionModalData(item.exercise.instructions);
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>

                <View style={{flexDirection: 'row', justifyContent: "space-evenly"}}>
                    <View style={{ justifyContent: "space-evenly", padding: 5 }}>
                    <Text style={{ color: theme.color, fontSize: 10, alignSelf: 'center' }}>Muscle</Text>
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
                    <Text
                        style={{
                        fontWeight: "bold",
                        color: theme.color,
                        fontSize: 16,
                        alignSelf: 'center'
                        }}
                    >
                        {item.exercise.equipment ||
                        item.exercise.equipment == "body_only"
                        ? "n/a"
                        : item.exercise.equipment}
                    </Text>
                    </View>
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
                    </View>
                    <View style={styles.statsRows}>
                      <Text
                        style={[
                          styles.statsText,
                          { color: theme.color, alignSelf: "center" },
                        ]}
                      >
                        Duration: {item.duration} mins
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.statsRows}>
                      {console.log(`sets: ${item.sets}`)}
                      <Text
                        style={[
                          styles.statsText,
                          { color: theme.color, alignSelf: "center" },
                        ]}
                      >
                        Sets: {item.sets}
                      </Text>
                    </View>
                    <View style={styles.statsRows}>
                      <Text
                        style={[
                          styles.statsText,
                          { color: theme.color, alignSelf: "center" },
                        ]}
                      >
                        Reps: {
                            // item.reps.forEach(rep => {
                            //     <Text>rep</Text>
                            // })
                        JSON.stringify(item.reps)
                        }
                      </Text>
                    </View>
                    <View style={styles.statsRows}>
                      <Text
                        style={[
                          styles.statsText,
                          { color: theme.color, alignSelf: "center" },
                        ]}
                      >
                        Weight: {JSON.stringify(item.weight)}
                      </Text>
                    </View>
                  </>
                )}
                <View style={styles.statsRows}>
                    <Text
                    style={[
                        styles.statsText,
                        { color: theme.color, alignSelf: "center" },
                    ]}
                    >
                    Calories: {item.calories} kcal
                    </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        <View style={styles.bottomButtons}>
          <FAB
            icon="delete"
            style={[styles.fab, {width: screenWidth * 0.9}]}
            label="Delete Plan"
            onPress={() => {
              deleteTrackedWorkout(workoutname, date, time);
              navigation.pop();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  function returnDataArray(itemSets, itemData) {
    let dataArray = [];
    for (let i = 0; i < itemSets; i++) {
      dataArray.push(itemData);
    }
    return dataArray;
  }
  
  const setsComponent = (item, theme) => {
    for (let i = 0; i < item.sets; i++) {
      <>
        <View style={styles.statsRows}>
          {console.log(`distance: ${item.distance}`)}
          <Text
            style={[
              styles.statsText,
              { color: theme.color, alignSelf: "center" },
            ]}
            key={item.reps}
          >
            Reps {item.reps}
          </Text>
        </View>
        <View style={styles.statsRows}>
          <Text
            style={[
              styles.statsText,
              { color: theme.color, alignSelf: "center" },
            ]}
            key={item.weight}
          >
            Weight {item.weight}
          </Text>
        </View>
      </>;
    }
  };
  
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
  };
  