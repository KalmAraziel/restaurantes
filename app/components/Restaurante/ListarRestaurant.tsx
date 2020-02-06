import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator , TouchableOpacity} from 'react-native';
import { Image } from 'react-native-elements';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import ListaReviews from './ListaReviews';


const ListarRestaurant = (props) => {
    
    const {restaurants, isLoading, cargarMasRestaurantes, navigation} = props;        
    
    return (
        <View>
            {   restaurants ? 
                (   <FlatList 
                        data={restaurants} 
                        renderItem={restaurant => <Restaurant  restaurant = {restaurant} navigation={navigation} /> } 
                        keyExtractor={(item, index) => index.toString() }
                        onEndReached={cargarMasRestaurantes}
                        onEndReachedThreshold={0}  
                        ListFooterComponent={ <FooterList isLoading = {isLoading}></FooterList>  }             
                    >                        
                    </FlatList> 
                )
                : (
                    <View style={styles.loaderRestos}>
                        <ActivityIndicator size="large"     >
                            <Text>Cargando restaurantes...</Text>
                        </ActivityIndicator>
                    </View>
                )
            }
        </View>
    )
}

function Restaurant(props) {
    const {restaurant, navigation} = props;    
    const {name, address, description, images} = restaurant.item.restaurante;
    const [imageRestaurant, setImageRestaurant] = useState(null);
    //console.log("images:", images);
    useEffect(() => {
        const image = images[0];
        firebase.storage().ref(`restaurant-images/${ image }`).getDownloadURL().then(result => {        
            setImageRestaurant(result);
        });
    }, [])

    return (
        <TouchableOpacity onPress={ () => { navigation.navigate("Restaurante", {restaurant}) } } >
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

function FooterList(props) {
    const {isLoading} = props;
    if (isLoading){
        return (
            <View>
                <ActivityIndicator size="large" style={styles.loadingRestaurant}>

                </ActivityIndicator>
            </View>
        );
    } else {
        return (
            <View style={styles.noFoundResto}>
                <Text>No quedan más restaurantes por cargar.</Text>
            </View>
        );
    }    
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
    },
    loaderRestos:{
        marginTop: 10,
        marginBottom: 10
    },
    noFoundResto: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    }
});
export default ListarRestaurant
