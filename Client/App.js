import MainContainer from './navigation/MainContainer';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [showMainPage, setShowMainPage] = useState(false);

  return (
    <View style={{flex: 1}}>
      {showMainPage ? (<MainContainer />) :
      (
        <View style={styles.animation}>
          <LottieView 
            source={require('./assets/animation.json')} 
            autoPlay 
            loop={false}
            speed={2}
            onAnimationFinish={() => setShowMainPage(true)} 
          />
          <Text style={styles.text}>HEALTH HUB</Text>
        </View>
      )}
    </View>
    // <MainContainer />
  );
  
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 500,
  },
  animation: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#00BFFF',
  }
})