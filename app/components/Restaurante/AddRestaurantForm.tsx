import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert , ScrollView, Dimensions} from 'react-native';
import { Icon, Image , Button, Avatar, Input} from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const AddRestaurantForm = (props) => {
    const { navigation } = props;
    const [imagesSelected, setImagesSelected] = useState([]);

    return (
        <ScrollView>
            <Text>Agregar Restaurante Form</Text>
            <UploadImage imagesSelected={imagesSelected}  setImagesSelected = {setImagesSelected}></UploadImage>
        </ScrollView>
    )
}

function UploadImage(props){
    const {imagesSelected, setImagesSelected} = props;
    
    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        if(resultPermissionCamera === "denied") {
            console.log("Acepta los permisos de la galeria");
        } else {
            console.log("correcto");
            const result: any = await ImagePicker.launchImageLibraryAsync( {allowsEditing: true, aspect: [4,3]} );
            if (result.cancelled) {
                console.log("has cerrado la galaria")
            } else { 
                console.log("uri: ",result["uri"]);            
                if(imagesSelected.length === 0){
                    setImagesSelected( [result.uri ] );
                } else {
                    setImagesSelected( [...imagesSelected, result.uri ]);
                }                
                console.log('imgs: ', imagesSelected);
            }
        }        
    }

    const removeImage = (imagen) => {
        const imgs = imagesSelected;
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro de eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },

                {
                    text: "Eliminar",
                    style: "default",
                    onPress: () => setImagesSelected(imgs.filter(image => imagen !==  image))
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.viewImage}>
            { imagesSelected.length < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress = { imageSelect }
                ></Icon>
            )}
            
            {imagesSelected.map(imageRestaurant => (
                <Avatar
                    rounded={true}
                    key={imageRestaurant}
                    onPress={ () => removeImage(imageRestaurant) }                    
                    containerStyle={styles.miniature}
                    overlayContainerStyle={styles.miniature}
                    source= {
                        {uri: imageRestaurant}
                    }
                />
            ))}
            
        </View>
    ) 
}

const styles = StyleSheet.create({
    viewImage: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
        borderRadius: 20
    },
    miniature1: {       
        marginRight: 10,
        height: 70,
        width: 70,        
        borderRadius: 20,
        backgroundColor: "#e3e3e3"
    },
    miniature: {       
        marginRight: 10,
        height: 70,
        width: 70,        
        borderRadius: 20,
        backgroundColor: "#e3e3e3"
    }
});
export default AddRestaurantForm
