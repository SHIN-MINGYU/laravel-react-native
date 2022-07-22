import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../page/stack/Login';
import Test from '../page/stack/Test';

export type RootScreenPramList = {
  Login: undefined;
  Test: undefined;
};

const Stack = createStackNavigator<RootScreenPramList>();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default MyStack;
