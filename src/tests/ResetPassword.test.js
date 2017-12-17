import expect from "expect";
import React from "react";
import { mount, shallow } from "enzyme";
import { ResetPassword, mapStateToProps, mapDispatchToProps } from "../components/profile/ResetPassword";
import store from "../store/configStore";

let userDetails = {
    username: "testuser@mail.com", description: "",
    firstname: "", lastname: "",
    num_of_items: 200, num_of_lists: 100
};

let resetPasswordCalled = false;

function configProps(status, msg) {
    const props = {
        userDetails: userDetails,
        status: status,
        message: msg,
        resetPassword: () => { resetPasswordCalled = true; return Promise.resolve(); }
    };
    return props;
}

function formSubmitWithData(status, msg){
    const reset = mount(<ResetPassword {...configProps(status, msg) } />);
    const field1 = reset.find('TextInput').first().find('input');
    field1.node.value = "oldpassword";
    field1.simulate('change', field1);
    //
    const field2 = reset.find({name: 'newPassword'});
    field2.node.value = "newpassword";
    field2.simulate('change', field2);
    //
    const field3 = reset.find('TextInput').last().find('input');
    field3.node.value = "newpassword";
    field3.simulate('change', field3);
    reset.find('ResetPasswordForm').find('#resetPassword').simulate('submit');
    //
    expect(reset.props().status).toEqual(status);
    expect(reset.state().user.oldPassword).toEqual("oldpassword");
    expect(reset.state().user.newPassword).toEqual("newpassword");
    expect(reset.state().user.confirmPassword).toEqual("newpassword");
}

describe('Run tests on Reset password component', () => {
    const resetPassword = mount(<ResetPassword {...configProps("pass", "password reset") } />);
    // test markup
    it('has a user profile section', () => {
        expect(resetPassword.find('UserProfile').length).toBe(1);
    });
    it('has a list container', () => {
        expect(resetPassword.find('ListContainer').length).toBe(1);
    });
    it('has a list container that shows the correct title when the table has shopping lists', () => {
        expect(resetPassword.find('ListContainer').
            find('h3').text()).toBe(' Reset your password ');
    });
    it('has a reset password form', () => {
        expect(resetPassword.find('ResetPasswordForm').length).toBe(1);
    });
    it('has a Reset Password button', () => {
        expect(resetPassword.find('SubmitButton').length).toBe(1);
    });
    it('has a back button', () => {
        expect(resetPassword.find('Link').last().text()).toBe("Back");
    });
    // test errors are rendered
    resetPassword.find('ResetPasswordForm').find('#resetPassword').simulate('submit');
    it('can render a oldPassword field error if the old password is not entered', ()=>{
        expect(resetPassword.state().errors.oldPassword)
            .toEqual("Please enter your old password here");
    });
    it('can render a newPassword field error if the new password is not entered', ()=>{
        expect(resetPassword.state().errors.newPassword)
            .toEqual("Please enter your new password here. Password should be 5 or more characters long");
    });
    it('can render a confirmPassword field error if the confirm password is not entered', ()=>{
        expect(resetPassword.state().errors.confirmPassword)
            .toEqual("Please confirm your new password here. Password should be 5 or more characters long");
    });
    // test on change event handler
    it('can set the value of the old password field', ()=>{
        const field = resetPassword.find('TextInput').first().find('input');
        field.node.value = "oldpassword";
        field.simulate('change', field);
        expect(resetPassword.state().user.oldPassword).toEqual("oldpassword");
    });
    it('can set the value of the new password field', ()=>{
        const field = resetPassword.find({name: 'newPassword'});
        field.node.value = "newpassword";
        field.simulate('change', field);
        expect(resetPassword.state().user.newPassword).toEqual("newpassword");
    });
    it('can set the value of the confirm password field', ()=>{
        const field = resetPassword.find('TextInput').last().find('input');
        field.node.value = "newpassword";
        field.simulate('change', field);
        expect(resetPassword.state().user.confirmPassword).toEqual("newpassword");
    });
    // test formsubmit with status fail
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("fail", "password has not been updated");
    });
    // test formsubmit with status pass
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("pass", "password updated");
    });
    // test mapStateToProps
    it('mapStateToProps behaves correctly', () => {
        const state = {
            userDetails: userDetails,
            resetPass: {
                status: "pass",
                message: "password reset"
            }
        };
        const expected = {
            userDetails: state.userDetails,
            status: state.resetPass.status,
            message: state.resetPass.message
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
    it('mapDispatchToProps behaves correctly', () => {
        mapDispatchToProps(store.dispatch);
    });
});