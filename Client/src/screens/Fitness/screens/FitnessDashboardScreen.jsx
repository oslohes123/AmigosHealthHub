import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions,
} from 'react-native';
import {
  useContext,
  useEffect,
  useState,
  React,
} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import useGetLastTrackedWorkout from '../hooks/trackedWorkouts/useGetLastTrackedWorkout';
import themeContext from '../../../theme/themeContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 40,
  },
  buttonView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 40,
  },
  container: {
    backgroundColor: '#203038',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  widget: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 25,
    width: screenWidth * 0.45,
    height: screenHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  info: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default function FitnessScreen({ navigation }) {
  const { getLastTrackedWorkout, isLoading } = useGetLastTrackedWorkout();
  const [getMostRecentWorkout, setMostRecentWorkout] = useState(null);
  const isFocused = useIsFocused();
  const { background } = useContext(themeContext);

  useEffect(() => {
    setMostRecentWorkout(null);
    async function setLastTrackedWorkout() {
      const lastTrackedWorkout = await getLastTrackedWorkout();
      setMostRecentWorkout(lastTrackedWorkout);
    }
    setLastTrackedWorkout();
  }, [navigation, isFocused]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>

      <TouchableOpacity
        testID="plansWidget"
        onPress={() => {
          navigation.navigate('Workout Plans');
        }}
      >
        <LinearGradient
          colors={['blue', 'grey']}
          style={[styles.widget, { width: screenWidth * 0.95 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Workout Plans
          </Text>

          <Ionicons name="barbell-outline" size={40} color="#fff" />

        </LinearGradient>
      </TouchableOpacity>

      <View style={{
        flexDirection: 'row', width: screenWidth * 0.95, justifyContent: 'space-between', marginBottom: 10,
      }}
      >
        <TouchableOpacity
          testID="historyWidget"
          onPress={() => {
            navigation.navigate('Workout History');
          }}
        >
          <LinearGradient
            colors={['blue', 'grey']}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.header}>
              History
            </Text>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.info}>Last Tracked Workout:</Text>

              <Text style={styles.info}>
                {getMostRecentWorkout}
              </Text>
            </View>

            {isLoading && (
              <ActivityIndicator
                animating
                size={10}
                color={MD2Colors.greenA400}
              />
            )}

            <Ionicons name="book-outline" size={40} color="#fff" />

          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          testID="statsWidget"
          onPress={() => {
            navigation.navigate('View Stats');
          }}
        >
          <LinearGradient
            colors={['blue', 'grey']}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.header}>
              Stats
            </Text>

            <Ionicons name="bar-chart-outline" size={40} color="#fff" />

          </LinearGradient>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
