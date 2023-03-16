import React, {useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import themeContext from '../../theme/themeContext';

export default function Nutrients({ route, navigation}) {

  const theme = useContext(themeContext)
  const data = route.params;
  console.log(data);

  const dataItems =  data.map((item,index) => {
    return (
      <View key = {index} style={styles.primaryView}>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>{item.name}</Text>
        <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>{item.amount}</Text>
      </View>

    )
  })


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color }, {borderColor: theme.color}]}>Nutrients Consumed</Text>
      
      <View style={styles.primaryView}>
        <Text style={[styles.primaryHeader, { color: theme.color }, {borderColor: theme.color}]}>Nutrient</Text>
        <Text style={[styles.primaryHeader, { color: theme.color }, {borderColor: theme.color}]}>Amount</Text>
      </View>
      {dataItems}

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