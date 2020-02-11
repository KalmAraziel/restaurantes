import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, ToastAndroid} from 'react-native';

import Carrusel from '../../components/Carrusel';
import { Rating, Icon, ListItem } from 'react-native-elements';
import Mapa from '../../components/Mapa';
import ListaReviews from '../../components/Restaurante/ListaReviews';

// Firebase
import {firebaseApp} from '../../utils/Firebase';
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const Restaurante = (props) => {   
    const {navigation} = props;
   
    const {restaurante} = navigation.state.params;    
    const [imagesRestaurant, setImagesRestaurant] = useState([]);
    const [rating, setRating] = useState(restaurante.rating)
    const [isFavorite, setIsFavorite] = useState(false);    
    const [userLogger, setUserLogger] = useState(false);
    
    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogger(true) : setUserLogger(false);
    });


    useEffect(() => {
        const arrayUrl = [];
        (async () => {
            await Promise.all(
                restaurante.images.map(async image => {                    
                    await firebase.storage().ref(`restaurant-images/${ image }`).getDownloadURL().then(result => {                                
                        arrayUrl.push(result);                       
                    });
                })
            );
            setImagesRestaurant(arrayUrl);
        })();
    }, []);
    
    useEffect(() => {
        if (userLogger) {
            db.collection("favorites")
            .where("idRestaurant", "==" , restaurante.id)
            .where("idUser", "==" , firebase.auth().currentUser.uid)
            .get()
            .then(resp => {
                if (resp.docs.length  === 1) {
                    setIsFavorite(true);
                }        
            })
        }
        
    }, [])

    const addFavorite = () => {   
        if(!userLogger) {
            ToastAndroid.showWithGravity('Inicia sesion para agregar a favoritos.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            const payload = {
                idUser: firebase.auth().currentUser.uid,
                idRestaurant: restaurante.id
            };
            db.collection("favorites").add(payload).then(resp => {
                setIsFavorite(true);
                ToastAndroid.showWithGravity('Restaurante agregegado a favoritos.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }).catch(() => {
                ToastAndroid.showWithGravity('Error al agregar el Restaurante a favoritos.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            });
        }                    
    }

    const removeFavorite = () => {
        db.collection("favorites")
        .where("idRestaurant", "==" , restaurante.id)
        .where("idUser", "==" , firebase.auth().currentUser.uid)
        .get().then(resp => {
            resp.forEach( doc => {
                const idFavorite = doc.id;
                db.collection("favorites")
                .doc(idFavorite)
                .delete().then( () => {
                    setIsFavorite(false);
                    ToastAndroid.showWithGravity('Restaurante removido de favoritos.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                }).catch(() => {
                    ToastAndroid.showWithGravity('Error al remover el Restaurante de favoritos.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                });
            });
        })

        setIsFavorite(false);
    }

    return (
        <ScrollView style={styles.viewBody}>     
            <View style={styles.viewFav}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart": "heart-outline"} 
                    onPress= { isFavorite ? removeFavorite : addFavorite  }
                    color={isFavorite? "#00a680": "#000"}
                    size={35}
                    underlayColor="transparent"
                ></Icon>
            </View>       
            <Carrusel arrayImages={imagesRestaurant} alto={200} ancho={Dimensions.get("window").width}></Carrusel>
            <TitleRestaurant
                name={restaurante.name} 
                description={restaurante.description} 
                rating={rating}
            >                    
            </TitleRestaurant>
            <RestaurantInfo location={restaurante.location} name={restaurante.name} address={restaurante.address}></RestaurantInfo>
            <ListaReviews navigation={navigation} idRestaurant={restaurante.id} setRating= {setRating} ></ListaReviews>
        </ScrollView>

    );
}

function TitleRestaurant(props) {
    const {name, description, rating} = props;
    return (
        <View style={styles.viewRestorantTitle}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.nameResto}>{name}</Text>
                <View style={styles.rating}>
                    <Rating                        
                        imageSize={20}
                        readonly
                        startingValue={parseFloat(rating)}
                    >
                   </Rating>
                </View>                              
            </View>
            <Text style={styles.descriResto}>{description}</Text>  
        </View>
    );
}

function RestaurantInfo(props) {
    const {location, name,address} = props;
    const listInfo = [{
        text: address,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
    }]

    return(
        <View style={styles.viewrestoInfo}>
            <Text style={styles.restoInfoTitle}>Información sobre el restaurante</Text>
            <Mapa location={location} name={name}>
            </Mapa>           
            {
                listInfo.map((item, index) => (
                    <ListItem 
                        key={index}
                        title= {item.text}
                        leftIcon={{name: item.iconName, type: item.iconType , color: "#00a680"}}
                        containerStyle={styles.containerListItem}
                    />                    
                ))
            }
        </View>
    );
}


const styles = StyleSheet.create({
    viewFav: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 5
    },
    viewBody:{
        flex: 1
    },
    viewRestorantTitle: {
        margin: 10
    },
    nameResto:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    rating:{
        position: "absolute",
        right: 0
    },
    descriResto:{
        marginTop: 5,
        color: "grey"
    },
    viewrestoInfo:{
        margin: 10,
        marginTop: 20
    },
    restoInfoTitle:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    containerListItem:{
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    }
});

export default Restaurante
