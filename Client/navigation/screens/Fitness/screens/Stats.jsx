import {
  StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions,
} from 'react-native';
import React, { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import themeContext from '../../../theme/themeContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  widget: {
    padding: 20,
    borderRadius: 25,
    width: screenWidth * 0.95,
    height: screenHeight * 0.2,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default function Stats({ navigation }) {
  const { background } = useContext(themeContext);

  const pressHandler = () => {
    navigation.navigate('Graph');
  };

  const pressHandler1 = () => {
    navigation.navigate('Past Workout Details');
  };

  const pressHandler2 = () => {
    navigation.navigate('Overall Stats');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <TouchableOpacity onPress={pressHandler}>
        <LinearGradient
          colors={['blue', 'grey']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Click to view Graphs

          </Text>
          <Ionicons name="bar-chart-outline" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={pressHandler1}>
        <LinearGradient
          colors={['blue', 'grey']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Click to view Workout History

          </Text>
          <AntDesign name="calendar" size={35} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={pressHandler2}>
        <LinearGradient
          colors={['blue', 'grey']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Click to view overall Stats

          </Text>
          <Ionicons name="stats-chart-outline" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
