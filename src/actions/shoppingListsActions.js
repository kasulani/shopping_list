import {
  FETCH_SHOPPING_LISTS,
  FETCH_SHOPPING_LIST,
  ADD_NEW_SHOPPING_LIST, EDIT_SHOPPING_LIST, ADD_NEW_ITEM,
  FETCH_SHOPPING_LIST_ITEMS, EDIT_SHOPPING_LIST_ITEM, DELETE_SHOPPING_LIST,
  GET_USER, DELETE_SHOPPING_LIST_ITEM, EDIT_USER, FETCH_SHOPPING_LISTS_ON_A_PAGE
} from "./types";
import {AXIOS_INSTANCE, errorHandler} from "../configs";

export function getUser(){
  const promise = AXIOS_INSTANCE.get("/users");
  return {
    type:GET_USER,
    payload: promise
  };
}

export function editUser(editedUser){
  const promise = AXIOS_INSTANCE.put("/users", {
    firstname: editedUser.firstname,
    lastname: editedUser.lastname,
    description: editedUser.description
  });

  return {
    type:EDIT_USER,
    payload: promise
  };
}

export function getShoppingList(listId){
  // This methods will return a single list of a logged in user
  let url = "/shoppinglists/"+listId;
  const promise = AXIOS_INSTANCE.get(url);

  return {
    type:FETCH_SHOPPING_LIST,
    payload: promise
  };
}

export function getListsOnPage(url){
  const promise = AXIOS_INSTANCE.get(url);

  return {
    type:FETCH_SHOPPING_LISTS_ON_A_PAGE,
    payload: promise
  };
}

export function getShoppingLists(){
  // This methods will return all lists of a logged in user
  const promise = AXIOS_INSTANCE.get('/shoppinglists');

  return {
    type:FETCH_SHOPPING_LISTS,
    payload: promise
  };
}

export function addNewShoppingList(newList){
  const promise = AXIOS_INSTANCE.post('/shoppinglists',{
    title: newList.name,
    description: newList.description
  });

  return {
    type:ADD_NEW_SHOPPING_LIST,
    payload: promise
  };
}

export function editShoppingList(editedList){
  let url = "/shoppinglists/"+editedList.id;
  const promise = AXIOS_INSTANCE.put(url,{
    title: editedList.name,
    description: editedList.description
  });

  return {
    type:EDIT_SHOPPING_LIST,
    payload: promise
  };
}

export function deleteShoppingList(ListToDelete){
  let url = `/shoppinglists/${ListToDelete}`;
  const promise = AXIOS_INSTANCE.delete(url);

  return {
    type:DELETE_SHOPPING_LIST,
    payload: promise
  };
}

export function deleteShoppingListItem(ItemToDelete, ListId){
  let url = `/shoppinglists/${ListId}/items/${ItemToDelete}`;
  const promise = AXIOS_INSTANCE.delete(url);

  return {
    type:DELETE_SHOPPING_LIST_ITEM,
    payload: promise
  };
}

export function addNewItem(item){
  let url = `/shoppinglists/${item.shoppingListId}/items`;
  const promise = AXIOS_INSTANCE.post(url,{
    name: item.name,
    description: item.description
  });

  return {
    type:ADD_NEW_ITEM,
    payload: promise
  };
}

export function getShoppingListItems(shoppingListId){
  let url = `/shoppinglists/${shoppingListId}/items`;
  const promise = AXIOS_INSTANCE.get(url);
  promise.catch((error)=>{
    // handle error
    errorHandler(error.response.status);
  });

  return {
    type:FETCH_SHOPPING_LIST_ITEMS,
    payload: promise
  };
}

export function editShoppingListItem(editedListItem){
  let url = `/shoppinglists/${editedListItem.listId}/items/${editedListItem.itemId}`;
  const promise = AXIOS_INSTANCE.put(url,{
    name: editedListItem.name,
    description: editedListItem.description
  });

  return {
    type:EDIT_SHOPPING_LIST_ITEM,
    payload: promise
  };
}
