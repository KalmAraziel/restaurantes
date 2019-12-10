import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './app/navigation/Navigation';
import firebase from 'firebase/app';
import {firebaseConfig} from './app/utils/Firebase.js';

export default function App() {
  // inicio firebase
  firebase.initializeApp(firebaseConfig);

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
