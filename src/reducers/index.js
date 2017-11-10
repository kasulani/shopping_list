//This is the root reducer
import {combineReducers} from "redux";
import {loginUserReducer, registerUser} from "./authReducer";

//root reducer will add keys to the global application state, that are passed
//down to the container components as props. The keys are the states returned
//by the reducers

const rootReducer = combineReducers({
  user: loginUserReducer, //loginReducer will return a user object with a token key
  newUser: registerUser
});

export default rootReducer;
