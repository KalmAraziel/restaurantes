import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Avatar } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';


const InfoUser  = (props) => {
    
    const {
        setReloadData,
        userInfo: {
            uid,
            photoURL,
            displayName,
            email
        }
    } = props;   

    const cambiarAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        console.log('permisos: ', resultPermission);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        console.log(resultPermissionCamera);
        
        if(resultPermissionCamera === "denied") {
            console.log("Acepta los permisos de la galeria");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync( {allowsEditing: true, aspect: [4,3]} );

            if (result.cancelled) {
                console.log("has cerrado la galaria")
            } else {
                await uploadImagen(result["uri"], uid).then( () => {
                    console.log('imagen subida correctamente');
                    updatePhotoUrl(uid);
                });
            }
        }

    }

    const uploadImagen = async (uri, nombreImagen) => {
        const respuesta = await fetch(uri);
        const blob =  await respuesta.blob();
        const ref = await firebase.storage().ref().child(`avatar/${ nombreImagen }`);
        return ref.put(blob);
    }
    const updatePhotoUrl = (uid) => {
        console.log(uid);
        firebase.storage().ref(`avatar/${ uid }`).getDownloadURL().then( async (result) => {
            const update = {
                photoURL: result
            }
            await firebase.auth().currentUser.updateProfile(update);
            setReloadData(true);
        }).catch( error => console.log(error));
    }
    return (
        <View style={styles.viewUserinfo}>
            <Avatar 
                rounded size="large" 
                showEditButton onEditPress={() => cambiarAvatar() } 
                containerStyle={styles.userInfoAvatar}
                source={
                    {
                        uri: photoURL ? photoURL : "https://img.favpng.com/8/0/5/computer-icons-user-profile-avatar-png-favpng-6jJk1WU2YkTBLjFs4ZwueE8Ub.jpg"
                    }
                }
            />

            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName: 'Anónimo'}
                </Text>
                <Text style={styles.displayName}>
                    {email ? email : 'Social Login'}
                </Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    displayName:{
        fontWeight: 'bold',

    },
    viewUserinfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20,

    }

});


export default InfoUser;
