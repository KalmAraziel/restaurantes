import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import {useDebouncedCallback} from 'use-debounce';
// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseApp } from '../utils/Firebase';
const db = firebase.firestore(firebaseApp);

import  {FireSQL} from 'firesql';
const fireSql = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Buscador(props) {
    const { navigation } = props;

    const [restaurants, setRestaurant] = useState([]);
    const [search, setSearch] = useState("");

    console.log("search: ", search);
    useEffect(() => {
        onSearch();
    }, [search]);
    
    const [onSearch] = useDebouncedCallback( ()=> {
        if(search) {
            fireSql
            .query(`SELECT * FROM restaurants WHERE name like '${search}%' `)
            .then( (resp) => {
                setRestaurant(resp);
            });
        }
    }, 300);
    return (
        <View>
            <SearchBar 
                placeholder="Buscar Restaurante"
                onChange={ (e) => setSearch(e.nativeEvent.text) } 
                value= {search}
                containerStyle= {styles.searchBar}
            />
            {restaurants.length === 0 ? 
                (
                    <NotFound></NotFound>
                ) : 
                
                (<View>
                    <FlatList
                        data={restaurants}
                        renderItem={ restaurant => (<Restaurant restaurant={restaurant} navigation={navigation}></Restaurant>) }
                        keyExtractor={ (item, index) => index.toString()}
                    >
                    </FlatList>
                </View>)
            }
        </View>
    )

}
function Restaurant(props) {
    const {restaurant, navigation} = props;
    const {images, name} = restaurant.item;
    const [imageResto, setImageResto] = useState(null);

    useEffect(() => {
        const image = images[0];
        firebase.storage().ref(`restaurant-images/${image}`).getDownloadURL().then( respo => {
            setImageResto(respo);
        });
    }, []);

    return(
        <ListItem
            title={name}
            leftAvatar={{source: {uri: imageResto}}}
            rightIcon={(<Icon type="material-community" name="chevron-right"></Icon>)}
            onPress= {() => navigation.navigate("Restaurante",{restaurante: restaurant.item})}
        >

        </ListItem>
    )
}


function NotFound() {
    return (
        <View style={{flex: 1 , alignItems: 'center'}}>
            <Image 
                source={require("../../assets/img/no-result-found.png")}
                resizeMode="cover"
                style={{width: 200, height: 200}}

            >
                
            </Image>
        </View>
    ) 
}
const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20,

    }
})
