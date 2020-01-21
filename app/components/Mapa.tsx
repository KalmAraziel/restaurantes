import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
export default function Mapa(props) {
    const {location, name } = props;
    
    const abrirMaps = () => {
        openMap({ 
            latitude: location.latitude, 
            longitude: location.longitude,
            zoom: 19,
            query: name
        });
    }

    
    return(
        <MapView
            style={styles.mapStyle}
            initialRegion={location}
            onPress={openMap}
        >
            <Marker 
                coordinate = {{
                    latitude: location.latitude,
                    longitude: location.longitude,
                }} 
                title={name}               
            >
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        height: 250
    }
});