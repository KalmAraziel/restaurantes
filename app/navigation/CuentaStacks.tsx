import { createStackNavigator } from 'react-navigation-stack';
import Cuenta from '../pages/MiCuenta/Cuenta';
import Login from '../pages/MiCuenta/Login';
import Registro from '../pages/MiCuenta/Registro';




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
    },
    Register: {
      screen: Registro,
      navigationOptions: () => ({
        title: "Registro"
      })
    }

  });

export default CuentaPageStacks;