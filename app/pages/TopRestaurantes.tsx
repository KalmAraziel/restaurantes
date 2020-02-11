import React, {useState, useEffect} from 'react'
import { View, ToastAndroid } from 'react-native';

//Components 
import ListTopRestaurants from '../components/Ranking/ListTopRestaurants';


// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseApp } from '../utils/Firebase';


const db = firebase.firestore(firebaseApp);

export default function TopRestaurantes(props) {
    const { navigation } = props;
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        (async () => {
            db.collection('restaurants')
            .orderBy("rating", 'desc')
            .limit(5)
            .get().then(resp => {
                const restoArrays = [];
                resp.forEach(doc => {
                    const resto = doc.data();
                    resto.id = doc.id;
                    restoArrays.push(resto);
                });
                setRestaurants(restoArrays);
            })
            .catch( () => {
               
                ToastAndroid.showWithGravity('Error al obtener los restaurantes.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            });
        })()
    }, []);

    return (
        <View>
            <ListTopRestaurants restaurants= {restaurants}  navigation= {navigation} />
        </View>
    )
}
