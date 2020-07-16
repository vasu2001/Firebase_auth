import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreenComponent from '../screens/HomeScreen';

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreenComponent} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
