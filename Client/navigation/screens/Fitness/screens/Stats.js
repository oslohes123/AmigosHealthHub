import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";

export default function Stats({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Graph');
  }
  
  return (
    <View>
      <TouchableOpacity onPress={pressHandler}>
        <Text>View Graphs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
