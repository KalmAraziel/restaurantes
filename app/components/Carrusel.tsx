import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel  from 'react-native-banner-carousel';

export default function Carrusel(props) {
    const {arrayImages, alto, ancho} = props;
    console.log("arrayImages:", arrayImages);
    return (
        <Carousel 
            autoplay
            autoplayTimeout={3000}
            loop
            index={0}
            pageSize={ancho}
            pageIndicatorStyle={styles.indicator}
            activePageIndicatorStyle={ styles.indicatorActive }
        >
           {arrayImages.map(img => 
               (
                <View key={img}>
                    <Image 
                        style={{width: ancho, height: alto}}
                        source={{uri:img}}
                    >                            
                    </Image>
                </View>
                )
           )}
        </Carousel>
    );
}
const styles = StyleSheet.create({
    indicator:{
        backgroundColor: "#00a680"
    },
    indicatorActive:{
        backgroundColor: "#00ffc5"
    }
});

