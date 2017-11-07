import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import promiseMiddleware from "redux-promise";
import {logger} from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(intialState){
  return createStore(
    rootReducer,
    intialState,
    composeWithDevTools(
      applyMiddleware(
        promiseMiddleware,
        logger,
        reduxImmutableStateInvariant()
      )
    ));
}
