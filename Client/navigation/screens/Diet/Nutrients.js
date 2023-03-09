import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Nutrients() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Food Consumed</Text>
      
      <View style={styles.primaryView}>
        <Text style={styles.primaryHeader}>Nutrient</Text>
        <Text style={styles.primaryHeader}>Amount</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={styles.text}>Protein</Text>
        <Text style={styles.text}>82g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={styles.text}>Carbs</Text>
        <Text style={styles.text}>82g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={styles.text}>Fat</Text>
        <Text style={styles.text}>22g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={styles.text}>Energy</Text>
        <Text style={styles.text}>62g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={styles.text}>Sugars</Text>
        <Text style={styles.text}>45g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={styles.text}>Fibre</Text>
        <Text style={styles.text}>34g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={styles.text}>Vitamins</Text>
        <Text style={styles.text}>12g</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#203038',
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: '5%'
  },
  primaryHeader: {
    fontSize: 25,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    width: '70%',
    paddingVertical: '13%',
  },
  primaryView: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginHorizontal: '20%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    width: '70%',
    paddingVertical: '7%',
  }
});