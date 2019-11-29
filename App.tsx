import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import  Icon from 'react-native-vector-icons/FontAwesome'; 

export default function App() {
  
  return (
    <View style={styles.container}>
    <Text>5 Tenedores!</Text>
    
    <Button icon = {
      <Icon 
        name="glass" size={15} color="white" />      
      } 
      title="Boton  !"></Button>
    </View>
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
