import { createStackNavigator } from 'react-navigation-stack';

import Favoritos from '../pages/Favoritos';

const FavoritosPageStacks = createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Favorites: {      
      screen: Favoritos,      
      navigationOptions: () => ({
        title: `Tus restaurantes favoritos`,
      }),
    }
  });

export default FavoritosPageStacks;