import axios from 'axios';
import API from './URL';

const instance = axios.create({
  baseURL: API.BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  async config => {
    try {
      console.log(' *************** Request Sent *****************');
      // const token = await getItem(Strings.TOKEN);
      config.headers.put['Content-Type'] = 'multipart/form-data';
      config.headers.post['Content-Type'] = 'multipart/form-data';
      config.headers.common['Accept'] = 'multipart/form-data';
      config.headers.post['Content-Type'] = 'multipart/form-data';
      //  if (token) {
      // config.headers.Authorization =
      //   'Bearer uSWLL6miqsr5m0lSfswLT1lFAIFfV3gpgPYtHlPk';
      // }
    } catch (error) {
      //console.log('Catch ' + JSON.stringify(error));
    }

    return config;
  },
  error => {
    //console.log(' *************** Error Request *****************');
    //console.log(JSON.stringify(error));

    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async response => {
    console.log(response);
    return response;

    //return Promise.reject(response);
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
