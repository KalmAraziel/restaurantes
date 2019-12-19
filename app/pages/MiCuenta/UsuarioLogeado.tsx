import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../components/Cuenta/InfoUser';

const UsuarioLogeado = () => {
    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    useEffect(() => {
        (async() => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        setReloadData(false);
    },[reloadData]);

    return (
        <View>
            <InfoUser userInfo={userInfo} setReloadData={setReloadData}></InfoUser>
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
