
import {createAppContainer, NavigationNavigator} from "react-navigation";
import {createBottomTabNavigator } from 'react-navigation-tabs'
import RestaurantPageStacks from './RestaurantStacks';
import React from 'react';
import Icon  from 'react-native-vector-icons/FontAwesome';
import TopRestaurantesPageStacks from './TopListStacks';
import BuscadorPageStacks from './BuscarStacks';
import CuentaPageStacks from './CuentaStacks';

const NavigationStacks = createBottomTabNavigator(     
    { 
        Restaurans: {
            screen: RestaurantPageStacks,
            navigationOptions: () => ({
                tabBarLabel: "Restaurantes",
                tabBarIcon: ( { tintColor } ) => {
                    return (                        
                        <Icon name="glass" size={22} color={tintColor} />                        
                        
                    )
                }
            })
        },
        TopLists: {
            screen: BuscadorPageStacks,
            navigationOptions: () => ({
                tabBarLabel: "Buscar",
                tabBarIcon: ( { tintColor } ) => {
                    return (                        
                        <Icon name="search" size={22} color={tintColor} />                        
                        
                    )
                }
            })
        },
        Search: {
            screen: TopRestaurantesPageStacks,
            navigationOptions: () => ({
                tabBarLabel: "Ranking",
                tabBarIcon: ( { tintColor } ) => {
                    return (                        
                        <Icon name="star" size={22} color={tintColor} />                        
                        
                    )
                }
            })
        },
        Cuenta: {
            screen: CuentaPageStacks,
            navigationOptions: () => ({
                tabBarLabel: "Perfil",
                tabBarIcon: ( { tintColor } ) => {
                    return (                        
                        <Icon name="child" size={22} color={tintColor} />                        
                        
                    )
                }
            })
        }
    },
    {
        initialRouteName: "Restaurans",
        order: ["Restaurans", "TopLists", "Search", "Cuenta"],
        tabBarOptions: {
            inactiveTintColor: "#646464",
            activeTintColor: "#00a680"
        }

    }
);

export default createAppContainer(NavigationStacks);