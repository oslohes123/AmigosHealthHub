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
// import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useContext, useEffect } from "react";
import themeContext from "../../../theme/themeContext";
import SearchBar from "../../../components/SearchBar";
import RedButton from "../../../components/RedButton";
import GreenButton from "../../../components/GreenButton";
import { useSearchExercise } from "../hooks/useSearchExercise";
export default function CreateNewWorkoutScreen({ navigation }) {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const theme = useContext(themeContext);
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const { searchExercise, isLoading, error } = useSearchExercise();

  useEffect(() => {
    async function fetchData() {
      const data = await searchExercise(text);
      console.log(`data: ${JSON.stringify(data)}`);
      let resultsList = [];

      data.map((item) => {
        resultsList.push(item.name);
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
                Exercise Information
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
                    0
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
                    0
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
                    0
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
                    No
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                {RedButton({
                  height: screenHeight * 0.05,
                  width: screenWidth * 0.2,
                  fontSize: 12,
                  text: "Dismiss",
                  buttonFunction: () => {
                    setExerciseModalVisible(!exerciseModalVisible);
                    console.log("Dismiss Info");
                  },
                })}

                {RedButton({
                  height: screenHeight * 0.05,
                  width: screenWidth * 0.2,
                  fontSize: 12,
                  text: "Remove",
                  buttonFunction: () => {
                    setExerciseModalVisible(!exerciseModalVisible);
                    //Remove from workout
                    console.log("Remove from workout");
                  },
                })}
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
              placeholderTextColor={theme.color}
              clearButtonMode={"always"}
              borderColor={theme.color}
              borderWidth={1}
              borderRadius={10}
            />

            <View style={{ flexDirection: "row" }}>
              {RedButton({
                height: screenHeight * 0.05,
                width: screenWidth * 0.2,
                fontSize: 12,
                text: "Dismiss",
                buttonFunction: () => {
                  setNameModalVisible(!nameModalVisible);
                  console.log("Don't Save Yet");
                },
              })}
              {GreenButton({
                height: screenHeight * 0.05,
                width: screenWidth * 0.2,
                fontSize: 12,
                text: "Save",
                buttonFunction: () => {
                  setNameModalVisible(!nameModalVisible);
                  console.log("Save Plan");
                },
              })}
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <View style={styles.searchAndCreate}>
        {/* {SearchBar({themeColor: theme.color, width: screenWidth * 0.7})} */}

        <TextInput
          clearButtonMode="always"
          value={text}
          onChangeText={(value) => setText(value)}
          style={[
            styles.input,
            { borderColor: theme.color },
            { color: theme.color },
          ]}
          placeholder="Find food..."
          placeholderTextColor={theme.color}
        />

        {/* {GreenButton({
          height: screenHeight * 0.05,
          width: screenWidth * 0.15,
          fontSize: 20,
          text: "Save",
          buttonFunction: () => {
            setNameModalVisible(!nameModalVisible);
            console.log("Save Workout Plan");
          },
        })} */}
      </View>

      <Text style={[styles.customWorkout, { color: theme.color }]}>
        Exercises
      </Text>

      <ScrollView style={styles.scroll}>
        {results.map((item) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item);
            }}
            style={modalStyle.modalMain}
            key={item}
          >
            <View>
              <View>
                <Text style={styles.textData} key={item}>
                  {item}
                </Text>
              </View>
              {/* <Ionicons
                name={"chevron-forward-outline"}
                size={32}
                color={"black"}
              /> */}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* <ScrollView
        style={[styles.verticalScroll, { borderColor: theme.color }]}
        showsVerticalScrollIndicator={false}
        alignItems={"center"}
      > */}
      {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        > */}
      {/* <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 3
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 5
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 6
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 7
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 8
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 9
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 10
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 11
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 12
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 13
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 14
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 15
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 16
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 17
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise Information");
          }}
        >
          <Text
            style={[
              styles.testText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test text 18
          </Text>
        </TouchableOpacity>
      </ScrollView> */}

      <ScrollView
        style={[styles.horizontalScroll, { borderColor: theme.color }]}
        horizontal={true}
        alignItems={"center"}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => {
            setExerciseModalVisible(!exerciseModalVisible);
          }}
        >
          <Text
            style={[
              styles.addedText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setExerciseModalVisible(!exerciseModalVisible);
          }}
        >
          <Text
            style={[
              styles.addedText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test 2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setExerciseModalVisible(!exerciseModalVisible);
          }}
        >
          <Text
            style={[
              styles.addedText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test 3
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setExerciseModalVisible(!exerciseModalVisible);
          }}
        >
          <Text
            style={[
              styles.addedText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test 4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setExerciseModalVisible(!exerciseModalVisible);
          }}
        >
          <Text
            style={[
              styles.addedText,
              { borderColor: theme.color, color: theme.color },
            ]}
          >
            Test 5
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
  testText: {
    fontSize: 32,
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
    borderWidth: 2,
    borderRadius: 26,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 40,
  },
  searchAndCreate: {
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
