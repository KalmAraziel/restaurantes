import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, withTheme } from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../components/Cuenta/InfoUser';
import AccountOptions from '../../components/AccountOptions';

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
        <View style= {styles.viewUserInfo}>
            <InfoUser userInfo={userInfo} setReloadData={setReloadData}></InfoUser>
            <AccountOptions></AccountOptions>
            <Button
                buttonStyle= {styles.btnCloseSession}
                titleStyle= {styles.btnCloseSessionText}
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
const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingBottom: 10,
        paddingTop: 10
    },
    btnCloseSessionText: {
        color: "#00a680"
    }
});
export default UsuarioLogeado
