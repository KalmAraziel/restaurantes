import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import { Input, Button } from 'react-native-elements';
import { reLogin } from '../../utils/Api';
import * as firebase from 'firebase';
const CambiarPasswordForm = (props) => {
    const { setIsVisibleModal } = props;
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")    
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("")    
    const [error, setError] = useState( { password: "", newPass: "" , newPassRepeat: ""})
    const [isLoading, setIsLoading] = useState(false)        
    
    const [visiblePassword, setVisiblePassword] = useState(true)
    const [visibleNewPassword, setVisibleNewPassword] = useState(true)
    const [visibleNewPasswordRepeat, setVisibleNewPasswordRepeat] = useState(true)
    const updatePassword = async () => {
        setError({ password: "", newPass: "", newPassRepeat: "" });       
        if (!password || !newPassword || !newPasswordRepeat) {
            console.log("aqui!!! 1");
            let objectError = { password: "", newPass: "" , newPassRepeat: ""};
            !password && (objectError.password = "No puede estar vacio");
            !newPassword && (objectError.newPass = "No puede estar vacio");
            !newPasswordRepeat && (objectError.newPassRepeat = "No puede estar vacio");
            setError(objectError);
        }         
        else {
            console.log("aqui!!! 2");
            if (newPassword !== newPasswordRepeat){
                setError(
                    { 
                        password: "", 
                        newPass: "Las nuevas contraseñas deben ser iguales" ,                 
                        newPassRepeat: "Las nuevas contraseñas deben ser iguales"
                    }
                );
                Alert.alert("Las nuevas contraseñas deben ser iguales");
            } else {
                setIsLoading(true);
                
                await reLogin(password).then( () => {
                    firebase.auth().currentUser.updatePassword(newPassword).then( () => {
                        setIsLoading(false);
                        Alert.alert("Contraseña actualizada correctamente");
                        setIsVisibleModal(false);
                        firebase.auth().signOut();

                    }).catch( () => {
                        setError(
                            { 
                                password: "Error al cambiar la contraseña", 
                                newPass: "" ,                 
                                newPassRepeat: ""
                            }
                        )
                        setIsLoading(false);
                    });
                }).catch( () => {
                    setError(
                        { 
                            password: "La contraseña no es correcta", 
                            newPass: "" ,                 
                            newPassRepeat: ""
                        }
                    )
                    setIsLoading(false);
                });
            }
        }
    }

    return (
        <View style={styles.viewStyle}>
            <Input 
                containerStyle={styles.input}
                placeholder="Contraseña actual"
                secureTextEntry= {visiblePassword}
                onChange={ (e) => setPassword(e.nativeEvent.text) }
                rightIcon= {{
                    type: "material-community",                    
                    name: visiblePassword? "eye-outline" : "eye-off-outline" ,
                    color: "#c2c2c2",
                    onPress: () => setVisiblePassword(!visiblePassword)
                }}
                errorMessage= {error.password}
            ></Input>

            <Input 
                containerStyle={styles.input}
                placeholder="Nueva Contraseña"
                secureTextEntry= {visibleNewPassword}
                onChange={ (e) => setNewPassword(e.nativeEvent.text) }
                rightIcon= {{
                    type: "material-community",                    
                    name: visibleNewPassword? "eye-outline" : "eye-off-outline" ,
                    color: "#c2c2c2",
                    onPress: () => setVisibleNewPassword(!visibleNewPassword)
                }}
                errorMessage= {error.newPass}
            ></Input>

            <Input 
                containerStyle={styles.input}
                placeholder="Repetir Nueva Contraseña"
                secureTextEntry= {visibleNewPasswordRepeat}
                onChange={ (e) => setNewPasswordRepeat(e.nativeEvent.text) }
                rightIcon= {{
                    type: "material-community",                    
                    name: visibleNewPasswordRepeat? "eye-outline" : "eye-off-outline" ,
                    color: "#c2c2c2",
                    onPress: () => setVisibleNewPasswordRepeat(!visibleNewPasswordRepeat)
                }}
                errorMessage= {error.newPassRepeat}
            ></Input>
            
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btnStyle}
                onPress ={updatePassword}
                loading={isLoading}
            ></Button>
            <Text>
                {error.password}
            </Text>
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

export default CambiarPasswordForm
