import {
  TouchableOpacity, Text, View, StyleSheet,
  Animated,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import useGetCaloriesBurntToday from '../screens/Fitness/hooks/calories/useGetCaloriesBurntToday';
import { useAuthContext } from '../screens/Authentication/context/AuthContext';

export default function CaloriesBurntTodayWidget() {
  const { getCaloriesBurntToday, error, isLoading } = useGetCaloriesBurntToday();
  const isFocused = useIsFocused();
  const { user } = useAuthContext();
  const userid = user.id;

  const navigation = useNavigation();
  const [getCaloriesBurnt, setCaloriesBurnt] = useState(null);
  const caloriesBurnt = async () => {
    setCaloriesBurnt(await getCaloriesBurntToday());
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
  // <View style={styles.container}>
  //   {error && <Text>{error}</Text>}

  //   <View style={styles.widget}>
  //     <Text style={styles.header}>Calories Burnt Today:</Text>
  //     <Text style={styles.number}>{getCaloriesBurnt}</Text>
  //   </View>
  // </View>

    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.container}>
        <LinearGradient
          // Button Linear Gradient
          // colors={["#00BFFF", "#0040ff"]}
          colors={['#00ffc8', '#0040ff']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            <Ionicons name="bicycle-outline" size={30} color="black" />
            Calories Burnt Today:
            {getCaloriesBurnt && (
              <Text style={styles.number}>{getCaloriesBurnt}</Text>
            )}
          </Text>

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
  // container: {
  //   backgroundColor: "darkblue",
  //   borderRadius: 25,
  // },
});
