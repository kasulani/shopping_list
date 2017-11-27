import {
  FETCH_SHOPPING_LISTS,
  FETCH_SHOPPING_LIST,
  ADD_NEW_SHOPPING_LIST, EDIT_SHOPPING_LIST, ADD_NEW_ITEM,
  FETCH_SHOPPING_LIST_ITEMS, EDIT_SHOPPING_LIST_ITEM, DELETE_SHOPPING_LIST,
  GET_USER, DELETE_SHOPPING_LIST_ITEM, EDIT_USER, LOG_OUT, FETCH_SHOPPING_LISTS_ON_A_PAGE
} from "../actions/types";

export function getUserReducer(state = {}, action){
  switch (action.type) {
    case GET_USER:
      return action.payload.data.user;
    case LOG_OUT: // reset the state in the store
      return {};
    default:
      return state;
  }
}

export function editUserReducer(state = {}, action){
  switch (action.type) {
    case EDIT_USER:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function getShoppingListReducer(state = {}, action){
  switch (action.type) {
    case FETCH_SHOPPING_LIST:
      return action.payload.data.list;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function addNewShoppingListReducer(state = {}, action){
  switch (action.type) {
    case ADD_NEW_SHOPPING_LIST:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function editShoppingListReducer(state = {}, action){
  switch (action.type) {
    case EDIT_SHOPPING_LIST:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function deleteShoppingListReducer(state = {}, action){
  switch (action.type) {
    case DELETE_SHOPPING_LIST:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function deleteShoppingListItemReducer(state = {}, action){
  switch (action.type) {
    case DELETE_SHOPPING_LIST_ITEM:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function getShoppingListsReducer(state = {}, action){
  switch (action.type) {
    case FETCH_SHOPPING_LISTS:
    case FETCH_SHOPPING_LISTS_ON_A_PAGE:
      // console.log(action.payload.data);
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function addNewItemReducer(state = {}, action){
  switch (action.type) {
    case ADD_NEW_ITEM:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function getShoppingListItemsReducer(state = {}, action){
  switch (action.type) {
    case FETCH_SHOPPING_LIST_ITEMS:
      try {
        return action.payload.data.items;
      } catch (e) {
        return state;
      }
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export function editShoppingListItemReducer(state = {}, action){
  switch (action.type) {
    case EDIT_SHOPPING_LIST_ITEM:
      return action.payload.data;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}
