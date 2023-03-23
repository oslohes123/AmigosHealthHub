import {
  TouchableOpacity, Text, View, StyleSheet, Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { useAuthContext } from '../screens/Authentication/context/AuthContext';
import { getLatestCalorieGoal, getCaloriesRemaining } from '../screens/Diet/hooks/Calories';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  widget: {
    marginVertical: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 25,
    width: screenWidth * 0.43,
    height: screenHeight * 0.2,
    justifyContent: 'space-between',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
    textAlign: 'center',
  },
  number: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});
export default function CaloriesToGoalWidget() {
  const isFocused = useIsFocused();
  const { user } = useAuthContext();
  const userid = user.id;
  const todaysDate = new Date().toISOString().split('T')[0];

  const navigation = useNavigation();
  const [latestCalorieGoal, setLatestCalorieGoal] = useState(null);
  const [caloriesEaten, setCaloriesEaten] = useState(null);
  const setCalorieGoal = async () => {
    setLatestCalorieGoal(await getLatestCalorieGoal(userid));
    setCaloriesEaten(await getCaloriesRemaining(userid, todaysDate));
  };
  useEffect(() => {
    if (isFocused) {
      setCalorieGoal();
    }
  }, [navigation, isFocused]);

  const pressHandler = () => {
    navigation.navigate('View Stats');
  };

  return (

    <TouchableOpacity onPress={pressHandler}>
      <View>
        <LinearGradient
          colors={['#00ffc8', '#0040ff']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Calories To Goal
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* <Text style={styles.header}>
              {error && <Text>{error}</Text>}
              {!error && getCaloriesBurnt && (
                <Text style={styles.number}>{getCaloriesBurnt}</Text>
              )}
            </Text> */}
            <Ionicons name="bicycle-outline" size={30} color="#fff" />
          </View>

        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}
