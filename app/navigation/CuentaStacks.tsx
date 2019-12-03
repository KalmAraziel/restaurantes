import { createStackNavigator } from 'react-navigation-stack';
import Cuenta from '../pages/Cuenta';



const CuentaPageStacks = createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Cuenta: {      
      screen: Cuenta,      
      navigationOptions: () => ({
        title: `Mi cuenta`,
      }),
    }
  });

export default CuentaPageStacks;