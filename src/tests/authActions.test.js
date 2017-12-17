import expect from "expect";
import * as types from "../actions/types";
import * as actions from "../actions/authActions";
import { AXIOS_INSTANCE } from "../configs";
import promiseMiddleware from "redux-promise";
import configureMockStore from 'redux-mock-store';
import moxios from "moxios";

describe('Test Auth Action Creators', () => {
    beforeEach(() => {
        moxios.install(AXIOS_INSTANCE);
    });
    afterEach(() => {
        moxios.uninstall(AXIOS_INSTANCE);
    });

    const middlewares = [promiseMiddleware];
    const mockStore = configureMockStore(middlewares);
    it('should create a LOGIN action', () => { 
        const user = {
            username: "testuser@mail.com",
            password: "pass2"
        };
        const payload = {
            username: "testuser@mail.com", 
            status: "pass",
            message: "login was successful"
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
            type: types.LOGIN,
            payload: payload
        };
        return store.dispatch(actions.authUser(user,"login")).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a LOG_OUT action', () => { 
        const user = {
            username: "testuser@mail.com",
            password: "pass2"
        };
        // const payload = {
        //     username: "testuser@mail.com", 
        //     status: "pass",
        //     message: "user account created successfully"
        // };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: user
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.LOG_OUT,
            payload: user
        };
        return store.dispatch(actions.authUser(user,"logout")).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a REGISTER action', () => { 
        const user = {
            username: "testuser@mail.com",
            password: "password"
        };
        const payload = {
            username: "testuser@mail.com", 
            status: "pass",
            message: "user account created successfully"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: user
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.REGISTER,
            payload: user
        };
        return store.dispatch(actions.registerUser(user,()=>{})).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
    it('should create a RESET_PASSWORD action', () => { 
        const user = {
            username: "testuser@mail.com",
            old_password: "password1",
            new_password: "password2"
        };
        const payload = {
            username: "testuser@mail.com", 
            status: "pass",
            message: "password was changed successfully"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: user
            });
        });
        const store = mockStore({});
        const expectedAction = {
            type: types.RESET_PASSWORD,
            payload: user
        };
        return store.dispatch(actions.resetPassword(user)).then(()=>{
            const action = store.getActions();
            //assert
            expect(action[0].type).toEqual(expectedAction.type);
            expect(action[0].payload.data).toEqual(expectedAction.payload);  
        });
    });
});