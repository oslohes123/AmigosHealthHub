/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import {
  View, StyleSheet, Text, SafeAreaView, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from '../../theme/themeContext';
import ChangeUserDetailsForm from '../ChangeUserDetail/forms/changeUserDetailsForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView: {
    alignItems: 'center',
    margin: '1%',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    margin: '2%',
  },
  body: {
    fontSize: 30,
  },
  button: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    margin: '2%',
    backgroundColor: '#3eda9b',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 26,
    marginLeft: '5%',
    marginTop: '1%',
  },

});

export default function Profile({ navigation }) {
  const theme = useContext(themeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={styles.iconView}>
        <Ionicons name="person-circle-outline" size={70} color={theme.color} />
      </View>

      {ChangeUserDetailsForm()}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Change password Pressed');
          navigation.navigate('Change User Password');
        }}
      >
        <Text style={styles.buttonText}>Change password</Text>
        <Ionicons name="ios-arrow-forward" size={32} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Delete account');
          navigation.navigate('Delete Account');
        }}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
        <Ionicons name="ios-arrow-forward" size={32} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
