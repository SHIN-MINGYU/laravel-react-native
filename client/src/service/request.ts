import axios, {HeadersDefaults} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const request = axios.create();

interface CustomHeadersProperty extends HeadersDefaults {
  Authorization: string;
}

request.defaults.baseURL = 'http://10.0.2.2:8000';

/* request.defaults.headers = {
  Authorization: accessToken,
} as CustomHeadersProperty; */

request.interceptors.request.use(async config => {
  const token = await EncryptedStorage.getItem('accessToken');
  config.headers = {
    Authorization: ,
  }
  return config;
});

request.interceptors.response.use(async res => {
  if (res.data.accessToken && res.data.tokenType) {
    await EncryptedStorage.setItem(
      'accessToken',
      res.data.tokenType + ' ' + res.data.accessToken,
    );
  }
  return res;
});

export default request;
