import { createStackNavigator } from 'react-navigation-stack';

import Buscador from '../pages/Buscador';

const BuscadorPageStacks = createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Buscar: {      
      screen: Buscador,      
      navigationOptions: () => ({
        title: `Busca tu restaurante`,
      }),
    }
  });

export default BuscadorPageStacks;