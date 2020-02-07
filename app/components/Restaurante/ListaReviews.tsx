import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button, Avatar, Rating} from 'react-native-elements';
// Firebase
import {firebaseApp} from '../../utils/Firebase';
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const ListaReviews = (props) => {
    const {navigation, idRestaurant, setRating} = props;
    const [reviews, setReviews] = useState([]);
    const [reviewsReload, setReviewsReload] = useState(false)
    
    useEffect(() => {
        (async () => {
            const resultReviews = [];
            const arrayRating = [];
            db.collection("reviews")
                .where("idRestaurant", "==" , idRestaurant)
                .get()
                .then( response => {
                    
                    response.forEach(doc => {                        
                        resultReviews.push(doc.data());
                        arrayRating.push(doc.data().rating);
                    });

                    let numSum = 0;
                    arrayRating.map(value => {
                        numSum = numSum + value;
                    });

                    const countRating = arrayRating.length;
                    const resultRating = numSum / countRating;

                    const resultRatingFinish = resultRating ? resultRating : 0;
                    setReviews(resultReviews);
                    // actualizo estrellas pag anterior
                    setRating(resultRatingFinish);
                });
            setReviewsReload(false);
        })()
        
    }, [reviewsReload])
    
    return (
        <View>
            <Button 
                titleStyle={styles.btnTitleAddReview}
                buttonStyle={styles.btnAddReview} 
                title="Escribir una opinión"
                icon={{
                  type: "material-community",
                  name: "square-edit-outline",
                  color: "#00a680"               
                }}
                onPress= { () => navigation.navigate("AddReviewRestaurant", { idRestaurant, setReviewsReload }) }
            ></Button>
            <Text>Lista de comentarios ... </Text>
        </View>
    )
}
const styles =  StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",

    },
    btnTitleAddReview: {
        color:"#00a680"
    }
});
export default ListaReviews
