import axios from "axios";

export const client = axios.create({
  baseURL: "http://10.5.9.53:8000",
});

// export const request = async (options) => {
//     let token
//     const state = store.getState()
//     const userState = state?.user?.currentUser
//     if (userState === null) {
//         token = ""
//     }
//     else {
//         const { accessToken } = userState
//         token = accessToken
//     }
//     // Set the authorization header
//     token !== "" && (client.defaults.headers.common.Authorization = `Bearer ${token}`);

//     const onSuccess = (response) => {
//         return response?.data?.data;
//     };

//     const onError = (error) => {
//         return Promise.reject(error.response?.data);
//     };

//     return client(options).then(onSuccess).catch(onError);
// };
