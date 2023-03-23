import {
  TouchableOpacity, Text, View, StyleSheet, Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { useAuthContext } from '../screens/Authentication/context/AuthContext';
import { getCaloriesRemaining } from '../screens/Diet/hooks/Calories';

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
  const [caloriesRemaining, setCaloriesRemaining] = useState(0);
  async function setCalorieGoal() {
    const remainingCalories = await getCaloriesRemaining(userid, todaysDate);
    setCaloriesRemaining(remainingCalories);
  }
  useEffect(() => {
    if (isFocused) {
      setCalorieGoal();
    }
  }, [navigation, isFocused]);

  const pressHandler = () => {
    navigation.navigate('Diet Dashboard');
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
            Calories remaining
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.header}>
              {caloriesRemaining !== undefined && (
                <Text style={styles.number}>{caloriesRemaining}</Text>
              )}
            </Text>
            <Ionicons name="fast-food-outline" size={30} color="#fff" />
          </View>

        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}
