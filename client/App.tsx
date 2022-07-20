/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';

const useInput = (initailState: string) => {
  const [value, setValue] = useState<string>(initailState);
  const onChangeText = (text: string) => {
    setValue(text);
  };
  return {value, onChangeText};
};

const App = () => {
  const username = useInput('');
  const password = useInput('');
  const [result, setResult] = useState('loading');
  const onSubmit = () => {};
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextInput
          style={{borderColor: 'black', borderWidth: 1, marginBottom: 2}}
          {...username}
        />
        <TextInput
          style={{borderColor: 'black', borderWidth: 1, marginBottom: 2}}
          {...password}
        />
        <Button title="submit" />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>{result}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
