import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
      <View style={styles.watermarkContainer} pointerEvents="none">
        <Image source={require('./assets/logo.png')} style={styles.watermarkLogo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  watermarkContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    opacity: 0.15,
  },
  watermarkLogo: { width: 60, height: 60, resizeMode: 'contain' }
});

