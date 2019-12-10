import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase';
import { View, Text } from 'react-native';


export default function Cuenta() {
    const [login, setLogin] = useState<boolean>(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log('usuario: ', user);
            !user ? setLogin(false) : setLogin(true);
        });
    }, [])

    if (login === null) {
        return (
            <View>
                <Text>Carando...</Text>
            </View>
        )
    }

    if (login) {
        return (
            <View>
                <Text>Usuario Logeado...</Text>
            </View>
        )
    }

    return (
        <View>
            <Text>Usuario no Logeado...</Text>
        </View>
    )
}
