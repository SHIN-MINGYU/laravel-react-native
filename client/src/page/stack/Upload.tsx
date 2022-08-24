import React from 'react';
import {useState} from 'react';
import {Button, Image, Platform, StyleSheet, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import request from '../../service/request';

const createFormData = (
  photo: ImagePicker.ImagePickerResponse,
  body: {[key: string]: any} = {},
) => {
  const data = new FormData();
  if (!photo.assets) {
    return;
  }
  data.append('photo', {
    name: photo.assets[0].fileName,
    type: photo.assets[0].type,
    uri:
      Platform.OS === 'ios'
        ? photo.assets[0].uri!.replace('file://', '')
        : photo.assets[0].uri!,
  });
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};

const Upload = () => {
  const [img, setImg] = useState<ImagePicker.ImagePickerResponse>();
  const pickImg = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });
    setImg(result);
  };

  const uploadImage = async () => {
    if (!img) {
      console.log('img is not defined');
      return;
    }
    try {
      const res = await request.post('laravel-address', createFormData(img));
      console.log(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {img?.assets ? (
        <Image
          source={{uri: img.assets[0].uri}}
          style={[styles.mb_10, {width: 100, height: 100}]}
        />
      ) : (
        <View
          style={[
            styles.mb_10,
            {width: 100, height: 100, borderColor: 'black', borderWidth: 1},
          ]}
        />
      )}
      <Button
        onPress={() => {
          pickImg();
        }}
        title="select in gallery"
      />
      <Button
        onPress={() => {
          uploadImage();
        }}
        title="upload your img"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mb_10: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Upload;
