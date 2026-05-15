// src/components/AppLogo.tsx

import React from 'react';

import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import {
  scale,
  verticalScale,
} from '../utils/responsive';

export default function AppLogo() {
  return (
    <View style={styles.container}>
      {/* Replace with your logo path */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Skyline Background */}
      {/* <Image
        source={require('../assets/images/skyline.png')}
        style={styles.skyline}
        resizeMode="contain"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
  },

  logo: {
    width: scale(170),

    height: verticalScale(50),
  },

  skyline: {
    width: scale(500),
    
    height: verticalScale(90),

    

   
  },
});