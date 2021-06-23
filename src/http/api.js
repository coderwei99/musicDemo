import axios from 'axios'
// import store from '../store/index'

// axios.interceptors.request.use(
//   config => {
//     store.state.flags = true;
//     console.log(store.state.flags);
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
// axios.interceptors.response.use(
//   config =>{
//     store.state.flags = false
//     console.log(store.state.flags);
//     return config
//   }
// )
  export default function request(api, params) {
    return axios({
      method: 'get',
      url: api,
      baseURL: 'http://localhost:3000',
      params: params,
    })
  }