import expect from "expect";
import * as types from "../actions/types";
import * as actions from "../actions/shoppingListsActions";
import { AXIOS_INSTANCE } from "../configs";
import promiseMiddleware from "redux-promise";
import configureMockStore from 'redux-mock-store';
// import nock from "nock";
import moxios from "moxios";

describe('Test Shopping Lists Action Creators', () => {
    beforeEach(() => {
        moxios.install(AXIOS_INSTANCE);
    });
    afterEach(() => {
        moxios.uninstall(AXIOS_INSTANCE);
    });

    const middlewares = [promiseMiddleware];
    const mockStore = configureMockStore(middlewares);
    it('should create a GET_USER action', () => { 
        const payload = {
            username: "testuser@mail.com", 
            description: "open source. open mind",
            num_of_items: 20, num_of_lists: 10
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.GET_USER,
            payload: payload
        };
        return store.dispatch(actions.getUser()).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a EDIT_USER action', () => {
        const editedUser = {
            firstname: "test",
            lastname: "user",
            description: "this is a test user"
        };
        const payload = {
            status: "pass", 
            message: "user updated"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.EDIT_USER,
            payload: payload
        };
        return store.dispatch(actions.editUser(editedUser)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a FETCH_SHOPPING_LIST action', () => {
        const payload = {
            list: {id: "1",title: "test list", description: "this is a test list"},
            status: "pass", 
            message: "list found",
            count: "1"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.FETCH_SHOPPING_LIST,
            payload: payload
        };
        return store.dispatch(actions.getShoppingList(1)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a FETCH_SHOPPING_LISTS_ON_A_PAGE action', () => {
        const payload = {
            list: {id: "2",title: "test list 2", description: "this is a test list 2"},
            status: "pass", 
            message: "list found",
            count: "1"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.FETCH_SHOPPING_LISTS_ON_A_PAGE,
            payload: payload
        };
        return store.dispatch(actions.getListsOnPage('/shoppinglists?page=2')).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a FETCH_SHOPPING_LISTS action', () => {
        const payload = {
            lists: [
                {id: "3",title: "test list 3", description: "this is a test list 3"},
                {id: "4",title: "test list 4", description: "this is a test list 4"}
            ],
            next_page: "none",
            previous_page: "none",
            status: "pass", 
            message: "lists found",
            count: "2"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.FETCH_SHOPPING_LISTS,
            payload: payload
        };
        return store.dispatch(actions.getShoppingLists()).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a ADD_NEW_SHOPPING_LIST action', () => {
        const newList = {
            name: "test list 5",
            description: "this is a test list 5"
        };
        const payload = {
            id: "5",title: "test list 5", 
            description: "this is a test list 5",
            status: "pass", message: "list created successfully"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.ADD_NEW_SHOPPING_LIST,
            payload: payload
        };
        return store.dispatch(actions.addNewShoppingList(newList)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a EDIT_SHOPPING_LIST action', () => {
        const editedList = {
            id:"5",
            name: "test list 5",
            description: "this is a edited test list 5"
        };
        const payload = {
            id: "5",title: "test list 5", 
            description: "this is a edited test list 5",
            status: "pass", message: "list updated"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.EDIT_SHOPPING_LIST,
            payload: payload
        };
        return store.dispatch(actions.editShoppingList(editedList)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a DELETE_SHOPPING_LIST action', () => {
        const payload = {
            status: "pass", message: "list deleted"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.DELETE_SHOPPING_LIST,
            payload: payload
        };
        return store.dispatch(actions.deleteShoppingList(1)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a DELETE_SHOPPING_LIST_ITEM action', () => {
        const payload = {
            status: "pass", message: "item deleted"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.DELETE_SHOPPING_LIST_ITEM,
            payload: payload
        };
        return store.dispatch(actions.deleteShoppingListItem(1,1)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a ADD_NEW_ITEM action', () => {
        const item = {
            shoppingListId: "1",
            name: "test item 1",
            description: "this is a test item 1"
        };
        const payload = {
            item_id: "1",
            name: "test item 1",
            description: "this is a test item 1",
            status: "pass", message: "item added to list"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.ADD_NEW_ITEM,
            payload: payload
        };
        return store.dispatch(actions.addNewItem(item)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a FETCH_SHOPPING_LIST_ITEMS action', () => {
        const payload = [{
            id: "1",
            name: "test item 1",
            description: "this is a test item 1",
            status: "0"
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.FETCH_SHOPPING_LIST_ITEMS,
            payload: payload
        };
        return store.dispatch(actions.getShoppingListItems(1)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    // it('should handle a 404 error on a FETCH_SHOPPING_LIST_ITEMS action', () => {
    //     const payload = {
    //         count: "0",
    //         message: "items not found",
    //         status: "fail"
    //     };
    //     moxios.wait(() => {
    //         const request = moxios.requests.mostRecent();
    //         request.respondWith({
    //           status: 404,
    //           response: Promise.reject()
    //         });
    //     });
    //     const store = mockStore({});
    //     const expectedAction = {
    //         type: types.FETCH_SHOPPING_LIST_ITEMS,
    //         payload: Promise.reject()
    //     };
    //     return store.dispatch(actions.getShoppingListItems(1)).then(()=>{
    //         const action = store.getActions();
    //         //assert
    //         // expect(action[0].type).toEqual(expectedAction.type);
    //         // expect(action[0].payload.data).toEqual(expectedAction.payload);  
    //     });
    // });
    it('should create a EDIT_SHOPPING_LIST_ITEM action', () => {
        const editedListItem = {
            itemId: "1",
            name: "test item 1 edited",
            description: "this is an edited test item 1"
        };
        const payload = {
            item:{
                id: "1",
                name: "test item 1 edited",
                description: "this is an edited test item 1"
            },
            status: "pass", message: "item updated"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: payload
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.EDIT_SHOPPING_LIST_ITEM,
            payload: payload
        };
        return store.dispatch(actions.editShoppingListItem(editedListItem)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
});