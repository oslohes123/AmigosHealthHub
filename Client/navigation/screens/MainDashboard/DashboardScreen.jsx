import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import HoursSleptGraph from '../Sleep/hoursSleptGraph';
import themeContext from '../../theme/themeContext';
import { useAuthContext } from '../Authentication/context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const { user } = useAuthContext();
  const theme = useContext(themeContext);

  const welcomeMessage = `Welcome to your Dashboard, ${user.firstName} `;
  const background = { backgroundColor: theme.background };
  const textColour = { color: theme.color };

  const handlePress = () => {
    navigation.navigate('Sleep');
  };

  return (
    <SafeAreaView style={[styles.container, background]}>
      <Text style={[styles.title, textColour]}>{welcomeMessage}</Text>
      <SafeAreaView style={styles.widgetContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Sleep')}>
          <View style={styles.graphContainer}>
            <HoursSleptGraph />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  widgetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 30,
  },
  graphContainer: {
    position: 'relative',
  },
});
