import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { Table, Row, Rows } from 'react-native-table-component';

export default function Nutrients() {

//   const header = ['Nutrient', 'Amount'];
//   const data = [
//     ['Protein', '82g'],
//     ['Carbs', '65g'],
//     ['Fat', '22g'],
//     ['Energy', '46g'],
//     ['Sugars', '15g'],
//     ['Fibre', '49g'],
//     ['Vitamins', '60g'],
// ];

  return (
    // <View style={styles.container}>
    //   <View style={styles.tableContainer}>
    //     <Text style={styles.header}>Food Consumed</Text>
    //     <Table borderStyle={styles.tableBorder}>
    //       <Row
    //         data={header}
    //         style={styles.tableHeader}
    //         textStyle={styles.tableHeaderText}
    //       />
    //       <Rows data={data} textStyle={styles.tableRowText} />
    //     </Table>
    //   </View>
    // </View>
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
  // tableContainer: {
  //   marginTop: 40,
  //   alignSelf: 'center',
  //   width: 350
  // },
  header: {
    //width: 300,
    fontSize: 30,
    fontWeight: 'bold',
    //marginBottom: 15,
    color: 'white',
    alignSelf: 'center',
    marginVertical: '5%'
  },
  // tableBorder: {
  //   borderWidth: 2,
  //   borderColor: 'white',
  // },
  // tableHeader: {
  //   //backgroundColor: '#f2f2f2',
  //   height: 70,
  //   //borderBottomWidth: 2,
  //   //borderBottomColor: '#fff',
  // },
  // tableHeaderText: {
  //   fontSize: 25,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   alignSelf: 'center'
  // },
  // tableRowText: {
  //   fontSize: 16,
  //   color: 'white',
  //   alignSelf: 'center',
  //   padding: 15,
  //   height: 70,
  //   marginTop: 10,
  //   marginBottom: -10
  // },
  primaryHeader: {
    fontSize: 25,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    //padding: '8%'
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