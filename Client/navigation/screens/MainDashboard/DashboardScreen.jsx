import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import HoursSleptGraph from '../Sleep/hoursSleptGraph';
import themeContext from '../../theme/themeContext';
import CaloriesBurntTodayWidget from '../../components/CaloriesBurntTodayWidget';
import CaloriesRemaining from '../../components/CaloriesRemaining';
import WordOfTheDayWidget from '../../components/WordOfTheDayWidget';
import { StatusBar } from 'expo-status-bar';

const screenWidth = Dimensions.get('window').width;

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
    // margin: 30,
  },
});

export default function DashboardScreen({ navigation }) {
  const { background } = useContext(themeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.widgetContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Sleep')}>
          <HoursSleptGraph />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <WordOfTheDayWidget />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.95 }}>
        <CaloriesBurntTodayWidget />
        <CaloriesRemaining />
      </View>

    </SafeAreaView>
  );
}
