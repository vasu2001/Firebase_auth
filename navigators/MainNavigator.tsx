import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigator';
import {useStore, useSelector} from 'react-redux';
import {storeInterface} from 'redux/utils';
import HomeNavigation from './HomeNavigator';

function MainNaviagtion() {
  const {isLoggedIn} = useSelector((state) => state);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default MainNaviagtion;
