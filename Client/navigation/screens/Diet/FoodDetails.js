import React, {useState} from "react";
import { StyleSheet, View, Text,TextInput, Modal, TouchableOpacity } from "react-native";
import GreenButton from "../../components/GreenButton";
// import { TextInput } from 'react-native-paper';

export default function FoodDetails({ route, navigation }) {

  const [selected, setSelected] = useState("")
  const [visible, setVisible] = useState(false)

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
        <View style={styles.box} justifyContent={'space-between'}>
        <Text style={styles.text}>Serving units</Text>
        <View style={styles.dropDownContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setVisible(true)}
          >
          <Text>{selected || 'Select an option'}</Text>
          </TouchableOpacity>
          <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setVisible(false)}
          >
            <View style={styles.modal}>
              <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSelected('ml');
                setVisible(false);
              }}
            >
              <Text>ml</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSelected('cups');
                setVisible(false);
              }}
            >
              <Text>cups</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSelected('grams');
                setVisible(false);
              }}
            >
              <Text>grams</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>

      <View style={styles.box} justifyContent={'space-between'}>
        <Text style={styles.text}>Serving Quantity</Text>
        <TextInput
          placeholder={servingQty.toString()}
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
    width: '10%',
    borderColor: 'white',
    borderRadius: 25,
    marginRight: '5%',
    textAlign: 'center',
    bottom:5,
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
    fontSize: 24,
  },
  values: {
    color: "white",
    fontSize: 20,
    //marginLeft: 165,
    borderWidth: 2,
    borderColor: "grey",
    padding: 5,
    borderRadius: 10,
    position: "absolute",
    right: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  dropDownContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: '5%',
    width: '30%',
  },
  button: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'white'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalButton: {
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});
