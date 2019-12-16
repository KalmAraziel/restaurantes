import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

const UsuarioLogeado = () => {
    return (
        <View>
            <Text>Usuario Logeado</Text>
            <Button 
                title="Cerrar Sesion"
                onPress= { 
                    () => {
                        firebase.auth().signOut();
                    }
                }
            />
        </View>
    )
}

export default UsuarioLogeado
