import React, {useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import themeContext from '../../theme/themeContext';
import { DataTable } from 'react-native-paper';

export default function Nutrients({ route, navigation}) {

  const theme = useContext(themeContext)
  const data = route.params;

  const dataItems =  data.map((item,index) => {
    return (
      <DataTable.Row style={styles.row} key = {index}>
        <DataTable.Cell style={[{  color: theme.color }, {borderColor: theme.color}]}>{item.name}</DataTable.Cell>
        <DataTable.Cell numeric style={[{ color: theme.color }, {borderColor: theme.color}]}>{item.amount}</DataTable.Cell>
      </DataTable.Row>
    )
  })


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color }, {borderColor: theme.color}]}>Nutrients Consumed</Text>
      <View style={styles.tableContainer}>
        <DataTable>
        <DataTable.Header style={{borderBottomWidth: 5, borderBottomColor: 'black'}}>
          <DataTable.Title >Nutrient</DataTable.Title>
          <DataTable.Title  numeric>Amount</DataTable.Title>
        </DataTable.Header>
        {dataItems}
        </DataTable>
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
  tableContainer: {
    alignSelf: 'center',
    borderWidth: 4, 
    borderColor: 'black', 
    borderRadius: 5, 
    padding: 10,
    width: '70%',
  },
  row: {
    marginTop: '10%',
    borderBottomWidth: 3,
  }
});