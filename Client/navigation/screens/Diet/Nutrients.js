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
        <DataTable.Cell style={[{  color: theme.color }, {borderColor: theme.color}]}>
          <Text style={[styles.data, {color: theme.color}]}>{item.name}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric style={[{ color: theme.color }, {borderColor: theme.color}]}>
          <Text style={[styles.data, {color: theme.color}]}>{item.amount}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    )
  })


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color }, {borderColor: theme.color}]}>Nutrients Consumed</Text>
      <View style={[styles.tableContainer, {borderColor: theme.color}]}>
        <DataTable>
        <DataTable.Header style={{borderBottomWidth: 5, borderBottomColor: 'red'}}>
          <DataTable.Title>
            <Text style={[styles.tableHeader, {color: theme.color}]}>Nutrient</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={[styles.tableHeader, {color: theme.color}]}>Amount</Text>
          </DataTable.Title>
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
    alignSelf: 'center',
    marginVertical: '5%'
  },
  tableContainer: {
    alignSelf: 'center',
    borderWidth: 4, 
    borderRadius: 5, 
    padding: 10,
    width: '85%',
  },
  row: {
    marginTop: '10%',
    borderBottomWidth: 3,
  },
  data: {
    fontSize: 20
  },
  tableHeader: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});