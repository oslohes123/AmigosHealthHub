/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { useCallback, useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput, Modal, TouchableOpacity, SafeAreaView, Dimensions, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useAuthContext } from '../Authentication/context/AuthContext';
import { addTrackedFood } from './hooks/Food';
import themeContext from '../../theme/themeContext';
import { FAB } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderWidth: 2,
    padding: 5,
    width: screenWidth * 0.25,
    borderRadius: 20,
    textAlign: 'center',
    bottom: 5,
  },
  container: {
    flex: 1, 
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 30,
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    width: screenWidth * 0.95
  },
  box: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 24,
    alignSelf: 'center'
  },
  values: {
    fontSize: 20,
    borderWidth: 2,
    padding: 5,
    textAlign: 'center',
    borderRadius: 10,
    width: screenWidth * 0.25,
  },
  buttonContainer: {
    margin: 20,
    width: screenWidth * 0.6,
    alignSelf: 'center'
  },
  dropDownContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    width: '30%',
  },
  button: {
    width: screenWidth * 0.25,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color, margin: 10 }]}>{name}</Text>
      <ScrollView style={{ maxHeight: screenHeight * 0.6 }}>
        <TouchableWithoutFeedback>
          <>
          <TouchableWithoutFeedback>
            <View style={[styles.box, {borderColor: theme.color} ]}>
              <Text style={[styles.text, { color: theme.color }]}>Calories</Text>
              <Text style={[styles.values, { color: theme.color, borderColor: theme.color }]}>{calories}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[ styles.box, {borderColor: theme.color} ]}>
              <Text style={[styles.text, { color: theme.color }]}>Protein</Text>
              <Text style={[styles.values, { color: theme.color, borderColor: theme.color }]}>{Protein}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[ styles.box, {borderColor: theme.color} ]}>
              <Text style={[styles.text, { color: theme.color }]}>Carbs</Text>
              <Text style={[styles.values, { color: theme.color, borderColor: theme.color }]}>{Carbs}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[ styles.box, {borderColor: theme.color} ]}>
              <Text style={[styles.text, { color: theme.color }]}>Fat</Text>
              <Text style={[styles.values, { color: theme.color, borderColor: theme.color }]}>{Fat}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[ styles.box, {borderColor: theme.color} ]}>
              <Text style={[styles.text, { color: theme.color }]}>Sugars</Text>
              <Text style={[styles.values, { color: theme.color, borderColor: theme.color }]}>{Sugars}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[ styles.box, {borderColor: theme.color} ]}>
              <Text style={[styles.text, { color: theme.color }]}>Fibre</Text>
              <Text style={[styles.values, { color: theme.color, borderColor: theme.color }]}>{Fiber}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[ styles.box, {borderColor: theme.color} ]} justifyContent="space-between">
              <Text style={[styles.text, { color: theme.color }]}>Serving units</Text>
              <View style={styles.dropDownContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.background }]}
                  onPress={() => setVisible(true)}
                >
                  <Text style={[{ color: theme.color, alignSelf: 'center' }]}>{selectedServingUnit || 'Select an option'}</Text>
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
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[ styles.box, {borderColor: theme.color} ]} justifyContent="space-between">
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
          </TouchableWithoutFeedback>
          {Brand ? (
            <TouchableWithoutFeedback>
              <View style={[ styles.box, {borderColor: theme.color} ]}>
                <Text style={[styles.text, { color: theme.color }]}>Brand name</Text>
                <Text style={[styles.values, { color: theme.color }]}>{Brand}</Text>
              </View>
            </TouchableWithoutFeedback>
          ) : null}
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FAB
          onPress={save}
          icon="check"
          alignSelf={'center'}
          width={screenWidth * 0.6}
          label="Add Food"
        />
      </View>
    </SafeAreaView>
  );
}
