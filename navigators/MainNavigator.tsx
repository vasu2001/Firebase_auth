import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigator';

function MainNaviagtion() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}

export default MainNaviagtion;
