import React from "react";
import { StyleSheet, View, Text } from "react-native";
import GreenButton from "../../components/GreenButton";

export default function FoodDetails({ route, navigation }) {
  const pressHandler = () => {
    navigation.navigate("Diet Dashboard");
  };

  const { 
    food_name: name,
    calories,
    protein: Protein,
    carbohydrates: Carbs,
    fat: Fat,
    sugar: Sugars,
    fiber: Fibre,
    brand_name: Brand,
  } = route.params;

//   console.log(route.params);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <View style={styles.box}>
        <Text style={styles.text}>Calories</Text>
        <Text style={styles.values}>{calories}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Protein</Text>
        <Text style={styles.values}>{Protein}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Carbs</Text>
        <Text style={styles.values}>{Carbs}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Fat</Text>
        <Text style={styles.values}>{Fat}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Sugars</Text>
        <Text style={styles.values}>{Sugars}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Fibre</Text>
        <Text style={styles.values}>{Fibre}</Text>
      </View>
      {Brand?<View style={styles.box}>
        <Text style={styles.text}>Brand name</Text>
        <Text style={styles.values}>{Brand}</Text>
      </View> : null}
      <View style={styles.buttonContainer}>
        <GreenButton
          buttonFunction={pressHandler}
          iconName="add-outline"
          fontSize={23}
          height={70}
          width={200}
          text={"Add Food"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#203038",
  },
  header: {
    color: "white",
    fontSize: 32,
    marginTop: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
  box: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 30,
  },
  text: {
    color: "white",
    fontSize: 27,
  },
  values: {
    color: "white",
    fontSize: 20,
    //marginLeft: 165,
    borderWidth: 2,
    borderColor: "white",
    padding: 5,
    borderRadius: 10,
    position: "absolute",
    right: 30,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
