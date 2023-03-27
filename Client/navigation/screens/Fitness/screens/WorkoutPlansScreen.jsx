import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  useState,
  useContext,
  useEffect,
  React,
} from 'react';
import { FAB, Provider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import themeContext from '../../../theme/themeContext';
import useGetAllWorkoutNames from '../hooks/workoutPlans/useGetAllWorkoutNames';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = {
  textBorder: {
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
  container: {
    alignItems: 'center',
    flex: 1,
  },
  fab: {
    marginBottom: 16,
    width: screenWidth * 0.6,
    alignSelf: 'center',
  },
};

export default function WorkoutPlansScreen({ navigation }) {
  const { background, color } = useContext(themeContext);
  const { getAllWorkoutNames, error } = useGetAllWorkoutNames();
  const [results, setResults] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const data = await getAllWorkoutNames();
      const resultsList = [];

      data.map((item) => {
        resultsList.push(item);
      });
      setResults(resultsList);
    }
    fetchData();
  }, [navigation, isFocused]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: background }]}
    >
      <Provider>
        <ScrollView
          style={[styles.scrollView, { borderColor: color }]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          justifyContent={results.length < 1 ? 'center' : 'flex-start'}
          alignItems="center"
        >
          {error && <Text>{error}</Text>}
          {results.length < 1 && (
            <Text style={{ color, fontWeight: 'bold' }}>
              You currently have no custom workout plans.
            </Text>
          )}

          {results
            && results.map((item) => (
              <TouchableOpacity
                style={[styles.textBorder, { borderColor: color }]}
                key={item}
                onPress={() => { navigation.navigate('Workout Plan Information', item); }}
              >
                <Text style={[styles.testText, {
                  borderColor: color, color, fontSize: 32, textAlign: 'center',
                }]}
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
              navigation.navigate('Create New Workout');
            }}
          />
        </View>
      </Provider>
    </SafeAreaView>
  );
}
