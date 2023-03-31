import {
  Text, View, StyleSheet, Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import useGetTodaysWord from '../screens/Mental/hooks/useGetTodaysWord';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  widget: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 25,
    width: screenWidth * 0.95,
    height: screenHeight * 0.2,
    justifyContent: 'space-between',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  number: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: screenWidth * 0.6,
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

  return (
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
          Word of the day
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {errorTodaysWord && <Text>{errorTodaysWord}</Text>}
          {!errorTodaysWord && todaysWord && (
          <Text style={styles.number}>{todaysWord}</Text>)}
          <Ionicons style={{ alignSelf: 'flex-end' }} name="bookmarks-outline" size={30} color="#fff" />
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
  );
}
