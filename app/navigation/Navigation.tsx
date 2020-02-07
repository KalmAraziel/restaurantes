
import {createAppContainer, NavigationNavigator} from "react-navigation";
import {createBottomTabNavigator } from 'react-navigation-tabs'
import RestaurantPageStacks from './RestaurantStacks';
import React from 'react';

import TopRestaurantesPageStacks from './TopListStacks';
import BuscadorPageStacks from './BuscarStacks';
import CuentaPageStacks from './CuentaStacks';
import FavoritosPageStacks from './FavoritosStacks';
import { Icon } from 'react-native-elements';

const NavigationStacks = createBottomTabNavigator(     
    { 
        Restaurans: {
            screen: RestaurantPageStacks,
            navigationOptions: () => ({
                tabBarLabel: "Restaurantes",
                tabBarIcon: ( { tintColor } ) => {
                    return (                        
                        <Icon 
                            type="material-community"
                            name="near-me" 
                            size={22} color={tintColor} />                        
                        
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
                        <Icon  type="material-community" name="star-outline" size={22} color={tintColor} />                        
                        
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
                        <Icon  name="search" size={22} color={tintColor} />                        
                        
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
                        <Icon type="material-community" name="home-outline" size={22} color={tintColor} />                        
                        
                    )
                }
            })
        },
        Favorites: {
            screen: FavoritosPageStacks,
            navigationOptions: () => ({
                tabBarLabel: "Favoritos",
                tabBarIcon: ( { tintColor } ) => {
                    return (                        
                        <Icon type="material-community"  name="heart-outline" size={22} color={tintColor} />                        
                        
                    )
                }
            })
        }
    },
    {
        initialRouteName: "Restaurans",
        order: ["Restaurans", "Favorites", "TopLists", "Search", "Cuenta"],
        tabBarOptions: {
            inactiveTintColor: "#646464",
            activeTintColor: "#00a680"
        }

    }
);

export default createAppContainer(NavigationStacks);