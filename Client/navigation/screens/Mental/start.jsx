import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TextInput, Dimensions, TouchableOpacity} from "react-native";
// npm install , npm install react-native-chart-kit , npx expo install react-native-svg ,  npm install react-native-word-cloud, npm install prop-types
import React , {useEffect, useState, Component} from 'react';
const screenWidth = Dimensions.get("window").width;
const colours = ["#ABDEE6","#CBAACB","#FFFFB5","#FFCCB6","#8FCACA","#FFC8A2","#55CBCD","#FCB9AA","#ECD5E3","#C6DBDA","#FED7C3","#A2E1DB","#97C1A9"]
import { LinearGradient } from 'expo-linear-gradient';

export default function App({navigation}) {
  const inputScreenButton = () => {
    navigation.navigate('ReviewYourDay')
  }
  const outputScreenButton = () => {
    navigation.navigate('ReviewYourPast')
  }
  //components for the screen
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

      <StatusBar style="auto" />
    </View>
  );
}
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