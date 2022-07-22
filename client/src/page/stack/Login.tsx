import React, {useState} from 'react';
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
});

const Login = ({navigation}: props) => {
  const name = useInput('');
  const password = useInput('');
  const email = useInput('');
  const onSubmit = () => {
    request
      .post('/api/auth/login', {
        username: name.value,
        email: email.value,
        password: password.value,
      })
      .then(res => {
        navigation.push('Test');
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.formContainer}>
        <TextInput style={style.formInput} {...email} />
        <TextInput style={style.formInput} {...name} />
        <TextInput style={style.formInput} {...password} />
        <Button title="submit" onPress={onSubmit} />
      </View>
      <View style={style.formContainer}>
        <Text style={{textAlign: 'center'}}>{''}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
