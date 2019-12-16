import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView,  } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';
import { validarEmail } from '../../utils/Validaciones';
import * as firebase from 'firebase';
const RegistroForm = (props) => {
    
    const { toastRef } = props;

    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepitPass, setHideRepitPass] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [repeatPassWord, setRepeatPassWord] = useState("")

    const register = async () => {
        if (!email || !password || !repeatPassWord) {
            console.log("Todos los campos son obligatorios"); 
            toastRef.current.props.position = "center";                               
            toastRef.current.show("Todos los campos son obligatorios");
            
        } else {
            if (!validarEmail(email)){
                console.log("el email no es correcto")
            } else {
                if (password  !== repeatPassWord) {
                    console.log("contraseñas no son iguales")
                } else {
                    console.log("Todo correcto: guardar registro")                     
                    await firebase.auth().createUserWithEmailAndPassword(email, password).then(
                        () => {
                            console.log("Usuario creado correctamente ");
                        }
                    ).catch(() => {
                        console.log("Error al crear la cuenta");
                    });
                }
            }
        }
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

export default RegistroForm
