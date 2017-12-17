import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import {SignupPage, mapStateToProps, mapDispatchToProps} from "../components/signup/SignupPage";
import store from "../store/configStore";

let registerUserCalled = false;

function configProps(){
    const props = {
        registerUser: () => { registerUserCalled = true; return Promise.resolve();}
    };
    return props;
}

describe('Run tests on SignupPage component', () => {
    const signupPage = mount(<SignupPage {...configProps()}/>);
    // test markup elements
    it('has a signup form', () => {
        expect(signupPage.find('form').length).toBe(1);
    });
    it('has the required login fields on the login form', () => {
        expect(signupPage.find('TextInput').first().props().name).toBe("username");
        expect(signupPage.find({name: 'password1'}).props().name).toBe("password1");
        expect(signupPage.find('TextInput').last().props().name).toBe("password2");
    });
    // test errors are rendered
    signupPage.find('form').simulate('submit');
    it('can render a username field error if the username is not entered', ()=>{
        expect(signupPage.state().errors.username).toEqual("Please enter a valid email address");
    });
    it('can render a password field error if the passwords are not entered', ()=>{
        expect(signupPage.state().errors.password1).toEqual("Please enter a password");
        expect(signupPage.state().errors.password2).toEqual("Please enter a password");
    });
    // test on change event handler
    it('can set the value of the username field', ()=>{
        const field = signupPage.find('TextInput').first().find('input');
        field.node.value = "testuser@mail.com";
        field.simulate('change', field);
        expect(signupPage.state().newUser.username).toEqual("testuser@mail.com");
    });
    it('can set the value of the password field', ()=>{
        const field = signupPage.find({name: 'password1'});
        field.node.value = "password";
        field.simulate('change', field);
        expect(signupPage.state().newUser.password1).toEqual("password");
    });
    it('can set the value of the confirm password field', ()=>{
        const field = signupPage.find({name: 'password2'});
        field.node.value = "password";
        field.simulate('change', field);
        expect(signupPage.state().newUser.password1).toEqual("password");
    });
    //test password validation error
    it('can validate that the two passwords are the same', ()=>{
        const field1 = signupPage.find({name: 'password1'});
        field1.node.value = "password1";
        field1.simulate('change', field1);
        //
        const field2 = signupPage.find({name: 'password2'});
        field2.node.value = "password2";
        field2.simulate('change', field2);
        //
        signupPage.find('form').simulate('submit');
        expect(signupPage.state().errors.password1).toEqual("Please make sure these passwords match");
        expect(signupPage.state().errors.password2).toEqual("Please make sure these passwords match");
    });
    // test mapStateToProps
    it('mapStateToProps behaves correctly', ()=>{
        const state = {
            newUser: {
                username: "testuser@mail.com",
                status: "pass",
                message: "user account created successfully"
            }
        };
        const expected = {
            newUser: state.newUser
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
    it('mapDispatchToProps behaves correctly', ()=>{
        mapDispatchToProps(store.dispatch);
    });
});