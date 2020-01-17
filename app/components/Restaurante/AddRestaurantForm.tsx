import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert , ScrollView, Dimensions} from 'react-native';
import { Icon, Image , Button, Avatar, Input} from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import Modals from '../Modals';
import * as Location from 'expo-location';
import {ToastAndroid} from 'react-native';


const WidthScreen = Dimensions.get("window").width;


const AddRestaurantForm = (props) => {
    const { navigation, setIsLoading } = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    // estados
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isVisible, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null)
    
    const agregarRestaurant = () => {        
        
        if(!nombre || !direccion || !descripcion){
            ToastAndroid.showWithGravity('Todos los campos son obligatorios', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (imagesSelected.length === 0) {
            ToastAndroid.showWithGravity('Debes seleccionar al menos una imagen', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!locationRestaurant) {
            ToastAndroid.showWithGravity('Debes localizar el restaurant en el mapa', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            setIsLoading(true);
            
        }
    }

    return (
        <ScrollView>
            <ImagenRestaurant imagenRestaurant = {imagesSelected[0] } ></ImagenRestaurant>
            <FormAgregar 
                setNombre= {setNombre}
                setDireccion= {setDireccion}
                setDescripcion= {setDescripcion}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant= {locationRestaurant}
            ></FormAgregar>
            <UploadImage imagesSelected={imagesSelected}  setImagesSelected = {setImagesSelected}></UploadImage>            
            <Button title="Crear Restaurante" onPress={ () => agregarRestaurant() } buttonStyle={styles.btnAddRestaurant}></Button>
            <Map isVisibleMap={isVisible} setIsVisibleMap={ setIsVisibleMap } setLocationRestaurant = {setLocationRestaurant} ></Map>
        </ScrollView>
    )
}
function ImagenRestaurant(props) {
    const {imagenRestaurant} = props;
    return (
        <View style={styles.viewFoto}>
            {   imagenRestaurant ? (
                <Image
                    source= {{uri: imagenRestaurant}}
                    style={{width: WidthScreen, height: 200}}
                >
                </Image>
                ):(
                
                    <Image
                        source={ require("../../../assets/img/no-image.png") }
                        style={{width: WidthScreen, height: 200}}
                    >
                    </Image>
                )
            }
        </View>
    );

}

function Map(props) {
    const {isVisibleMap, setIsVisibleMap, setLocationRestaurant} = props;
    const [location, setLocation] = useState(null);
    useEffect(() => {
        (async () => {
            let resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
            const statusPermissions = resultPermissions.permissions.location.status;
            if (statusPermissions !== "granted") {

                Alert.alert("Error","Tienes que aceptar los permisos de localizacion para crear un restaurante.",[
                    {
                        text: "Aceptar",
                        style: "cancel",
                    }                        
                ]);
                
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                console.log(loc.coords);
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta:0.001
                });

                
            }
        })        
        ()
    }, [])

    const confirmarLocacion = () => {
        setLocationRestaurant(location);
        setIsVisibleMap(false);
    }

    return (
        <Modals 
            isVisible={isVisibleMap} 
            setIsVisible={setIsVisibleMap} 
        >
            <View>
                {location &&  ( 
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation= {true}
                        onRegionChange={region => setLocation(region)}
                    >
                        <Marker
                            coordinate = {{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title=""
                            description=""
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicación"
                        onPress= {() => confirmarLocacion()}
                        containerStyle= {styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                    >

                    </Button>
                    <Button
                        title="Cancelar "
                        onPress= {() => setIsVisibleMap(false)}
                        containerStyle= {styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                    >
                    </Button>
                </View>
            </View>            
        </Modals>       
    );
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

function FormAgregar(props) {    
    const {setNombre, setDireccion, setDescripcion, setIsVisibleMap, locationRestaurant} = props;    
    return(
        <View style={styles.viewForm} >
            <Input
                placeholder="Nombre del Restaurante"
                containerStyle= {styles.input}
                onChange= { (e) => setNombre(e.nativeEvent.text)}
            ></Input>
            <Input
                placeholder="Dirección"
                containerStyle= {styles.input}
                onChange= { (e) => setDireccion(e.nativeEvent.text)}
                rightIcon= {{                     
                    type: "material-community", 
                    name:"google-maps",
                    color: locationRestaurant ? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            ></Input>
            <Input
                placeholder="Descripción del restaurante"
                multiline={true}
                style={styles.input}
                inputContainerStyle= {styles.textArea}
                onChange= { (e) => setDescripcion(e.nativeEvent.text)}
            ></Input>
        </View>
    )
}

const styles = StyleSheet.create({    
    viewMapBtn:{
        flexDirection: "row",
        justifyContent:"center",
        marginTop: 10
    },
    mapStyle: {
        width: "100%",
        height:550
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnContainerCancel:{
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680"
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100,       
        padding: 0,
        margin: 0
    },
    viewFoto: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    },
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
    },
    btnAddRestaurant: {
        backgroundColor: "#00a680",
        margin: 20
    }
    
});
export default AddRestaurantForm
