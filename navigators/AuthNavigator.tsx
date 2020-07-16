import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigninScreenComponent from '../screens/SigninScreen';
import SignupScreenComponent from '../screens/SignupScreen';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SigninScreenComponent} />
      <Stack.Screen name="SignUp" component={SignupScreenComponent} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
