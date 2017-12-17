import expect from "expect";
import * as types from "../actions/types";
import * as reducer from "../reducers/authReducer";

describe('Test Auth Reducers', () => {
    let theAction = {
        type: "",
        payload: {}
    };
    let intialState = {};

    it('has a authUserReducer',()=>{
        theAction.type = types.LOGIN;
        theAction.payload = {
            data:{
                token: "T0K3N",
                status: "pass",
                message: "login was successful"
            }
        };
        //
        let state = reducer.authUserReducer(intialState, theAction);
        expect(state.token).toEqual("T0K3N");
        expect(state.status).toEqual("pass");
        expect(state.message).toEqual("login was successful");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {
            status: "pass",
            message: "logout was successful"
        };
        state = reducer.authUserReducer(intialState, theAction);
        expect(state.status).toEqual("pass");
        expect(state.message).toEqual("logout was successful");
    });
    it('has a registerUserReducer',()=>{
        theAction.type = types.REGISTER;
        theAction.payload = {
            data:{
                username: "testuser@mail.com",
                status: "pass",
                message: "user account created successfully"
            }
        };
        //
        let state = reducer.registerUserReducer(intialState, theAction);
        expect(state.username).toEqual("testuser@mail.com");
        expect(state.status).toEqual("pass");
        expect(state.message).toEqual("user account created successfully");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.authUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
    it('has a resetPasswordReducer',()=>{
        theAction.type = types.RESET_PASSWORD;
        theAction.payload = {
            data:{
                username: "testuser@mail.com",
                status: "pass",
                message: "password was changed successfully"
            }
        };
        //
        let state = reducer.resetPasswordReducer(intialState, theAction);
        expect(state.username).toEqual("testuser@mail.com");
        expect(state.status).toEqual("pass");
        expect(state.message).toEqual("password was changed successfully");
        //test logout action
        theAction.type = types.LOG_OUT;
        theAction.payload = {};
        state = reducer.authUserReducer(intialState, theAction);
        expect(state).toEqual({});
    });
});