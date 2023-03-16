import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import themeContext from "../../../theme/themeContext";
import { useState, useContext, useEffect } from "react";
import { useGetWorkoutHistory } from "../hooks/trackedWorkouts/useGetTrackedWorkoutHistory";
import { useIsFocused } from "@react-navigation/native";

export default function WorkoutHistoryScreen({ navigation }) {
  const theme = useContext(themeContext);
  const [results, setResults] = useState([]);
  const { getWorkoutHistory, isLoading, error } = useGetWorkoutHistory();
  const isFocused = useIsFocused();
  const [incNo, setIncNo] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await getWorkoutHistory();
      console.log(`data: ${JSON.stringify(data)}`);
      let resultsList = [];

      data.map((item) => {
        resultsList.push(item);
      });
      setResults(resultsList.reverse());
    }
    fetchData();
  }, [navigation, isFocused]);

  function incrementor() {
    let no = incNo;
    setIncNo(incNo + 1);
    return no;
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
      <ScrollView
        style={[styles.scrollView, { borderColor: theme.color }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        justifyContent={results.length < 1 ? "center" : "flex-start"}
        alignItems={"center"}
      >
        {/* {error && <Text>{error}</Text>} */}
        {results.length < 1 && (
          <Text style={{ color: theme.color, fontWeight: "bold" }}>
            You currently have no Workout History data.
          </Text>
        )}

        {results &&
          results.map((item) => (
            <TouchableOpacity key={`${item.date} ${item.time}`} style={styles.itemBorder} onPress={() => {
                // navigation.navigate("Workout Plan Information", item)
                console.log(`completed workout pressed: ${JSON.stringify(item)}`)}}>
              <Text style={{ borderColor: theme.color, color: theme.color, fontSize: 32 }}>{item.workoutname}</Text>
              <View style={{flexDirection: 'row', justifyContent: "space-evenly", width: screenWidth * 0.7}}>
                <Text style={{ borderColor: theme.color, color: theme.color, fontSize: 16, alignSelf: 'center' }}>{item.date}</Text>
                <Text style={{ borderColor: theme.color, color: theme.color, fontSize: 16, alignSelf: 'center' }}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
  testText: {
    
  },
  itemBorder: {
    padding: 5,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    textAlign: "center",
    width: screenWidth * 0.8,
    alignItems: 'center'
  },
  scrollView: {
    height: screenHeight * 0.2,
    borderWidth: 2,
    borderRadius: 26,
    paddingHorizontal: 16,
    margin: 10,
    width: screenWidth * 0.9,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    left: screenWidth * 0.005,
    bottom: screenHeight * 0.005,
  },
};
