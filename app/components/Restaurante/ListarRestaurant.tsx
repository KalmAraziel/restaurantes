import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator , TouchableOpacity} from 'react-native';
import { Image } from 'react-native-elements';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';

const ListarRestaurant = (props) => {
    const {restaurants, isLoading} = props;
    
    console.log("restaurants:", restaurants);
    
    return (
        <View>
           {restaurants ? 
           ( <FlatList 
                data={restaurants} 
                renderItem={restaurant => <Restaurant  restaurant = {restaurant} /> } 
                keyExtractor={(item, index) => index.toString() }
                //onEndReached={}
                onEndReachedThreshold={0}                
            /> ) : (
                <View style={styles.loadingRestaurant}>
                    <ActivityIndicator size="large"     >
                        <Text>Cargando restaurantes...</Text>
                    </ActivityIndicator>
                </View>
            )}
        </View>
    )
}

function Restaurant(props) {
    const {restaurant} = props;
    const {name, address, description, images} = restaurant.item;
    const [imageRestaurant, setImageRestaurant] = useState(null);

    useEffect(() => {
        const image = images[0];
        firebase.storage().ref(`restaurant-images/${ image }`).getDownloadURL().then(result => {        
            setImageRestaurant(result);
        });
    }, [])

    return (
        <TouchableOpacity onPress={ () => {console.log("Ir al restaurant")} } >
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestoImg}>
                    <Image 
                        resizeMode="cover"
                        source={{uri: imageRestaurant}}
                        style={styles.imgResto}
                        PlaceholderContent={<ActivityIndicator color="fff"></ActivityIndicator>}
                    />
                </View>
                <View>
                    <Text style={styles.restoname}>{name}</Text>
                    <Text style={styles.restoAddress}>{address}</Text>
                    <Text style={styles.restoDescri}>{description.substr(0,60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    loadingRestaurant: {
        marginTop: 20,
        alignItems: "center"
    },
    viewRestaurant: {
        flexDirection: 'row',
        margin: 10
    },
    viewRestoImg: {
        marginRight: 15
    },
    imgResto: {
        width: 80,
        height: 80
    },
    restoname:{
        fontWeight: "bold"
    },
    restoAddress: {
        paddingTop: 2,
        color: 'grey'
    },
    restoDescri: {
        paddingTop: 2,
        color: 'grey',
        width: 300,
    }  
});
export default ListarRestaurant
