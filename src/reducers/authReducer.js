/* The application state is generated by the reducers
 *
 * Actions are handled in a reducer. A reducer is a function that accepts an
 * action and a state and returns a new state */
import { LOGIN, REGISTER, RESET_PASSWORD, LOG_OUT } from "../actions/types";

export function authUserReducer(state = {}, action){
  switch (action.type) {
    case LOGIN:
      //return [...state, action.payload.data];
      return action.payload.data;
    case LOG_OUT:
      return action.payload;
    //   return [...state, action.payload.data];
    default:
      return state;
  }
}

export function registerUserReducer(state = {}, action){
  switch (action.type) {
    case REGISTER:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function resetPasswordReducer(state = {}, action){
  switch (action.type) {
    case RESET_PASSWORD:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

// export function logOutUserReducer(state = {}, action){
//   // debugger;
//   // console.log("log out");
//   switch (action.type) {
//
//     case LOG_OUT:
//       // return {user: {token: ""}};
//       return action.payload;
//     default:
//       return state;
//   }
// }
