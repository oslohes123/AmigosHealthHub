import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../screens/Authentication/context/AuthContext";
import { useGetCaloriesBurntToday } from "../screens/Fitness/hooks/calories/useGetCaloriesBurntToday";
import { useIsFocused } from "@react-navigation/native";

export default function CaloriesBurntTodayWidget({ navigation }) {
  const { getCaloriesBurntToday, error, isLoading } =
    useGetCaloriesBurntToday();
  const isFocused = useIsFocused();
  const { user } = useAuthContext();
  const userid = user.id;

  const [getCaloriesBurnt, setCaloriesBurnt] = useState("Not Available");
  const caloriesBurnt = async () => {
    let caloriesTemp = await getCaloriesBurntToday();
    setCaloriesBurnt(caloriesTemp);
  };
  useEffect(() => {
    if (isFocused) {
      caloriesBurnt();
    }
  }, [navigation, isFocused]);

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <Text style={styles.text}>Calories Burnt Today:{getCaloriesBurnt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: "15%",
    paddingVertical: "12%",
    fontSize: 30,
    color: "white",
  },
  container: {
    backgroundColor: "darkblue",
    borderRadius: 25,
  },
});
