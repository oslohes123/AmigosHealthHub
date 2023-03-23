import {
  TouchableOpacity, Text, View, StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import useGetTodaysWord from '../screens/Mental/hooks/useGetTodaysWord';

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
export default function WordOfTheDayWidget() {
  const { getTodaysWord, errorTodaysWord, isLoading } = useGetTodaysWord();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const [todaysWord, setTodaysWord] = useState(null);

  const setWordStates = async () => {
    setTodaysWord(await getTodaysWord());
  };
  useEffect(() => {
    if (isFocused) {
      setWordStates();
    }
  }, [navigation, isFocused]);
  const pressHandler = () => {
    navigation.navigate('View Stats');
  };

  return (

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
            Word Of The Day:
            {errorTodaysWord && <Text>{errorTodaysWord}</Text>}
            {!errorTodaysWord && todaysWord && (
            <Text style={styles.number}>{todaysWord}</Text>
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
