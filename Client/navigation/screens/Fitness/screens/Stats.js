import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

export default function Stats({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Graph');
  }

  const pressHandler1 = () => {
    navigation.navigate('Past Workout Details');
  }

  const pressHandler2 = () => {
    navigation.navigate('Overall Stats');
  }
  
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={pressHandler}>
          <LinearGradient
            colors={["blue", "grey"]}
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
            colors={["blue", "grey"]}
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
            colors={["blue", "grey"]}
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

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    paddingHorizontal: "15%",
    paddingVertical: "10%",
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center'
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
});
