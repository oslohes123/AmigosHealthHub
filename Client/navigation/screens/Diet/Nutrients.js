import React, {useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import themeContext from '../../theme/themeContext';

export default function Nutrients() {

  const theme = useContext(themeContext)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color }, {borderColor: theme.color}]}>Nutrients Consumed</Text>
      
      <View style={styles.primaryView}>
        <Text style={[styles.primaryHeader, { color: theme.color }, {borderColor: theme.color}]}>Nutrient</Text>
        <Text style={[styles.primaryHeader, { color: theme.color }, {borderColor: theme.color}]}>Amount</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>Protein</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>82g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>Carbs</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>82g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>Fat</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>22g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>Energy</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>62g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>Sugars</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>45g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>Fibre</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>34g</Text>
      </View>

      <View style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>Vitamins</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>12g</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontWeight: 'bold',
    borderWidth: 2,
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
    borderWidth: 2,
    width: '70%',
    paddingVertical: '7%',
  }
});