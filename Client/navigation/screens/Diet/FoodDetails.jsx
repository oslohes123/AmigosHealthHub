/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { useCallback, useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput, Modal, TouchableOpacity,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useAuthContext } from '../Authentication/context/AuthContext';
import { addTrackedFood } from './hooks/Food';
import themeContext from '../../theme/themeContext';

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderWidth: 2,
    padding: '3%',
    width: '30%',
    borderRadius: 25,
    marginRight: '5%',
    textAlign: 'center',
    bottom: 5,
  },
  container: {
    flex: 2,
  },
  header: {
    fontSize: 30,
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  box: {
    flexDirection: 'row',
    marginTop: 17,
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
  },
  values: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'grey',
    padding: 5,
    borderRadius: 10,
    position: 'absolute',
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
    borderBottomColor: 'grey',
    borderBottomWidth: 1,

  },
});

export default function FoodDetails({ route, navigation }) {
  const theme = useContext(themeContext);
  const {
    food_name: name,
    calories,
    protein: Protein,
    carbohydrates: Carbs,
    fat: Fat,
    brand_name: Brand,
    serving_qty: servingQty,
    serving_unit: servingUnit,
    alt_measures: altMeasures,
  } = route.params.foodData;

  let {
    fiber: Fiber,
    sugar: Sugars,
  } = route.params.foodData;

  Fiber = Fiber || 0;
  Sugars = Sugars || 0;

  const [quantity, setQuantity] = React.useState(servingQty.toString());

  const [selectedServingUnit, setSelectedServingUnit] = useState(servingUnit.toString());
  const [visible, setVisible] = useState(false);

  const { user } = useAuthContext();
  const { id } = user;
  const foodInput = route.params;

  const updatedFoodInput = {
    ...foodInput,
    foodData: {
      ...foodInput.foodData,
      serving_qty: quantity,
      serving_unit: selectedServingUnit,
    },

  };

  const save = useCallback(async () => {
    if (quantity > 0) {
      await addTrackedFood(updatedFoodInput, id);
      navigation.navigate('Diet Dashboard');
      alert('Food successfully added');
    } else {
      alert('Serving quantity should be greater than 0');
    }
  });

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color }]}>{name}</Text>
      <View style={styles.box}>
        <Text style={[styles.text, { color: theme.color }]}>Calories</Text>
        <Text style={[styles.values, { color: theme.color }]}>{calories}</Text>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, { color: theme.color }]}>Protein</Text>
        <Text style={[styles.values, { color: theme.color }]}>{Protein}</Text>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, { color: theme.color }]}>Carbs</Text>
        <Text style={[styles.values, { color: theme.color }]}>{Carbs}</Text>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, { color: theme.color }]}>Fat</Text>
        <Text style={[styles.values, { color: theme.color }]}>{Fat}</Text>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, { color: theme.color }]}>Sugars</Text>
        <Text style={[styles.values, { color: theme.color }]}>{Sugars}</Text>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, { color: theme.color }]}>Fibre</Text>
        <Text style={[styles.values, { color: theme.color }]}>{Fiber}</Text>
      </View>
      <View style={styles.box} justifyContent="space-between">
        <Text style={[styles.text, { color: theme.color }]}>Serving units</Text>
        <View style={styles.dropDownContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.color }]}
            onPress={() => setVisible(true)}
          >
            <Text style={[{ color: theme.background }]}>{selectedServingUnit || 'Select an option'}</Text>
          </TouchableOpacity>
          <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => setVisible(false)}
          >
            <View style={styles.modal}>
              {altMeasures ? altMeasures.map((altMeasure, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalButton}
                  onPress={() => {
                    setSelectedServingUnit(altMeasure.measure);
                    setVisible(false);
                  }}
                >
                  <Text>{altMeasure.measure}</Text>
                </TouchableOpacity>
              ))

                : (
                  <TouchableOpacity
                    key="undefined"
                    style={styles.modalButton}
                    onPress={() => {
                      setVisible(false);
                    }}
                  >
                    <Text>{selectedServingUnit}</Text>
                  </TouchableOpacity>
                )}
            </View>
          </Modal>
        </View>
      </View>

      <View style={styles.box} justifyContent="space-between">
        <Text style={[styles.text, { color: theme.color }]}>Serving Quantity</Text>
        <TextInput
          defaultValue={quantity}
          placeholderTextColor={theme.color}
          color={theme.color}
          style={[styles.input, { borderColor: theme.color }]}
          keyboardType="numeric"
          clearButtonMode="always"
          onChangeText={(input) => setQuantity(input)}
        />
      </View>
      {Brand ? (
        <View style={styles.box}>
          <Text style={[styles.text, { color: theme.color }]}>Brand name</Text>
          <Text style={[styles.values, { color: theme.color }]}>{Brand}</Text>
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <GreenButton
          buttonFunction={save}
          iconName="add-outline"
          fontSize={23}
          height={70}
          width={200}
          text="Add Food"
        />
      </View>
    </View>
  );
}
