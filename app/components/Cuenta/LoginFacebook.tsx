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
