import { createStackNavigator } from 'react-navigation-stack';

import Restarantes from '../pages/Restaurantes/Restarantes';
import AddRestaurant from '../pages/Restaurantes/AddRestaurant';
import Restaurante from '../pages/Restaurantes/Restaurante';

const RestaurantPageStacks = createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Restarantes: {      
      screen: Restarantes,      
      navigationOptions: () => ({
        title: `Restaurantes`,
      }),
    },
    Restaurante: {      
      screen: Restaurante,      
      navigationOptions: (props) => ({
        title: `${props.navigation.state.params.restaurant.item.restaurante.name}`,
      }),
    },
    AddRestaurant: {      
      screen: AddRestaurant,      
      navigationOptions: () => ({
        title: `Nuevo Restaurante`,
      }),
    }
  });

export default RestaurantPageStacks;