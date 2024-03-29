import React, {Component} from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

// import the different screens
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import LoginScreen from './src/screens/LoginScreen';
import {
  unActiveUserTabNavigator,
  adminUserTabNavigator,
  activeUserTabNavigator,
  adminAssociationTabNavigator,
} from './src/MainTabNavigator';
import {store, persistor} from './src/store/configureStore';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
// create our app's navigation stack
const switchNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    LoginScreen,
    unActiveUserTabNavigator,
    adminUserTabNavigator,
    activeUserTabNavigator,
    adminAssociationTabNavigator,
    PasswordResetScreen,
  },
  {
    initialRouteName: 'Loading',
  },
);

const AppContainer = createAppContainer(switchNavigator);

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <AppContainer />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
