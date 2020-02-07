import React, { useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { AirbnbRating, Button , Input} from 'react-native-elements';
import Loading from '../Loading';
//Firebase 
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function AddReviewRestaurant(props) {
    const { navigation } = props;
    const {idRestaurant, setReviewsReload} = navigation.state.params;
    const [rating, setRating] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [comentario, setComentario] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    
    const addReview = () => {
        if (rating === null) {
            ToastAndroid.showWithGravity('No has dado una puntuación', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!titulo) {
            ToastAndroid.showWithGravity('El titulo es obligatorio', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }else if (!comentario) {
            ToastAndroid.showWithGravity('El comentario es obligatorio', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            // correcto
            setIsVisible(true);
            const user = firebase.auth().currentUser;            
            const payload = {
                idUser: user.uid,
                avataruser: user.photoURL,
                idRestaurant: idRestaurant,
                title: titulo,
                review: comentario,
                rating: rating,
                createAt: new Date()
            }

             db.collection("reviews").add(payload).then( () =>  {
                updateRestaurant();                
             }).catch(e => {
                ToastAndroid.showWithGravity('Error al guardar el comentario.', ToastAndroid.SHORT, ToastAndroid.CENTER);
             });
            
        }
    }

    const updateRestaurant = () => {
        
        const restRef = db.collection("restaurants").doc(idRestaurant);
        restRef.get().then(resp => {
            const restoData = resp.data();
            const ratingTotal = restoData.ratingTotal + rating;
            const quantityVoting = restoData.quantityVoting + 1;
            const ratingResult = ratingTotal / quantityVoting;
            restRef.update({rating: ratingResult, ratingTotal, quantityVoting}).then(() => {
                setIsVisible(false);
                setReviewsReload(true);
                navigation.goBack();
                ToastAndroid.showWithGravity('Comentario guardado correctamente', ToastAndroid.SHORT, ToastAndroid.CENTER);
            });
        });
    }
    return (
        <View style={styles.viewBody}>
            <Loading isVisible={isVisible}></Loading>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Pésimo", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={ value => setRating(value) }
                >

                </AirbnbRating>
            </View>
            <View style={styles.formReview}>
                <Input 
                    containerStyle= {styles.input}
                    placeholder="Titulo"
                    onChange={ e => setTitulo(e.nativeEvent.text) }
                />            
                <Input 
                    inputContainerStyle= {styles.textArea}
                    placeholder="Comentario"
                    multiline={true}
                    onChange={ e => setComentario(e.nativeEvent.text) }
                />    
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    onPress={ addReview }
                    buttonStyle={styles.btn}
                ></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRating: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    formReview:{
        margin: 10,
        marginTop: 40,
        flex: 1,
        alignItems: 'center'
    },
    input: {
        marginBottom: 10

    },
    textArea:{
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0,

        
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        width: "95%"

    },
    btn: {
        backgroundColor: "#00a680"
    }
});
