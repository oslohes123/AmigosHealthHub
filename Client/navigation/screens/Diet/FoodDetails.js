import React from "react";
import { StyleSheet, View, Text,TextInput } from "react-native";
import GreenButton from "../../components/GreenButton";
// import { TextInput } from 'react-native-paper';

export default function FoodDetails({ route, navigation }) {
  const pressHandler = () => {
    navigation.navigate("Diet Dashboard");
  };

  const [text, setText] = React.useState("")

  const {
    food_name: name,
    calories,
    protein: Protein,
    carbohydrates: Carbs,
    fat: Fat,
    sugar: Sugars,
    fiber: Fibre,
    brand_name: Brand,
    serving_qty: servingQty,
    serving_unit: servingUnit,
    alt_measures: altMeasures,
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
      <View style={styles.box}>
        <Text style={styles.text}>Serving units</Text>
        <Text style={styles.values}>{servingUnit}</Text>
      </View>
      <View style={styles.box} justifyContent={'space-between'}>
        <Text style={styles.text}>Serving Quantity</Text>
        <TextInput
          placeholder='Add Qty'
          placeholderTextColor='white'
          color= 'white'
          style={styles.input}
          keyboardType="numeric"
          clearButtonMode='always'
        />
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
  input: {
    //alignSelf: 'center',
    //marginTop: '15%',
    fontSize: 16,
    borderWidth: 2,
    padding: '3%',
    width: '25%',
    borderColor: 'white',
    borderRadius: 25,
    marginRight: '5%'
  },
  container: {
    flex: 2,
    backgroundColor: "#203038",
  },
  header: {
    color: "white",
    fontSize: 30,
    marginTop: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  box: {
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 20,
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
    right: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
