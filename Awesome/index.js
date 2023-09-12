/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
//import { Provider } from 'react-redux';
//import store from './src/reduxestore/store';
AppRegistry.registerComponent(appName, () => App);
{/* <Provider store={store}><App /></Provider> */}