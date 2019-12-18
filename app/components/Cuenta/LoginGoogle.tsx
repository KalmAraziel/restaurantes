import React from 'react'
import { View, Text } from 'react-native'
import { SocialIcon } from 'react-native-elements'

const LoginGoogle = () => {
    const LoginFacebook = () => {
        console.log("incio session google")
    }
    return (
       <SocialIcon
        title="Iniciar sesión con Google"
        button
        type="google"
        onPress={() => {LoginGoogle()}}
       >
           
       </SocialIcon>
    )
}

export default LoginGoogle
