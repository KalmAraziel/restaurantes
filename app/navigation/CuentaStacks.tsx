import { createStackNavigator } from 'react-navigation-stack';
import Cuenta from '../pages/MiCuenta/Cuenta';
import Login from '../pages/MiCuenta/Login';




const CuentaPageStacks = createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Cuenta: {      
      screen: Cuenta,      
      navigationOptions: () => ({
        title: `Mi cuenta`,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: "Login"
      })
    }
  });

export default CuentaPageStacks;