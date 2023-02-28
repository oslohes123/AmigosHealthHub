// import React, {useContext} from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // import { Feather } from '@expo/vector-icons';
// import themeContext from '../../../theme/themeContext';

// export default function Header() {

//   const theme = useContext(themeContext)

//   return (
//     <View >
//       <Text style={[styles.title, {color:theme.color}]}>Calories Remaining</Text>
//       <Text style={[styles.number, {color:theme.color}, {borderColor:theme.color}]}>35</Text>
//       {/* <View style={styles.icon}>
//         <TouchableOpacity>
//         <Feather name="settings" size={24} color="white" onPress={pressHandler}/>
//         </TouchableOpacity>
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // header: {
//   //   height: 80,
//   //   paddingTop: 38,
//   //   backgroundColor: 'chartreuse',
//   //   //flexDirection: 'row',
//   // },
//   title: {
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 25,
//     fontWeight: 'bold',
//     paddingTop: 20,
//     paddingBottom: 10,
//     marginTop: 1,
//   },
//   number: {
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 25,
//     fontWeight: 'bold',
//     paddingTop: 10,
//     // borderColor: 'white',
//     borderStyle: 'solid',
//     borderWidth: 2,
//     paddingBottom: 5,
//     width: 50,
//     alignSelf: 'center',
//   },
//   // icon: {
//   //   position: 'absolute',
//   //   top: 27,
//   //   right: 20,
//   // }
// });