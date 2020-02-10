import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

const CambiarNombreForm = (props) => {
    const {userInfo, setIsVisibleModal, setReloadData } = props;
    const [nombre, setNombre] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);        
    
    const updateName = async () => {
        setError(null);
        if(!nombre ) {
            setError("El nombre del usuario es obligatorio");
        } else {
            setIsLoading(true);
            const update = {
                displayName: nombre
            }

            await firebase.auth().currentUser.updateProfile(update).then( () => {
                setIsLoading(false);               
                Alert.alert("Nombre Actualizado correctamente");
                setIsVisibleModal(false);
                setReloadData(true);
            }).catch(
                () => {
                    setError("Error al actualizar nombre");
                    setIsLoading(false);
                }
            );
        }
        setIsVisibleModal(false);
    }
    return (
        <View style={styles.viewContent}>
            <Text>Cambiar Nombre</Text>
            <Input
                placeholder="Nombre"
                containerStyle= {styles.input}
                defaultValue={userInfo.displayName}
                onChange= {(e) => setNombre(e.nativeEvent.text)}
                rightIcon= {{
                    type: "material-community",                    
                    name:"account-circle-outline",
                    color: "#c2c2c2"
                }}
                errorMessage = {error}
            />            
            <Button
                title="Actualizar Nombre"
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btnStyle}
                onPress ={updateName}
                loading={isLoading}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContent: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    containerBtn:{
        marginTop:20,
        width:"75%"

    },
    btnStyle:{
        backgroundColor:"#00a680"
    }
});

export default CambiarNombreForm
