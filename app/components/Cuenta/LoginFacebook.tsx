import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { SocialIcon } from 'react-native-elements'
import * as Facebook from 'expo-facebook';
 import * as firebase from 'firebase';
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';
import { withNavigation } from 'react-navigation';

const LoginFacebook = (props) => {
  const {navigation} = props;
    const permissions: Facebook.FacebookOptions = { 
    permissions:             
        FacebookApi.permissions
    };
    
    async function loginFacebook() {

      try {
        const {
          type,
          token
        } = await Facebook.logInWithReadPermissionsAsync(FacebookApi.application_id, {
          permissions: ['public_profile'],
        });
        
        if (type === 'success') {
          const credenciales = firebase.auth.FacebookAuthProvider.credential(token);
          await firebase.auth().signInWithCredential(credenciales).then( () => {
            console.log('login correcto');
            // redirect
            navigation.navigate("Cuenta");
          });
        } else if (type === 'cancel') {
          console.log('cancelado');
        }
      } catch ({ message }) {
        alert(`Error al intentar inisiar sesión con Facebook ${message}`);
      }        
    }    

    return (
       <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={() => {loginFacebook()}}
       >
           
       </SocialIcon>
    )
}

export default withNavigation(LoginFacebook);
