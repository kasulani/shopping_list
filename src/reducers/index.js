//This is the root reducer
import {combineReducers} from "redux";
import {
  authUserReducer,
  registerUserReducer, resetPasswordReducer} from "./authReducer";
import {
  getShoppingListsReducer,
  addNewShoppingListReducer,
  getShoppingListReducer,
  editShoppingListReducer, addNewItemReducer, getShoppingListItemsReducer,
  editShoppingListItemReducer, deleteShoppingListReducer, getUserReducer,
  deleteShoppingListItemReducer, editUserReducer
} from "./shoppingListsReducer";

//root reducer will add keys to the global application state, that are passed
//down to the container components as props. The keys are the states returned
//by the reducers

const rootReducer = combineReducers({
  user: authUserReducer, //loginReducer will return a user object with a token key
  newUser: registerUserReducer,
  shoppingLists: getShoppingListsReducer, // this a list of shopping lists
  aShoppingList: getShoppingListReducer, // this is a single shopping list
  newShoppingList: addNewShoppingListReducer, // this will have a response object after the API call
  editedShoppingList: editShoppingListReducer,
  newShoppingListItem: addNewItemReducer,
  shoppingListItems: getShoppingListItemsReducer,
  editedListItem: editShoppingListItemReducer,
  deletedShoppingList: deleteShoppingListReducer,
  deletedShoppingListItem: deleteShoppingListItemReducer,
  userDetails: getUserReducer,
  editedUser: editUserReducer,
  resetPass: resetPasswordReducer
});

export default rootReducer;
