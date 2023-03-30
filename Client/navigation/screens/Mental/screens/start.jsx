import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions,
} from 'react-native';
import React, { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import themeContext from '../../../theme/themeContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App({ navigation }) {
  const { background } = useContext(themeContext);

  const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
      width: screenWidth * 0.95,
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    widget: {
      padding: 20,
      borderRadius: 25,
      width: screenWidth * 0.45,
      height: screenHeight * 0.2,
      alignSelf: 'center',
      alignItems: 'center',
    },
    header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
  });

  // components for the screen
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.view}>
        <TouchableOpacity testID="reviewPast" onPress={() => navigation.navigate('Mental History')}>
          <LinearGradient
            colors={['blue', 'grey']}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.header}>
              Mental History

            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity testID="reviewDay" onPress={() => navigation.navigate('Review Your Day')}>
          <LinearGradient
            colors={['blue', 'grey']}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.header}>
              Review Your Day

            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
