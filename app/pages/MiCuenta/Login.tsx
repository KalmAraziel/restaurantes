import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Divider, Image } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import LoginForm from '../../components/Cuenta/LoginForm';
import LoginFacebook from '../../components/Cuenta/LoginFacebook';
import LoginGoogle from '../../components/Cuenta/LoginGoogle';

const Login = (props) => {
    const {navigation} = props;
    console.log(navigation);
    return (
        <ScrollView>
            <Image source={ require("../../../assets/img/5-tenedores-letras-icono-logo.png") }
            style={styles.logo}
            resizeMode="contain"
            />
            <View
                style={styles.viewContainer}
            >
                <LoginForm></LoginForm>
                <CrearCuenta navigation= {navigation}></CrearCuenta>
            </View>
            <Divider style={styles.divider}></Divider>
            <View style={styles.viewContainer}>                
            </View> 
        </ScrollView>       
    )
}
// componentes siempre en mayuscula
function CrearCuenta(props){
    const {navigation} = props;
    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta? {" "}
            <Text style={styles.btnRegister} 
                onPress={ () => navigation.navigate("Register")}
            >
                Regístrarse
            </Text>
        </Text>
    );
    

};

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 30
    },
    viewContainer: {
        marginLeft: 40,
        marginRight: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    divider: {
        backgroundColor: "#00a680",
        marginBottom: 30,
        marginTop: 10,
        borderColor: "#00a680"
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold"
    }
    
});
export default Login
