import { createStackNavigator } from 'react-navigation-stack';
import TopRestaurantes from '../pages/TopRestaurantes';


const TopRestaurantesPageStacks = createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    TopRestaurantes: {      
      screen: TopRestaurantes,      
      navigationOptions: () => ({
        title: `Los mejores Restaurantes`,
      }),
    }
  });

export default TopRestaurantesPageStacks;