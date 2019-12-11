import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase';
import { View, Text } from 'react-native';
import Loading from '../../components/Loading';
import UsuarioLogeado from './UsuarioLogeado';
import Invitados from './Invitados';


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
            <Loading isVisible={true} ></Loading>
        )
    }
  
    return login ? <UsuarioLogeado /> : <Invitados />;
}
