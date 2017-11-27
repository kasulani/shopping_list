import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import EditProfileForm from "../../components/common/EditProfileForm";

let onChangeCalled = false;
let onFormSubmitCalled = false;

function setup(){
  const props ={
    ValidationErrorsOfFirstNameField:"some first name error",
    ValueOfFirstNameField:"emmanuel",
    ValidationErrorsOfLastNameField:"some last name error",
    ValueOfLastNameField:"king",
    ValidationErrorsOfDescriptionField:"some description error",
    ValueOfDescriptionField:"the profile description",
    onChangeText: () => { onChangeCalled = true;},
    onFormSubmit: () => { onFormSubmitCalled = true;}, formId: "editProfileForm"
  };
  return shallow(<EditProfileForm {...props}/>);
}

describe('Run tests on EditProfileForm component', () => {
  const editProfileForm = setup();
  // first name field
  it('has the correct label for the first name field', () => {
    expect(editProfileForm.find('#firstname').props().label).
    toEqual('First name');
  });
  it('has the correct name for the first name field', () => {
    expect(editProfileForm.find('#firstname').props().name).
    toEqual('firstName');
  });
  it('has the correct type for the first name field', () => {
    expect(editProfileForm.find('#firstname').props().type).toEqual('text');
  });
  it('has the correct placeholder for the first name field', () => {
    expect(editProfileForm.find('#firstname').props().placeholder).
    toEqual('Enter your first name');
  });
  it('can render the correct value for the first name field', () => {
    expect(editProfileForm.find('#firstname').props().value).
    toEqual('emmanuel');
  });
  it('can render an error on the first name field', () => {
    expect(editProfileForm.find('#firstname').props().error).
    toEqual('some first name error');
  });
  it('can call the on change event handler', () => {
    editProfileForm.find('#firstname').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  // last name field
  it('has the correct label for the last name field', () => {
    expect(editProfileForm.find('#lastname').props().label).toEqual('Last name');
  });
  it('has the correct name for the last name field', () => {
    expect(editProfileForm.find('#lastname').props().name).toEqual('lastName');
  });
  it('has the correct type for the last name field', () => {
    expect(editProfileForm.find('#lastname').props().type).toEqual('text');
  });
  it('has the correct placeholder for the last name field', () => {
    expect(editProfileForm.find('#lastname').props().placeholder).
    toEqual('Enter your last name');
  });
  it('can render the correct value for the last name field', () => {
    expect(editProfileForm.find('#lastname').props().value).
    toEqual('king');
  });
  it('can render an error on the last name field', () => {
    expect(editProfileForm.find('#lastname').props().error).
    toEqual('some last name error');
  });
  it('can call the on change event handler', () => {
    onChangeCalled = false;
    editProfileForm.find('#lastname').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  // description field
  it('has the correct label for the description field', () => {
    expect(editProfileForm.find('#profileDescription').props().label).
    toEqual('Description');
  });
  it('has the correct name for the description field', () => {
    expect(editProfileForm.find('#profileDescription').props().name).
    toEqual('description');
  });
  it('has the correct placeholder for the description field', () => {
    expect(editProfileForm.find('#profileDescription').props().placeholder).
    toEqual('Describe your self in a sentence');
  });
  it('can render the correct value for the description field', () => {
    expect(editProfileForm.find('#profileDescription').props().value).
    toEqual('the profile description');
  });
  it('can render an error on the description field', () => {
    expect(editProfileForm.find('#profileDescription').props().error).
    toEqual('some description error');
  });
  it('can call the on change event handler', () => {
    onChangeCalled = false;
    editProfileForm.find('#profileDescription').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  //
  it('has the correct form id', () => {
    expect(editProfileForm.find('form').props().id).
    toEqual('editProfileForm');
  });
  it('can call the on form submit event handler', () => {
    editProfileForm.find('form').simulate('submit');
    expect(onFormSubmitCalled).toEqual(true);
  });
});
