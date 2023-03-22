import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function App({ navigation }) {
  const inputScreenButton = () => {
    navigation.navigate('ReviewYourDay');
  };
  const outputScreenButton = () => {
    navigation.navigate('ReviewYourPast');
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    header: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
    },
  });
  // components for the screen
  return (
    <View style={styles.container}>
      {/* <Button title="Review Your Day" onPress={inputScreenButton}></Button>
    <Button title="Review Your Past" onPress={outputScreenButton}></Button>       */}

      <TouchableOpacity onPress={inputScreenButton}>
        <LinearGradient
          colors={['blue', 'grey']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Review Your Day

          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={outputScreenButton}>
        <LinearGradient
          colors={['blue', 'grey']}
          style={styles.widget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>
            Review Your Past

          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
