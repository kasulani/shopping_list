/* The most important requirement in an action creator is; it must have the type
 * property. In simple terms, actions are payloads of information that send data
 * to your store. They are the only source of information for the store.
 *
 * If an action has promise as a payload, it will be passed through the middleaware
 * promiseMiddleware where the promise will be resolved into data that will be
 * consumed by the reducer.
 */
import { LOGIN } from "./types";
//import axios from "axios";
import {AXIOS_INSTANCE} from "../configs";

export function loginUser(user){
  const promise = AXIOS_INSTANCE.post('/auth/login',{
    username: user.username,
    password: user.password
  });

  return {
    type:LOGIN,
    payload: promise
  };
}
