import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView,  } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';

const RegistroForm = () => {
    const register = () => {

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
                onChange={() => console.log("email actualizado")} 
            />
            <Input 
                placeholder="Contraseña" 
                textContentType="newPassword"
                secureTextEntry={true}                
                containerStyle={styles.inputForm} 
                rightIcon= {
                    <Icon 
                        type="material-community"
                        name="eye-outline"
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={() => console.log("constraseña actualizado")} 
            />
            <Input 
                placeholder="Repetir Contraseña" 
                textContentType="newPassword"
                secureTextEntry={true}                
                containerStyle={styles.inputForm} 
                rightIcon= {
                    <Icon 
                        type="material-community"
                        name="eye-outline"
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={() => console.log("repetir contra")} 
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
