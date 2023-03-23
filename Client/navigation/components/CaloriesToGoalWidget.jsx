import {
  TouchableOpacity, Text, View, StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { useAuthContext } from '../screens/Authentication/context/AuthContext';
import { getLatestCalorieGoal, getCaloriesRemaining } from '../screens/Diet/hooks/Calories';

const styles = StyleSheet.create({
  widget: {
    paddingHorizontal: '10%',
    paddingVertical: '10%',
    borderRadius: 25,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  number: {
    color: 'white',
    fontSize: 25,
    // fontWeight: "bold",
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
      <View style={styles.container}>
        <LinearGradient
          colors={['#00ffc8', '#0040ff']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Calories To Goal:

            {/* {getCaloriesBurnt && (
            <Text style={styles.number}>Test</Text>
            )} */}
          </Text>

        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}