import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button, Avatar, Rating} from 'react-native-elements';

const ListaReviews = (props) => {
    const {navigation, idRestaurant} = props;
    console.log('propsReview:', props);
    return (
        <View>
            <Button 
                titleStyle={styles.btnTitleAddReview}
                buttonStyle={styles.btnAddReview} 
                title="Escribir una opinión"
                icon={{
                  type: "material-community",
                  name: "square-edit-outline",
                  color: "#00a680"               
                }}
                onPress= { () => navigation.navigate("AddReviewRestaurant", { idRestaurant }) }
            ></Button>
            <Text>Lista de comentarios ... </Text>
        </View>
    )
}
const styles =  StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",

    },
    btnTitleAddReview: {
        color:"#00a680"
    }
});
export default ListaReviews
