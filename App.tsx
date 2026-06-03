import { SafeAreaViewBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import AppNavigator from './src/navigation/AppNavigator';

import {Provider} from 'react-redux';

import {store} from './src/redux/store';
import AddNewPlotScreen from './src/screens/admin/AddNewPlotScreen';
import CartScreen from './src/screens/CartScreen';

const App = () => {
  return (
   <Provider store={store} >
      <AppNavigator />
    </Provider>
  

  );
};

export default App;


