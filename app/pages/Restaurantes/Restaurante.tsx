import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import Carrusel from '../../components/Carrusel';
import { Rating, Icon, ListItem } from 'react-native-elements';
import Mapa from '../../components/Mapa';
import ListaReviews from '../../components/Restaurante/ListaReviews';

const Restaurante = (props) => {   
    const {navigation} = props;
    const {restaurante} = navigation.state.params.restaurant.item;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);

    useEffect(() => {
        const arrayUrl = [];
        (async () => {
            await Promise.all(
                restaurante.images.map(async image => {                    
                    await firebase.storage().ref(`restaurant-images/${ image }`).getDownloadURL().then(result => {        
                        console.log("result:", result);
                        arrayUrl.push(result);
                        console.log('imagenes:', imagesRestaurant);
                    });
                })
            );
            setImagesRestaurant(arrayUrl);
        })();
    }, []);
    
    return (
        <ScrollView style={styles.viewBody}>            
            <Carrusel arrayImages={imagesRestaurant} alto={200} ancho={Dimensions.get("window").width}></Carrusel>
            <TitleRestaurant
                name={restaurante.name} 
                description={restaurante.description} 
                rating={restaurante.rating}
            >                    
            </TitleRestaurant>
            <RestaurantInfo location={restaurante.location} name={restaurante.name} address={restaurante.address}></RestaurantInfo>
            <ListaReviews navigation={navigation} idRestaurant={restaurante.id} ></ListaReviews>
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
                    >

                    </ListItem>
                ))
            }
        </View>
    );
}


const styles = StyleSheet.create({
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
