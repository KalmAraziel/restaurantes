import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './app/navigation/Navigation';
// inicio firebase
import {firebaseApp} from './app/utils/Firebase.js';

export default function App() {    
  return (
    <Navigation></Navigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
