// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {mainRoutes} from './src/route';
import {parseRoutes} from './src/parseRoute';

function App() {
  return <NavigationContainer>{parseRoutes(mainRoutes)}</NavigationContainer>;
}

export default App;
