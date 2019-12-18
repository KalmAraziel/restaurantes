import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import {Overlay} from 'react-native-elements';

const Loading = (props) => {
    const {isVisible} = props;   
    return (
        <Overlay
            isVisible = {isVisible}
            windowBackgroundColor="rgba(0,0,0, .5)"
            overlayBackgroundColor="transparent"
            overlayStyle = {style.overlay}>         
            <View style={[style.container, style.horizontal]}>               
                <ActivityIndicator size="large" color="#00ff00" />               
            </View>           
        </Overlay>
    )
}

const style = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#00a680",
        borderWidth: 2,
        borderRadius: 10,
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },    
    text: {
        color: "#00a680",
        textTransform: "uppercase",
        marginTop: 10
    },

    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default Loading
