import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Stats({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Graph');
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
