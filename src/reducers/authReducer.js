/* The application state is generated by the reducers
 *
 * Actions are handled in a reducer. A reducer is a function that accepts an
 * action and a state and returns a new state */
import { LOGIN } from "../actions/types";

export default function loginUserReducer(state = {}, action){
  switch (action.type) {
    case LOGIN:
      //return [...state, action.payload.data];
      return action.payload.data;
    default:
      return state;
  }
}
