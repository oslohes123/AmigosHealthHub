// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import {Table, Row, Rows} from 'react-native-table-component';

// const header = ['Nutrient', 'Amount']
// const data = [
//     ['Protein', '20g'],
//     ['Carbohydrate', '15g'],
//     ['Fat', '5g'],
//   ];

// export default function Nutrients() {
//     return (
//         <View style={styles.container}>
//         <View >
//             <View style={{ marginTop: 200 }}>
//             <Text style={{ fontSize: 20, alignSelf: 'center' }}>
//                  Table</Text>
//             <Table borderStyle={{ borderWidth: 2,
//                 borderColor: 'black' }}>
//                 <Row data={header} />
//                 <Rows data={data} />
//             </Table>
//         </View>
//         </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'darkcyan',
//         flex: 1
//     },
//     table: {
//         marginTop: 50,
//         borderWidth: 2,
//         borderColor: '#c8e1ff',
//         alignSelf: 'center',
//     },
//     header: {
//         height: 50,
//         backgroundColor: '#f1f8ff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#0b7eff',
//     },
//     row: {
//         height: 40,
//         backgroundColor: '#f9f9f9',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: 16,
//     },
//     text: {
//         fontSize: 18,
//         marginTop: 20,
//         alignSelf: 'center',
//     },
// })


import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const header = ['Nutrient', 'Amount'];
const data = [
  ['Protein', '82g'],
  ['Carbohydrate', '65g'],
  ['Fat', '22g'],
  ['Energy', '46g'],
  ['Sugars', '15g'],
  ['Fibre', '49g'],
  ['Vitamins', '60g'],
];

export default function Nutrients() {
  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Text style={styles.header}>Nutrients Consumed</Text>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={header}
            style={styles.tableHeader}
            textStyle={styles.tableHeaderText}
          />
          <Rows data={data} textStyle={styles.tableRowText} />
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C1E3F',
    flex: 1,
  },
  tableContainer: {
    marginTop: 50,
    alignSelf: 'center',
    width: 350
  },
  header: {
    width: 300,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    alignSelf: 'center'
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: 'white',
  },
  tableHeader: {
    //backgroundColor: '#f2f2f2',
    height: 70,
    //borderBottomWidth: 2,
    //borderBottomColor: '#fff',
  },
  tableHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  tableRowText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    padding: 15,
    height: 70,
    marginTop: 10,
    marginBottom: -10
  },
});