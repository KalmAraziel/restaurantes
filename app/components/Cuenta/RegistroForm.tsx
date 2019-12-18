import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert,  } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';
import { validarEmail } from '../../utils/Validaciones';
import * as firebase from 'firebase';
import Loading from '../Loading';
import { withNavigation } from 'react-navigation';


const RegistroForm = (props) => {
    
    const { navigation } = props;

    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepitPass, setHideRepitPass] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [repeatPassWord, setRepeatPassWord] = useState("")
    const [creandoCuenta, setCreandoCuenta] = useState(false);
    
    const Alerta = (titulo: string, creadro?: boolean) => {        
        Alert.alert(
            titulo,
            '',
            [
                {
                    text: 'Aceptar', 
                    onPress: () => {
                        if(creadro){
                           
                        } else {
                            console.log('OK press');
                        }
                    }
                }
            ],
            {cancelable: false});        
    }


    const register = async () => {
        setCreandoCuenta(true) ;
        if (!email || !password || !repeatPassWord) {
            console.log("Todos los campos son obligatorios"); 
            Alerta("Todos los campos son obligatorios");            
        } else {
            if (!validarEmail(email)){
                console.log()
                Alerta("El Email no es correcto");
            } else {
                if (password  !== repeatPassWord) {
                    console.log("contraseñas no son iguales")
                    Alerta("Las contraseñas no son iguales");
                } else {
                    console.log("Todo correcto: guardar registro")                     
                    await firebase.auth().createUserWithEmailAndPassword(email, password).then(
                        () => {
                            console.log();
                            setCreandoCuenta(false);
                            navigation.navigate("Cuenta");
                        }
                    ).catch(() => {     
                        setCreandoCuenta(false);               
                        Alerta("Error al crear usuario");
                    });
                }
            }

        }
        setCreandoCuenta(false);
    };

    return (
        <KeyboardAvoidingView  style={styles.formContainer} behavior="padding" enabled>
            <Input 
                placeholder="Email" 
                containerStyle={styles.inputForm} 
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
                textContentType="newPassword"
                secureTextEntry={ hidePassword }                
                containerStyle={styles.inputForm} 
                rightIcon= {
                    <Icon 
                        type="material-community"
                        onPress={ () => setHidePassword(!hidePassword) }
                        name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={
                    (e) => {
                        setPassword(e.nativeEvent.text)
                    }
                } 
            />
            <Input 
                placeholder="Repetir Contraseña" 
                textContentType="newPassword"
                secureTextEntry={hideRepitPass}                
                containerStyle={styles.inputForm} 
                rightIcon= {
                    <Icon 
                        type="material-community"
                        onPress={ () => setHideRepitPass(!hideRepitPass) }
                        name={hideRepitPass ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={
                    (e) => {
                        setRepeatPassWord(e.nativeEvent.text)
                    }
                } 
            />
            <Button 
                containerStyle={styles.btnContainerRegister}
                title= "Registrarse"
                buttonStyle= {styles.btnregister}
                onPress={() => register() } 
            />
            <Loading isVisible={creandoCuenta} > </Loading>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },

    iconRight: {
        color: "#c1c1c1",

    },
    btnregister:{
        backgroundColor: "#00a680",
        marginBottom: 10
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%"

    }
});

export default withNavigation( RegistroForm);
