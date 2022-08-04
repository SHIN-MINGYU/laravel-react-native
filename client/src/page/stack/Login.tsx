import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootScreenPramList} from '../../navigation/StackNavigation';
import request from '../../service/request';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
type props = NativeStackScreenProps<RootScreenPramList, 'Login'>;

const useInput = (initailState: string) => {
  const [value, setValue] = useState<string>(initailState);
  const onChangeText = (text: string) => {
    setValue(text);
  };
  return {value, onChangeText};
};

const style = StyleSheet.create({
  container: {flex: 1},
  formContainer: {flex: 1, justifyContent: 'center'},
  formInput: {borderColor: 'black', borderWidth: 1, marginBottom: 2},
  text: {textAlign: 'center'},
});

const Login = ({navigation}: props) => {
  const name = useInput('');
  const password = useInput('');
  const email = useInput('');
  const [text, setText] = useState<string>('');
  const onSubmit = () => {
    request
      .post('/api/login', {
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        navigation.push('Test');
      })
      .catch(err => console.log(err));
  };

  const set = async () => {
    console.log(
      'accessToken : ',
      await EncryptedStorage.getItem('accessToken'),
    );
    console.log(
      'refreshToken : ',
      await EncryptedStorage.getItem('refreshToken'),
    );
    console.log('accessToken : ', await EncryptedStorage.getItem('tokenType'));

    setText((await EncryptedStorage.getItem('accessToken')) || '');
  };

  useEffect(() => {
    /*   EncryptedStorage.removeItem('accessToken');
    EncryptedStorage.removeItem('refreshToken');
    EncryptedStorage.removeItem('tokenType'); */
    if (!text) {
      set();
    } else {
      navigation.navigate('Test');
    }
  }, [navigation, text]);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.formContainer}>
        <TextInput style={style.formInput} {...email} />
        <TextInput style={style.formInput} {...name} />
        <TextInput style={style.formInput} {...password} />
        <Button title="submit" onPress={onSubmit} />
      </View>
      <View style={style.formContainer}>
        <Text style={style.text}>{text}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
