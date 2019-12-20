import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import Modals from './Modals';
import CambiarNombreForm from './Cuenta/CambiarNombreForm';
import CambiarPasswordForm from './Cuenta/CambiarPasswordForm';
import CambiarEmailForm from './Cuenta/CambiarEmailForm';

const AccountOptions = (props) => {
    const { userInfo, setReloadData }= props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const menuOpt = [
        { 
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRigth: "#ccc",
            onPress: () => selectedComponent(0)
        },
        { 
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRigth: "#ccc",
            onPress: () => selectedComponent(1)
        },
        { 
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRigth: "#ccc",
            onPress: () => selectedComponent(2)
        }
    ];

    const selectedComponent = (index: number) => {
        setIsVisibleModal(true);   
        switch (index) {
            case 0:
                setRenderComponent(<CambiarNombreForm userInfo = {userInfo} setIsVisibleModal={setIsVisibleModal} setReloadData={setReloadData}></CambiarNombreForm>);
                break;
            case 1: 
            setRenderComponent(<CambiarEmailForm userInfo = {userInfo} setIsVisibleModal={setIsVisibleModal} setReloadData={setReloadData}></CambiarEmailForm>);
                break;
            case 2:
                setRenderComponent(<CambiarPasswordForm></CambiarPasswordForm>)
                break;
            default:
                break;
        }     
    }

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
            
            {
                renderComponent && (
                    <Modals isVisible={isVisibleModal} setIsVisible = {setIsVisibleModal} >
                        { renderComponent }
                    </Modals>
                )
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
