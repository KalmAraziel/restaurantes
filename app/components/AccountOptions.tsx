import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'

const AccountOptions = () => {
    const menuOpt = [
        { 
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRigth: "#ccc",
            onPress: () => console.log("cambiar Nombre")
        },
        { 
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRigth: "#ccc",
            onPress: () => console.log("cambiar email")
        },
        { 
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRigth: "#ccc",
            onPress: () => console.log("cambiar password")
        }
    ];
    return (
        <View>
            {
                menuOpt.map( (menu, index) => (
                    <ListItem 
                        key={index}
                        title={menu.title}
                        leftIcon = {
                            { type: menu.iconType, name: menu.iconNameLeft, color: menu.iconColorLeft }
                        }
                        rightIcon = {
                            { type: menu.iconType, name: menu.iconNameRight, color: menu.iconColorRigth }
                        }
                        onPress = {menu.onPress}
                        containerStyle= {styles.menuItem}
                    />
                ) )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
});
export default AccountOptions
