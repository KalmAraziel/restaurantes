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
    const [isRealoadrestaurant, setIsRealoadRestaurant] = useState(false)
    
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
                
                setStartRestaurant(response.docs[response.docs.length -1]);
                response.forEach( (doc) => {                    
                    let rest = doc.data();
                    rest["id"] = doc.id;                          
                    resulrestaurant.push({"restaurante":rest});
                });                                
                setRestaurants(resulrestaurant);                
            });
        })();
        setIsRealoadRestaurant(false)
    }, [isRealoadrestaurant])

    const cargarMasRestaurantes = async () => {
       const resultRestaurantes = [];
       restaurants.length < totalRestaurants && setLoading(true);
       
       const restaurantesDb = db.collection("restaurants")
                            .orderBy("createdAt", "desc")
                            .startAfter(startRestaurant.data().createAt)
                            .limit(limite);
        await restaurantesDb.get().then(response => {
            if (response.docs.length > 0) {
                //llegan resto
                startRestaurant(response.docs[response.docs.length -1]);

            } else {
                setLoading(false);
            }

            response.forEach( (doc) => {                    
                let rest = doc.data();
                rest["id"] = doc.id;                          
                resultRestaurantes.push({"restaurante":rest});
            });

            setRestaurants([...restaurants, ...resultRestaurantes]);
        });
        
    };

    return (
        <View style={styles.viewBody}>
            <ListarRestaurant restaurants= {restaurants} isLoading= {loading} cargarMasRestaurantes = {cargarMasRestaurantes} navigation={navigation} ></ListarRestaurant>
            {user && <AgregarRestauranteButton navigation={navigation} setIsRealoadRestaurant={setIsRealoadRestaurant}></AgregarRestauranteButton>}
            
        </View>
    )
    
}

function AgregarRestauranteButton(props) {
    const {navigation, setIsRealoadRestaurant} = props;
    return (
        <ActionButton
            buttonColor="#00a680"
            onPress={ () => navigation.navigate("AddRestaurant", {setIsRealoadRestaurant}) }
        />
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }
});