import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SigninScreenComponent from '../screens/SigninScreen';

const Stack = createStackNavigator();

function MainNaviagtion() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SigninScreenComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNaviagtion;
