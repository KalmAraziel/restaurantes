import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegistroForm from '../../components/Cuenta/RegistroForm';


const Registro = () => {
    return (
        <KeyboardAwareScrollView>
            <Image source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo} resizeMode="contain"
            />
            <View style={styles.viewForm} >
            <RegistroForm></RegistroForm>
            </View>         
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewForm: {
        marginLeft: 40,
        marginRight: 40
    }
});
export default Registro
