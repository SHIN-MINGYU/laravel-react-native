import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import request from '../../service/request';
import EncryptedStorage from 'react-native-encrypted-storage';

const Test = () => {
  const onPress = async () => {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    await request
      .post('/api/request', {refreshToken})
      .then(res => console.log('real request : ', res.data));
  };

  return (
    <SafeAreaView>
      <Button onPress={onPress} title="hi" />
    </SafeAreaView>
  );
};

export default Test;
