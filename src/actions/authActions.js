/* The most important requirement in an action creator is; it must have the type
 * property. In simple terms, actions are payloads of information that send data
 * to your store. They are the only source of information for the store.
 *
 * If an action has promise as a payload, it will be passed through the middleaware
 * promiseMiddleware where the promise will be resolved into data that will be
 * consumed by the reducer.
 */
import { LOGIN, REGISTER, RESET_PASSWORD, LOG_OUT } from "./types";
//import axios from "axios";
import {AXIOS_INSTANCE} from "../configs";

export function authUser(user, authAction){
  if(authAction === 'login'){
    const promise = AXIOS_INSTANCE.post('/auth/login',{
      username: user.username,
      password: user.password
    });

    return {
      type:LOGIN,
      payload: promise
    };
  }
  if(authAction === 'logout'){
    const promise = AXIOS_INSTANCE.get('/auth/logout');
    // make an api call here
    return {
      type:LOG_OUT,
      payload: promise
    };
  }
}

export function registerUser(user, callback){
  const promise = AXIOS_INSTANCE.post('/auth/register',{
    username: user.username,
    password: user.password
  });

  promise.then((response)=>{
    callback(response);
  });

  return {
    type:REGISTER,
    payload: promise
  };
}

export function resetPassword(user){
  const promise = AXIOS_INSTANCE.post('/auth/reset-password',{
    username: user.username,
    old_password: user.oldPassword,
    new_password: user.newPassword
  });

  return {
    type:RESET_PASSWORD,
    payload: promise
  };
}

// export function logOutUser(user){
//   // const promise = AXIOS_INSTANCE.post('/auth/reset-password',{
//   //   username: user.username,
//   //   old_password: user.oldPassword,
//   //   new_password: user.newPassword
//   // });
//   // console.log("hello");
//
//   return {
//     type:LOG_OUT,
//     payload: user
//   };
// }
