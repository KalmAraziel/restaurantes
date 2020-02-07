import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
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
    const [userLoger, setUserLoger] = useState(false);
    
    firebase.auth().onAuthStateChanged( user =>  {
        user ? setUserLoger(true) : setUserLoger(false);
    });
    
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
            {userLoger ? (
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
            ) : (
                <View >
                    <Text
                        onPress= { () => navigation.navigate("Login") } 
                        style={{textAlign: 'center', color: "#00a680", padding: 20}}
                    >
                        Para escribir un comentario es necesario estar logeado {" "}
                        <Text style={{fontWeight: 'bold'}}>
                            Pulsa aquí para iniciar session. 
                        </Text>
                    </Text>
                </View>
            ) }
            
            <FlatList
                data={reviews}
                renderItem={
                    review => 
                        <Review review={review}></Review>
                    
                }
                keyExtractor={(item,index) => index.toString() }
            >
            </FlatList>
        </View>
    )
}

function Review(props) {
    const {title, review, rating, createAt, idUser, idRestaurant, avataruser} = props.review.item;    
    const createReview = new Date(createAt.seconds * 1000);

    return (
        <View style={styles.viewReview}>
            <View style={styles.imageAvatar}>
                <Avatar 
                    size="large"
                    rounded
                    containerStyle={styles.imgAvatarUser}
                    source={ {uri: avataruser ? avataruser : "https://api.adorable.io/avatars/285/abott@adorable.png"} }
                >

                </Avatar>
            </View>
            <View style={styles.info}>
                <Text style={styles.reviewtitle}>{title}</Text>
                <Text style={styles.reviewText}>{title}</Text>
                <Rating imageSize={15} startingValue={rating} readonly></Rating>
                <Text style={styles.reviewDate}>
                    {createReview.getDate() }/{createReview.getMonth()+1 }/{createReview.getFullYear()}
                     - 
                    {createReview.getHours()}:{createReview.getMinutes() < 10 ? "0" : '' }{createReview.getMinutes()}: {createReview.getSeconds() < 10 ? "0" : '' }{createReview.getSeconds()}
                    </Text>
            </View>
        </View>
    )
}
const styles =  StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",

    },
    btnTitleAddReview: {
        color:"#00a680"
    },
    viewReview: {
        flexDirection: 'row',
        margin: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    imageAvatar: {
        marginRight: 15,
    },
    imgAvatarUser: {
        width: 50,
        height: 50
    },
    info: {
        flex: 1,
        alignItems: 'flex-start'
    },
    reviewtitle: {
        fontWeight: 'bold'
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
});
export default ListaReviews
