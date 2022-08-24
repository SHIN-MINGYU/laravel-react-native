import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Index from '../page/stack/Index';
import Login from '../page/stack/Login';
import Test from '../page/stack/Test';
import Upload from '../page/stack/Upload';

export type RootScreenPramList = {
  Index: undefined;
  Login: undefined;
  Test: undefined;
  Upload: undefined;
};

const Stack = createStackNavigator<RootScreenPramList>();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default MyStack;
