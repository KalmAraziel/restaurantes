import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './app/navigation/Navigation';
// inicio firebase
import {firebaseApp} from './app/utils/Firebase';
// para sacar el warning del timeout
import { YellowBox } from 'react-native';
import _ from 'lodash';

export default function App() {   
  // sacar el warning del timeout
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  }; 
  // sacar el warning del timeout
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
