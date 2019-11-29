import { createStackNavigator } from 'react-navigation-stack';

import Restarantes from '../pages/Restarantes';

const RestaurantPageStacks = createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Restarantes: {      
      screen: Restarantes,      
      navigationOptions: () => ({
        title: `Restaurantes`,
      }),
    }
  });

export default RestaurantPageStacks;