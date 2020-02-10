import React, {useState, useEffect , useRef} from 'react'
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, FlatList, Text, Alert, ToastAndroid } from 'react-native';
import { Image, Icon, } from 'react-native-elements';
// Components 
import Loading from '../components/Loading';

// Firebase

import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseApp } from '../utils/Firebase';


const db = firebase.firestore(firebaseApp);

export default function Favoritos(props) {
    const { navigation } = props;

    const [restaurants, setRestaurants] = useState([]);
    const [reloadRestourant, setReloadRestourant] = useState(false);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    //ToastAndroid.showWithGravity('Todos los campos son obligatorios', ToastAndroid.SHORT, ToastAndroid.CENTER);

   
    useEffect(  ()  => {
       const idUser = firebase.auth().currentUser.uid;      
       db.collection("favorites")
       .where("idUser", "==" , idUser)
       .get()
       .then(response => {
           const idResturants =[]; 
           response.forEach(doc => {
            idResturants.push(doc.data().idRestaurant);
           });
           getDataRestaurant(idResturants).then( (response) => {
            const arrayRestos = [];
            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id =  doc.id;
                arrayRestos.push(restaurant);
                setRestaurants(arrayRestos);
            });

           });
       });

       setReloadRestourant(false);
    }, [reloadRestourant]);


    const getDataRestaurant = (idRestaurans) => {
        const arrayRestaurant = [];
        
        idRestaurans.forEach(idResto => {
            const result = db.collection("restaurants").doc(idResto).get();
            arrayRestaurant.push(result);
        });
                 
        return Promise.all(arrayRestaurant);
    };

    return (
        <View>
            {restaurants ? (
                <FlatList
                    data={restaurants}
                    renderItem= { restaurant => 
                        (
                            <Restaurant 
                                restaurant={restaurant} navigation={navigation} 
                                setIsVisibleLoading= {setIsVisibleLoading}
                                setReloadRestourant= {setReloadRestourant}
                            /> ) 
                    }
                    keyExtractor={(item, index) => index.toString()}
                ></FlatList>
            ) : 
            ( 
                
                <View>
                    <ActivityIndicator size="large" style={styles.loaderResto}>
                        <Text>Cargando Restaurantes</Text>
                    </ActivityIndicator>
                </View>
            )
            }

            <Loading isVisible={isVisibleLoading} ></Loading>
        </View>
    )
}

function Restaurant(props) {
    const {restaurant, navigation, setIsVisibleLoading, setReloadRestourant} = props;    
    //console.log("restaurant: ",restaurant);
    const {name , images, id} = restaurant.item;
    const [imageRestaurant, setImageRestaurant] = useState(null);
   
    useEffect(() => {
        const image = images[0];
        firebase.storage().ref(`restaurant-images/${image}`).getDownloadURL().then(resp => {            
            setImageRestaurant(resp);
        });    
    }, []);   

    const confirmarRemoveFavorite = () => {
        Alert.alert(
            "Eliminar Restaurante de Favoritos",
            "¿Esta seguro de quiere eliminar el restaurante de favoritos?",
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: "Eliminar",
                    onPress: removeFavorite

                }
            ],
            { cancelable: false }
        );
    };

    const removeFavorite = () => {
        console.log("eliminado... ");
        setIsVisibleLoading(true);
        console.log("id:", id);
        db.collection("favorites")
        .where("idRestaurant", "==", id )
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(resp => {
            console.log("resp: ", resp);
            resp.forEach(element => {
                const idCollectionFav = element.id;
                db.collection("favorites").doc(idCollectionFav).delete().then(() => {
                    setIsVisibleLoading(false);
                    setReloadRestourant(true);
                    ToastAndroid.showWithGravity('Restaurante eliminado de favoritos', ToastAndroid.SHORT, ToastAndroid.CENTER);
                }).catch(() => {
                    ToastAndroid.showWithGravity('Error al eliminar de favoritos', ToastAndroid.SHORT, ToastAndroid.CENTER);
                });
            });
        });
    };

    return (
        <View style={styles.resto}>
            <TouchableOpacity
                onPress={ () => navigation.navigate("Restaurante", { restaurante : restaurant.item })}
            >
                <Image
                    resizeMode="cover"
                    source={{uri: imageRestaurant}}
                    style= {styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                ></Image>
            </TouchableOpacity>
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Icon 
                    type="material-community"
                    name="heart"
                    color="#00a680"
                    containerStyle={ styles.favorite }
                    onPress= {confirmarRemoveFavorite}
                    size={40}
                    underlayColor="transparent"
                >

                </Icon>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    loaderResto: {
        marginTop: 10,
        marginBottom: 10
    },
    resto: {
        margin: 10,

    },
    image: {
        width: "100%",
        height: 180,
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: '#fff'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20
    },
    favorite: {
        marginTop: -35,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 85
    }
});