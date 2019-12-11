import React from 'react'
import { StyleSheet ,View, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

function Invitados(props) {
    const { navigation } = props;
    return (
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image source={require("../../../assets/img/user-guest.jpg")} 
                style={styles.img}
                resizeMode="contain"
            />
            <Text style={styles.title}>Consulta tu Perfil</Text>
            <Text style={styles.descripion}>
                ¿Como describirias tu mejor restaurante? 
                Busca y visualiza los mejores
                restaurantes de una  forma sencilla, vota cual te ha gustado más y comparte como fue 
                tu experiencia
            </Text>
            
            <View style={styles.viewBtn}>
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Ver tu perfil"
                    onPress= {
                        () => navigation.navigate("Login")                        
                    }
                >

                </Button>
            </View>
        </ScrollView>
    )
}


export default withNavigation(Invitados);

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,

    },
    img: {
        height: 300,
        width: "100%",
        marginBottom: 40
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    },
    descripion: {
        textAlign: "center",
        marginBottom: 20
    },
    viewBtn: {
        flex: 1,
        alignItems: "center"
    },
    btnStyle: {
        backgroundColor: "#00a680"
    },
    btnContainer: {        
        width: "70%"
    }
});
