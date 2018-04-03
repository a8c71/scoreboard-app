import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/utils/configureStore';

import AppNavigator from './src/AppNavigator';

const { store, persistor } = configureStore();

class App extends Component {
  componentWillMount() {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#3fb893');
  }

  render() {
    return (
      <Provider store={store} persistor={persistor}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
