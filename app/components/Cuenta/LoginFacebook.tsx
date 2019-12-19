import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { SocialIcon } from 'react-native-elements'
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';

const LoginFacebook = () => {
    const permissions: Facebook.FacebookOptions = { 
    permissions:             
        FacebookApi.permissions
    };
    
    async function LoginFacebook() {
        try {
          await Facebook.initializeAsync(null, null);
          const result = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (result.type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    async function log() {
        
        
            
        
    };

    return (
       <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={() => {LoginFacebook()}}
       >
           
       </SocialIcon>
    )
}

export default LoginFacebook
