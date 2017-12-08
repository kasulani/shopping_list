import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import {HomePage, mapStateToProps, mapDispatchToProps} from "../components/home/HomePage";
import store from "../store/configStore";

let authUserCalled = false;

function configProps(){
    const props = {
        token: "",
        message: "",
        status: "",
        authUser: () => { authUserCalled = true; return Promise.resolve();}
    };
    return props;
}

describe('Run tests on HomePage component', () => {
    const homePage = mount(<HomePage {...configProps()}/>);
    // test markup elements
    it('has a login form', () => {
        expect(homePage.find('form').length).toBe(1);
    });
    it('has the required login fields on the login form', () => {
        expect(homePage.find('TextInput').first().props().name).toBe("username");
        expect(homePage.find('TextInput').last().props().name).toBe("password");
    });
    // test errors are rendered
    homePage.find('form').simulate('submit');
    it('can render a username field error if the username is not entered', ()=>{
        expect(homePage.state().errors.username).toEqual("Please enter a valid email address");
    });
    it('can render a password field error if the password is not entered', ()=>{
        expect(homePage.state().errors.password).toEqual("Please enter a password");
    });
    // test on change event handler
    it('it can set the value of the username', ()=>{
        const field = homePage.find('TextInput').first().find('input');
        field.node.value = "testuser@mail.com";
        field.simulate('change', field);
        expect(homePage.state().user.username).toEqual("testuser@mail.com");
    });
    it('it can set the value of the password', ()=>{
        const field = homePage.find('TextInput').last().find('input');
        field.node.value = "password";
        field.simulate('change', field);
        expect(homePage.state().user.password).toEqual("password");
    });
    //
    it('can invoke the authUser action creator', ()=>{
        let field = homePage.find('TextInput').first().find('input');
        field.node.value = "testuser@mail.com";
        field.simulate('change', field);
        field = homePage.find('TextInput').last().find('input');
        field.node.value = "password";
        field.simulate('change', field);
        homePage.find('form').simulate('submit');
        expect(authUserCalled).toEqual(true);
    });
    // test mapStateToProps
    it('mapStateToProps behaves correctly', ()=>{
        const state = {
            user: {
                token: "T0K3n",
                status: "pass",
                message: "login was successful"
            }
        };
        const expected = {
            token: "T0K3n",
            status: "pass",
            message: "login was successful"
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
    it('mapDispatchToProps behaves correctly', ()=>{
        mapDispatchToProps(store.dispatch);
      });
});