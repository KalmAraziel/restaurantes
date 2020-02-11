import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Icon, Rating, Image } from 'react-native-elements';

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseApp } from '../../utils/Firebase';
const db = firebase.firestore(firebaseApp);


const ListTopRestaurants = (props) => {
    const {restaurants, navigation} = props;
    console.log("ListTop Resto: ", restaurants);
    return (
        <FlatList
            data={restaurants}
            renderItem={ (resto) => (<Restaurant resto={resto} navigation={navigation} ></Restaurant>) }
            keyExtractor={ (item, index) => index.toString() }

        ></FlatList>
    )
}

function Restaurant(props) {
    
    const {resto, navigation} = props;
    const {name, description, images, rating} = resto.item;
    
    const [imageResto, setImageResto] = useState(null);
    const [iconColor, setIconColor] = useState("#000");

    useEffect(() => {
        const image = images[0];
        firebase.storage().ref(`restaurant-images/${ image  }`).getDownloadURL().then(resp => {
            setImageResto(resp);
            console.log('url: ', resp);
        }).catch(err => {
            console.log("error: ", err);
        });
    }, []);
    // colores para posiciones
    useEffect(() => {
        if (resto.index == 0) {
            setIconColor("#efb819");
        } else if (resto.index == 1) {
            setIconColor("#e3e4e5");
        } else if (resto.index == 2) {
            setIconColor("#cd7f32");
        }
    }, []);

    return(
        <TouchableOpacity onPress={ () => navigation.navigate("Restaurante", { restaurante : resto.item })} >
            <Card containerStyle={styles.containerCard}>
                <Icon 
                    type="material-community" 
                    name="chess-queen" 
                    color={iconColor}
                    size={40}
                    containerStyle={styles.containerIcon}
                />
                <Image style={styles.restoImg} resizeMode="cover" source={{uri: imageResto}} />
                <View style={styles.titleRanking}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.rating}>
                        <Rating 
                            imageSize={20}
                            readonly= {true}
                            startingValue={rating} 
                                 
                        ></Rating>
                    </View>
                </View>
                <Text style={styles.description}>{description}</Text>
            </Card>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 30,
        borderWidth: 0
    },
    containerIcon: {
        position: 'absolute',
        top: -30,
        left: -30,
        zIndex: 1  
    },
    restoImg: {
        width: "100%",
        height: 200
    },
    titleRanking: {
        flexDirection: 'row',
        marginTop: 10

    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    rating: {
        position: 'absolute',
        right: 0
    },
    description: {
        color: 'grey',
        marginTop: 0,
        textAlign: 'justify'
    },
   
});
export default ListTopRestaurants
