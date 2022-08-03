import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const request = axios.create();

request.defaults.baseURL = 'http://10.0.2.2:8000';

/* request.defaults.headers = {
  Authorization: accessToken,
} as CustomHeadersProperty; */

request.interceptors.request.use(async config => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  const tokenType = await EncryptedStorage.getItem('tokenType');
  config.headers = {
    Authorization: tokenType + ' ' + accessToken || '',
  };
  return config;
});

request.interceptors.response.use(
  async res => {
    console.log('res data : ', res.data);
    if (res.data.access_token) {
      await EncryptedStorage.setItem('accessToken', res.data.access_token);
    }
    if (res.data.refresh_token) {
      await EncryptedStorage.setItem('refreshToken', res.data.refresh_token);
    }
    if (res.data.token_type) {
      await EncryptedStorage.setItem('tokenType', res.data.token_type);
    }

    return res;
  },
  async error => {
    const {
      data: {error: errorMessage},
      status,
    } = error.response;
    console.log('error');
    if (errorMessage === 'Unauthorized' && status === 401) {
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      const response = await axios.post(
        'http://localhost:8000/api/restoreToken',
        {refreshToken},
      );
      if (response.data.access_token) {
        await EncryptedStorage.setItem(
          'accessToken',
          response.data.access_token,
        );
        const res2 = await axios[error.config.method as 'get' | 'post' | 'put'](
          error.config.url!,
          error.config.data,
          {
            headers: {
              Authorization: response.data.access_token,
            },
          },
        );
        console.log(res2.data);
      }
    }
  },
);

export default request;
