
import {createAppContainer, NavigationNavigator} from "react-navigation";
import {createBottomTabNavigator } from 'react-navigation-tabs'
import RestaurantPageStacks from './RestaurantStacks';
import React from 'react';
import Icon  from 'react-native-vector-icons/FontAwesome';

const NavigationStacks = createBottomTabNavigator(     
    { 
        Restaurantes: {
            screen: RestaurantPageStacks,
            navigationOptions: () => ({
                tabBarLabel: "Restaurantes",
                tabBarIcon: ( { tintColor } ) => {
                    return (
                        
                        <Icon name="glass" size={22} color={tintColor} />
                        
                        
                    )
                }
            })
        } 
    }
);

export default createAppContainer(NavigationStacks);