import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity>
      <Ionicons name="ios-chatbox-ellipses" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
      <Foundation name="heart" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.icon}>
      <Ionicons name="ios-home" size={27} color="black" />
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <FontAwesome5 name="dumbbell" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
      <AntDesign name="star" size={27} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    //borderWidth: 1,
    //borderTopWidth: 1,
    height: 60,
    backgroundColor: '#fff',
    //borderRadius: 20,
    //borderTopLeftRadius: 30,
    //borderTopRightRadius: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    backgroundImage: 'linear-gradient(to bottom, #fff, #ddd)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    //paddingBottom: 20,
    marginBottom: 50,
    width: 368,
    alignSelf: 'center'

  },
  // navBarText: {
  //   fontSize: 17,
  //   borderColor: '#000',
  // },
  icon: {
    alignSelf: 'center',
    //paddingTop: 1,
  }
});

export default NavBar;