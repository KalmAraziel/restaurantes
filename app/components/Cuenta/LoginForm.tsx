import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';
import { validarEmail } from '../../utils/Validaciones';
import Loading from '../Loading';
import * as firebase from 'firebase';
import { withNavigation } from 'react-navigation';


const LoginForm = (props) => {
    console.log('Props: ', props);
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const Alerta = (titulo: string, creadro?: boolean) => {
        Alert.alert(
            titulo,
            '',
            [
                {
                    text: 'Aceptar',
                    onPress: () => {
                        if (creadro) {

                        } else {
                            console.log('OK press');
                        }
                    }
                }
            ],
            { cancelable: false });
    }

    const login = async () => {
        setShowLoading(true);

        if (!email || !password) {
            // console.log("Todos los campos son obligatorios"); 
            Alerta("Todos los campos son obligatorios");
        } else {
            if (!validarEmail(email)) {                
                Alerta("El Email no es correcto");
            } else {                
                await firebase.auth().signInWithEmailAndPassword(email, password).then(
                    () => {                        
                        setShowLoading(false);                        
                        navigation.navigate("Cuenta");
                    }
                ).catch((e) => {
                    console.error(e);
                    setShowLoading(false);
                    Alerta("Error al iniciar sesion");
                });
            }
        }

        setShowLoading(false);
    };

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Email"                
                containerStyle={styles.inputform}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={
                    (e) => {
                        setEmail(e.nativeEvent.text)
                    }
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputform}
                textContentType="newPassword"
                secureTextEntry={hidePassword}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.iconRight}
                    />
                }

            />
            <Button containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                title="Iniciar Sesion"
                onPress={() => login()}
            ></Button>
            <Loading isVisible= {showLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputform: {
        width: '100%',
        marginTop: 20,

    },
    iconRight: {
        color: '#c1c1c1',
    },

    btnContainerLogin: {
        marginTop: 20,
        width: '95%'
    },
    btnLogin: {
        backgroundColor: "#00a680"
    }
});

export default withNavigation( LoginForm);

