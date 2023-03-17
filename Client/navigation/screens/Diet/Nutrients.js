import React, {useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import themeContext from '../../theme/themeContext';
import { DataTable } from 'react-native-paper';

export default function Nutrients({ route, navigation}) {

  const theme = useContext(themeContext)
  const data = route.params;

  // const dataItems =  data.map((item,index) => {
  //   return (
  //     <View key = {index} style={styles.primaryView}>
  //       <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>{item.name}</Text>
  //       <Text style={[styles.text, { color: theme.color }, {borderColor: theme.color}]}>{item.amount}</Text>
  //     </View>

  //   )
  // })


  // return (
  //   <View style={[styles.container, { backgroundColor: theme.background }]}>
  //     <Text style={[styles.header, { color: theme.color }, {borderColor: theme.color}]}>Nutrients Consumed</Text>
      
  //     <View style={styles.primaryView}>
  //       <Text style={[styles.primaryHeader, { color: theme.color }, {borderColor: theme.color}]}>Nutrient</Text>
  //       <Text style={[styles.primaryHeader, { color: theme.color }, {borderColor: theme.color}]}>Amount</Text>
  //     </View>
  //     {dataItems}

  //   </View>
  // );
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.color }, {borderColor: theme.color}]}>Nutrients Consumed</Text>
      <View style={styles.tableContainer}>
      <DataTable >
        <DataTable.Header style={{borderBottomWidth: 5, borderBottomColor: 'black'}}>
          <DataTable.Title style={{ flex: 1.5}}>Nutrient</DataTable.Title>
          <DataTable.Title style={{ flex: 1}}>Amount</DataTable.Title>
        </DataTable.Header>
    
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{ flex: 1.5,}}>item.name</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>item.amount</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{ flex: 1.5 }}>item.name</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>item.amount</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{ flex: 1.5 }}>item.name</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>item.amount</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{ flex: 1.5 }}>item.name</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>item.amount</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{ flex: 1.5 }}>item.name</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>item.amount</DataTable.Cell>
        </DataTable.Row>

      </DataTable>
    </View>
    </View>
    
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'white',
//     alignSelf: 'center',
//     marginVertical: '5%'
//   },
//   primaryHeader: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     borderWidth: 2,
//     width: '70%',
//     paddingVertical: '13%',
//   },
//   primaryView: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between',
//     marginHorizontal: '20%',
//     alignSelf: 'center',
//   },
//   text: {
//     fontSize: 20,
//     borderWidth: 2,
//     width: '70%',
//     paddingVertical: '7%',
//   }
// });

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
    width: '80%',
  },
  row: {
    marginTop: '10%',
    borderBottomWidth: 3,
  }
});