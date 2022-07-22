import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import request from '../../service/request';

const Test = () => {
  const onPress = () => {
    request
      .get('/api/auth/check')
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
  return (
    <SafeAreaView>
      <Button onPress={onPress} title="hi" />
    </SafeAreaView>
  );
};

export default Test;
