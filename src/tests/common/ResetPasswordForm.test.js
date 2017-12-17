import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import ResetPasswordForm from "../../components/common/ResetPasswordForm";

let onChangeCalled = false;
let onFormSubmitCalled = false;

function setup(){
  const props ={
    ValidationErrorsOfOldPasswordField:"some old password error",
    ValueOfOldPasswordField:"old-password",
    ValidationErrorsOfNewPasswordField:"some new password error",
    ValueOfNewPasswordField:"new-password",
    ValidationErrorsOfConfirmPasswordField:"some confirm password error",
    ValueOfConfirmPasswordField:"confirm-password",
    onChangeText: () => { onChangeCalled = true;},
    onFormSubmit: () => { onFormSubmitCalled = true;}, formId: "resetForm"
  };
  return shallow(<ResetPasswordForm {...props}/>);
}

describe('Run tests on ResetPasswordForm component', () => {
  const passwordResetForm = setup();
  // old password field
  it('has the correct label for the old password field', () => {
    expect(passwordResetForm.find('#password1').props().label).toEqual('Old password');
  });
  it('has the correct name for the old password field', () => {
    expect(passwordResetForm.find('#password1').props().name).toEqual('oldPassword');
  });
  it('has the correct type for the old password field', () => {
    expect(passwordResetForm.find('#password1').props().type).toEqual('password');
  });
  it('has the correct placeholder for the old password field', () => {
    expect(passwordResetForm.find('#password1').props().placeholder).
    toEqual('Enter your old password here');
  });
  it('can render the correct value for the old password field', () => {
    expect(passwordResetForm.find('#password1').props().value).
    toEqual('old-password');
  });
  it('can render an error on the old password field', () => {
    expect(passwordResetForm.find('#password1').props().error).
    toEqual('some old password error');
  });
  it('can call the on change event handler', () => {
    passwordResetForm.find('#password1').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  // new password field
  it('has the correct label for the new password field', () => {
    expect(passwordResetForm.find('#password2').props().label).toEqual('New password');
  });
  it('has the correct name for the new password field', () => {
    expect(passwordResetForm.find('#password2').props().name).toEqual('newPassword');
  });
  it('has the correct type for the new password field', () => {
    expect(passwordResetForm.find('#password2').props().type).toEqual('password');
  });
  it('has the correct placeholder for the new password field', () => {
    expect(passwordResetForm.find('#password2').props().placeholder).
    toEqual('Enter your new password here');
  });
  it('can render the correct value for the new password field', () => {
    expect(passwordResetForm.find('#password2').props().value).
    toEqual('new-password');
  });
  it('can render an error on the new password field', () => {
    expect(passwordResetForm.find('#password2').props().error).
    toEqual('some new password error');
  });
  it('can call the on change event handler', () => {
    onChangeCalled = false;
    passwordResetForm.find('#password2').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  // confirm password field
  it('has the correct label for the confirm password field', () => {
    expect(passwordResetForm.find('#password3').props().label).
    toEqual('Confirm password');
  });
  it('has the correct name for the confirm password field', () => {
    expect(passwordResetForm.find('#password3').props().name).
    toEqual('confirmPassword');
  });
  it('has the correct type for the confirm password field', () => {
    expect(passwordResetForm.find('#password3').props().type).
    toEqual('password');
  });
  it('has the correct placeholder for the confirm password field', () => {
    expect(passwordResetForm.find('#password3').props().placeholder).
    toEqual('Enter your new password here again');
  });
  it('can render the correct value for the confirm password field', () => {
    expect(passwordResetForm.find('#password3').props().value).
    toEqual('confirm-password');
  });
  it('can render an error on the confirm password field', () => {
    expect(passwordResetForm.find('#password3').props().error).
    toEqual('some confirm password error');
  });
  it('can call the on change event handler', () => {
    onChangeCalled = false;
    passwordResetForm.find('#password3').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  //
  it('has the correct form id', () => {
    expect(passwordResetForm.find('form').props().id).
    toEqual('resetForm');
  });
  it('can call the on form submit event handler', () => {
    passwordResetForm.find('form').simulate('submit');
    expect(onFormSubmitCalled).toEqual(true);
  });
});
