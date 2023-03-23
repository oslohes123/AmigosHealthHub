import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useState,
  useContext,
  useEffect,
  React,
} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import useGetWorkoutHistory from '../hooks/trackedWorkouts/useGetTrackedWorkoutHistory';
import themeContext from '../../../theme/themeContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = {
  itemBorder: {
    padding: 5,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    textAlign: 'center',
    width: screenWidth * 0.8,
    alignItems: 'center',
  },
  scrollView: {
    height: screenHeight * 0.2,
    borderWidth: 2,
    borderRadius: 26,
    paddingHorizontal: 16,
    margin: 10,
    width: screenWidth * 0.9,
  },
};

export default function WorkoutHistoryScreen({ navigation }) {
  const { background, color } = useContext(themeContext);
  const [results, setResults] = useState([]);
  const { getWorkoutHistory, isLoading } = useGetWorkoutHistory();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const data = await getWorkoutHistory();
      const resultsList = [];

      data.map((item) => {
        resultsList.push(item);
      });
      setResults(resultsList.reverse());
    }
    fetchData();
  }, [navigation, isFocused]);

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
      <ScrollView
        style={[styles.scrollView, { borderColor: color }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        justifyContent={results.length < 1 ? 'center' : 'flex-start'}
        alignItems="center"
      >

        {isLoading
          && (
          <ActivityIndicator
            animating
            size={50}
            color="#c2e7fe"
          />
          )}

        {/* {error && <Text>{error}</Text>} */}
        {!isLoading && results.length < 1 && (
          <Text style={{ color, fontWeight: 'bold' }}>
            You currently have no Workout History data.
          </Text>
        )}

        {!isLoading && results
          && results.map((item) => (
            <TouchableOpacity
              key={`${item.date} ${item.time}`}
              style={[styles.itemBorder, { borderColor: color }]}
              onPress={() => {
                navigation.navigate('Workout Information', item);
              }}
            >
              <Text style={{ color, fontSize: 32, textAlign: 'center' }}>{item.workoutname}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: screenWidth * 0.7 }}>
                <Text style={{ color, fontSize: 16, alignSelf: 'center' }}>{item.date}</Text>
                <Text style={{ color, fontSize: 16, alignSelf: 'center' }}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
