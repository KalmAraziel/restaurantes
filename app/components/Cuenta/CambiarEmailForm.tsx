import React, { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Input, Button } from 'react-native-elements';
// import { reLogin } from '../../utils/Api';
// import { validarEmail } from '../../utils/Validaciones';

const CambiarEmailForm = (props) => {    
    const {userInfo, setIsVisibleModal, setReloadData } = props;
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState( { email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);        
    const [hidePassword, setHidePassword] = useState(true)
    const updateEmail = async () => {
        setError({ email: "", password: "" });                
        if (!email || email === userInfo["email"]) {
            setError({
                email: "El email no puede ser igual o vacio",
                password: ""
            });
        } else {
            setIsLoading(true);
            await (password).then( () => {
                
                firebase.auth().currentUser.updateEmail(email).then(() => {
                    setIsLoading(false);
                    setReloadData(true);
                    Alert.alert("Email actualizado correctamente");
                    setIsVisibleModal(false);
                }).catch(e => {
                    setError({
                        email: "Error al cambiar el email",
                        password: ""
                    });
                    setIsVisibleModal(false);
                });

            }).catch(() => {                
                setError({
                    password: "la contraseña no es valida",
                    email: ""
                });
                setIsVisibleModal(false);
                setIsLoading(false);
            });
        }
        setIsVisibleModal(false);
    }

    return (
        <View style= {styles.viewStyle}>
            <Input 
                containerStyle={styles.input}
                placeholder="Correo electronico"
                defaultValue={userInfo.email}
                onChange={ (e) => setEmail(e.nativeEvent.text) }
                rightIcon= {{
                    type: "material-community",                    
                    name:"at",
                    color: "#c2c2c2"
                }}
                errorMessage= {error.email}
            />
            <Input 
                containerStyle={styles.input}
                placeholder="Contraseña"
                secureTextEntry= {hidePassword}
                onChange={ (e) => setPassword(e.nativeEvent.text) }
                rightIcon= {{
                    type: "material-community",                    
                    name: hidePassword? "eye-outline" : "eye-off-outline" ,
                    color: "#c2c2c2",
                    onPress: () => setHidePassword(!hidePassword)
                }}
                errorMessage= {error.password}
            />
            <Button
                title="Actualizar Email"
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btnStyle}
                onPress ={updateEmail}
                loading={isLoading}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    input:{
        marginBottom: 10,
        marginTop: 10
        
    },
    containerBtn:{
        marginTop:20,
        width:"75%"

    },
    btnStyle:{
        backgroundColor:"#00a680"
    }
});

export default CambiarEmailForm
