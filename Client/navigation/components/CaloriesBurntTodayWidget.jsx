import {
  TouchableOpacity, Text, View, StyleSheet, Dimensions
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import useGetCaloriesBurntToday from '../screens/Fitness/hooks/calories/useGetCaloriesBurntToday';
// import { useAuthContext } from '../screens/Authentication/context/AuthContext';
// import { getLatestCalorieGoal, getCaloriesRemaining } from '../screens/Diet/hooks/Calories';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  widget: {
    marginVertical: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 25,
    width: screenWidth * 0.45,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default function CaloriesBurntTodayWidget() {
  const { getCaloriesBurntToday, error, isLoading } = useGetCaloriesBurntToday();
  const isFocused = useIsFocused();
  // const { user } = useAuthContext();
  // const userid = user.id;
  // const todaysDate = new Date().toISOString().split('T')[0];

  const navigation = useNavigation();
  const [getCaloriesBurnt, setCaloriesBurnt] = useState(null);
  // const [latestCalorieGoal, setLatestCalorieGoal] = useState(null);
  // const [calroiesEaten, setCaloriesEaten] = useState(null);
  const caloriesBurnt = async () => {
    setCaloriesBurnt(await getCaloriesBurntToday());
    // setLatestCalorieGoal(await getLatestCalorieGoal(userid));
    // setCaloriesEaten(await getCaloriesRemaining(userid, todaysDate));
  };
  useEffect(() => {
    if (isFocused) {
      caloriesBurnt();
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
            Calories Burnt Today
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.header}>
              {error && <Text>{error}</Text>}
              {!error && getCaloriesBurnt && (
                <Text style={styles.number}>{getCaloriesBurnt}</Text>
              )}
            </Text>
            <Ionicons name="bicycle-outline" size={30} color="#fff" />
          </View>

          {isLoading && (
            <>
              {/* <Text>Refreshing.....</Text> */}
              <ActivityIndicator
                animating
                size={25}
                color={MD2Colors.greenA400}
              />
            </>
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}
