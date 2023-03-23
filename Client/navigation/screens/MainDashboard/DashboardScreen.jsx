import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { LinearGradient } from 'expo-linear-gradient';
import HoursSleptGraph from '../Sleep/hoursSleptGraph';
import themeContext from '../../theme/themeContext';
import CaloriesBurntTodayWidget from '../../components/CaloriesBurntTodayWidget';
import CaloriesToGoalWidget from '../../components/CaloriesToGoalWidget';
import WordOfTheDayWidget from '../../components/WordOfTheDayWidget';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  widgetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 30,
  },
  graphContainer: {
    position: 'relative',
  },
  widget: {
    paddingHorizontal: '15%',
    paddingVertical: '10%',
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center',
  },
  widgetText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default function DashboardScreen({ navigation }) {
  const { background } = useContext(themeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>

      <View style={styles.widgetContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Sleep')}>
          <View style={styles.graphContainer}>
            <HoursSleptGraph />
          </View>
        </TouchableOpacity>
      </View>

      <CaloriesBurntTodayWidget />

      <TouchableOpacity>
        <WordOfTheDayWidget />
      </TouchableOpacity>

      <TouchableOpacity>
        <CaloriesToGoalWidget />
      </TouchableOpacity>

    </SafeAreaView>
  );
}
