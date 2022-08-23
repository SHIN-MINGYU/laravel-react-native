/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation/StackNavigation';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  const requestPermission = async () => {
    // 앱 구동 시 승인 처리 필요한 곳
    const scan = await PermissionsAndroid.check(
      'android.permission.BLUETOOTH_SCAN',
    );
    const connect = await PermissionsAndroid.check(
      'android.permission.BLUETOOTH_CONNECT',
    );
    const location = await PermissionsAndroid.check(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    if (!scan) {
      const scanGrant = await PermissionsAndroid.request(
        'android.permission.BLUETOOTH_SCAN',
      );
    }
    if (!connect) {
      const connectGrant = await PermissionsAndroid.request(
        'android.permission.BLUETOOTH_CONNECT',
      );
    }
    if (!location) {
      const locationGrant = await PermissionsAndroid.request(
        'android.permission.ACCESS_FINE_LOCATION',
      );
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
