import { StatusBar } from "expo-status-bar";

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import themeContext from "../../../theme/themeContext";
import { useGetAllWorkoutNames } from "../hooks/workoutPlans/useGetAllWorkoutNames";
import { FAB, Provider, Portal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

export default function WorkoutPlansScreen({ navigation }) {
  const theme = useContext(themeContext);
  const { getAllWorkoutNames, isLoading, error } = useGetAllWorkoutNames();
  const [results, setResults] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const data = await getAllWorkoutNames();
      // console.log(`data: ${JSON.stringify(data)}`);
      let resultsList = [];

      data.map((item) => {
        resultsList.push(item);
      });
      setResults(resultsList);
    }
    fetchData();
  }, [navigation, isFocused]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Provider>
        <ScrollView
          style={[styles.scrollView, { borderColor: theme.color }]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          justifyContent={results.length < 1 ? "center" : "flex-start"}
          alignItems={"center"}
        >
          {error && <Text>{error}</Text>}
          {results.length < 1 && (
            <Text style={{ color: theme.color, fontWeight: "bold" }}>
              You currently have no custom workout plans.
            </Text>
          )}

          {results &&
            results.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  navigation.navigate("Workout Plan Information", item);
                }}
              >
                <Text
                  style={[
                    styles.testText,
                    { borderColor: theme.color, color: theme.color },
                  ]}
                  key={item}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <View>
          <FAB
            icon="plus"
            style={styles.fab}
            label="Create Plan"
            onPress={() => {
              navigation.navigate("Create New Workout");
            }}
            // onLongPress={() => {navigation.navigate('Add Custom Exercise')}}
          />
        </View>
      </Provider>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
  customWorkout: {
    fontSize: 22,
    margin: 10,
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
  scrollView: {
    height: screenHeight * 0.2,
    borderWidth: 2,
    borderRadius: 26,
    paddingHorizontal: 16,
    margin: 10,
    width: screenWidth * 0.9,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 40,
  },
  searchAndCreate: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-evenly",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
    flex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  fab: {
    marginBottom: 16,
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
};

const modalStyle = {
  modalMain: {
    justifyContent: "space-between",
    alignItems: "center",
    height: screenHeight * 0.8,
    width: screenWidth * 0.9,
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
    width: screenWidth * 0.35,
    height: screenHeight * 0.05,
    fontWeight: "bold",
  },
};
