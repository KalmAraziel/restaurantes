import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Mapa(props) {
    const {location, name } = props;
    return(
        <MapView
            style={styles.mapStyle}
            initialRegion={location}
            onPress={()=> console.log("abriendo maps")}
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