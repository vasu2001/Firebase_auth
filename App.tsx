/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';

import IntroScreenComponent from './screens/IntroScreen';
import AsyncStorage from '@react-native-community/async-storage';
import MainNaviagtion from './navigators/MainNavigator';
import {createStore} from 'redux';
import MainReducer from './redux/reducer';
import {storeInterface} from './redux/utils';
import {Provider} from 'react-redux';

const initialState: storeInterface = {
  isLoggedIn: false,
  user: null,
};

declare const global: {HermesInternal: null | {}};
const store = createStore(MainReducer, initialState);

const App = () => {
  const [hasOpened, setHasOpened] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('hasOpened', (err, result) => {
      if (!err) {
        setHasOpened(result === 'true');
      } else {
        console.log(err);
      }
    });
  }, []);

  return !hasOpened ? (
    <IntroScreenComponent
      callback={() => {
        setHasOpened(true);
      }}
    />
  ) : (
    <Provider store={store}>
      <MainNaviagtion />
    </Provider>
  );
};

export default App;
