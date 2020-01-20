import React, { useState, useEffect } from 'react'
import { View, Text , StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import ListarRestaurant from '../../components/Restaurante/ListarRestaurant';

// Firebase
import {firebaseApp} from '../../utils/Firebase.js';
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);


export default function Restarantes(props) {    
    const {navigation} = props;
    const [user, setUser] = useState(null);
    
    const [restaurants, setRestaurants] = useState([]);
    const [startRestaurant, setStartRestaurant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [limite, setLimite] = useState(8);
    
    ////console.log("restaurantes:", restaurants);
    // efect usuario
    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        })        
    }, [])
    // efect restaurantes
    useEffect(() => {
        
        db.collection("restaurants").get().then( (snap) => { setTotalRestaurants(snap.size); } );
        (async () => {
            const resulrestaurant = [];
            const restaurants = db.collection("restaurants").orderBy('createdAt', 'desc').limit(limite);
            
            await restaurants.get().then( response => {
                ////console.log("restaurantssssssss: ",response.docs);
                setStartRestaurant(response.docs[response.docs.length -1]);
                response.forEach( (doc) => {
                    ////console.log('documentossssss:', doc.data());
                    let rest = doc.data();
                    rest["id"] = doc.id;      
                    ////console.log("adasdadadsasd:",rest);             
                    resulrestaurant.push(rest);
                });                                

                setRestaurants(resulrestaurant);                
            });
        })()
    }, [])

    return (
        <View style={styles.viewBody}>
            <ListarRestaurant restaurants= {restaurants} isLoading= {loading}></ListarRestaurant>
            {user && <AgregarRestauranteButton navigation={navigation}></AgregarRestauranteButton>}
            
        </View>
    )
    
}

function AgregarRestauranteButton(props) {
    const {navigation} = props;
    return (
        <ActionButton
            buttonColor="#00a680"
            onPress={ () => navigation.navigate("AddRestaurant") }
        />
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }
});