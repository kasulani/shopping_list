import expect from "expect";
import * as types from "../actions/types";
import * as reducer from "../reducers/shoppingListsReducer";

describe('Test Shopping Lists Reducers', () => {
    let theAction = {
        type: "",
        payload: {}
    };
    let intialState = {};

    it('has a getUserReducer that returns a user object',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.GET_USER;
        theAction.payload = {
            data:{
                user: {
                    username: "testuser@mail.com", 
                    description: "open source. open mind",
                    num_of_items: 20, num_of_lists: 10
                }
            }
        };
        //
        let state = reducer.getUserReducer(intialState, theAction);
        expect(state.username).toEqual("testuser@mail.com");
        expect(state.description).toEqual("open source. open mind");
        expect(state.num_of_items).toEqual(20);
        expect(state.num_of_lists).toEqual(10);
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a editUserReducer that returns an edited user object',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.EDIT_USER;
        theAction.payload = {
            data:{
                status: "pass", 
                message: "user updated"
            }
        };
        //
        let state = reducer.editUserReducer(intialState, theAction);
        expect(state.status).toEqual("pass");
        expect(state.message).toEqual("user updated");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a getShoppingListReducer that returns a list object',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.FETCH_SHOPPING_LIST;
        theAction.payload = {
            data:{
                list: {id: "1",title: "test list", description: "this is a test list"}
            }
        };
        //
        let state = reducer.getShoppingListReducer(intialState, theAction);
        expect(state.id).toEqual("1");
        expect(state.title).toEqual("test list");
        expect(state.description).toEqual("this is a test list");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a addNewShoppingListReducer that returns a new list object',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.ADD_NEW_SHOPPING_LIST;
        theAction.payload = {
            data:{
                id: "5",title: "test list 5", 
                description: "this is a test list 5",
                status: "pass", message: "list created successfully"
            }
        };
        //
        let state = reducer.addNewShoppingListReducer(intialState, theAction);
        expect(state.id).toEqual("5");
        expect(state.title).toEqual("test list 5");
        expect(state.description).toEqual("this is a test list 5");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a editShoppingListReducer that returns a new list object',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.EDIT_SHOPPING_LIST;
        theAction.payload = {
            data:{
                id: "5",title: "test list 5", 
                description: "this is a edited test list 5",
                status: "pass", message: "list updated"
            }
        };
        //
        let state = reducer.editShoppingListReducer(intialState, theAction);
        expect(state.id).toEqual("5");
        expect(state.title).toEqual("test list 5");
        expect(state.description).toEqual("this is a edited test list 5");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a deleteShoppingListReducer',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.DELETE_SHOPPING_LIST;
        theAction.payload = {
            data:{
                status: "pass", message: "list deleted"
            }
        };
        //
        let state = reducer.deleteShoppingListReducer(intialState, theAction);
        expect(state.status).toEqual("pass");
        expect(state.message).toEqual("list deleted");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a deleteShoppingListItemReducer',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.DELETE_SHOPPING_LIST_ITEM;
        theAction.payload = {
            data:{
                status: "pass", message: "item deleted"
            }
        };
        //
        let state = reducer.deleteShoppingListItemReducer(intialState, theAction);
        expect(state.status).toEqual("pass");
        expect(state.message).toEqual("item deleted");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a getShoppingListsReducer',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.FETCH_SHOPPING_LISTS;
        theAction.payload = {
            data:{
                lists: [
                    {id: "3",title: "test list 3", description: "this is a test list 3"},
                    {id: "4",title: "test list 4", description: "this is a test list 4"}
                ],
                next_page: "none",
                previous_page: "none",
                status: "pass", 
                message: "lists found",
                count: "2"
            }
        };
        //
        let state = reducer.getShoppingListsReducer(intialState, theAction);
        expect(state.lists[0].id).toEqual("3");
        expect(state.lists[0].title).toEqual("test list 3");
        expect(state.lists[0].description).toEqual("this is a test list 3");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a addNewItemReducer',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.ADD_NEW_ITEM;
        theAction.payload = {
            data:{
                item_id: "1",
                name: "test item 1",
                description: "this is a test item 1",
                status: "pass", message: "item added to list"
            }
        };
        //
        let state = reducer.addNewItemReducer(intialState, theAction);
        expect(state.item_id).toEqual("1");
        expect(state.name).toEqual("test item 1");
        expect(state.description).toEqual("this is a test item 1");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a getShoppingListItemsReducer',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.FETCH_SHOPPING_LIST_ITEMS;
        theAction.payload = {
            data:{
                items: [{
                    id: "1",
                    name: "test item 1",
                    description: "this is a test item 1",
                    status: "0"
                }]
            }
        };
        //
        let state = reducer.getShoppingListItemsReducer(intialState, theAction);
        expect(state[0].id).toEqual("1");
        expect(state[0].name).toEqual("test item 1");
        expect(state[0].description).toEqual("this is a test item 1");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a editShoppingListItemReducer',()=>{
        // this the type of action object expected to be returned by the action creator
        theAction.type = types.EDIT_SHOPPING_LIST_ITEM;
        theAction.payload = {
            data:{
                item:{
                    id: "1",
                    name: "test item 1 edited",
                    description: "this is an edited test item 1"
                },
                status: "pass", message: "item updated"
            }
        };
        //
        let state = reducer.editShoppingListItemReducer(intialState, theAction);
        expect(state.item.id).toEqual("1");
        expect(state.item.name).toEqual("test item 1 edited");
        expect(state.item.description).toEqual("this is an edited test item 1");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.getUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
});