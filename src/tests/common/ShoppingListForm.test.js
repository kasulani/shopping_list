import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import ShoppingListForm from "../../components/common/ShoppingListForm";

let onChangeCalled = false;
let onFormSubmitCalled = false;

function setup(){
  const props ={
    ValueOfDescriptionField:"some description",
    ValidationErrorsOfDescriptionField:"some description error",
    ValueOfNameField:"some list name", onChangeText: () => { onChangeCalled = true;},
    ValidationErrorsOfNameField: "some list name error",
    onFormSubmit: () => { onFormSubmitCalled = true;}, formId: "shopForm"
  };
  return shallow(<ShoppingListForm {...props}/>);
}

describe('Run tests on ShoppingListForm component', () => {
  const shopListForm = setup();

  it('has the correct label for the list name field', () => {
    expect(shopListForm.find('#nameOfList').props().label).toEqual('List name');
  });
  it('has the correct name for the list name field', () => {
    expect(shopListForm.find('#nameOfList').props().name).toEqual('listName');
  });
  it('has the correct type for the list name field', () => {
    expect(shopListForm.find('#nameOfList').props().type).toEqual('text');
  });
  it('has the correct placeholder for the list name field', () => {
    expect(shopListForm.find('#nameOfList').props().placeholder).
    toEqual('Enter a unique name for your list');
  });
  it('can render the correct value for the list name field', () => {
    expect(shopListForm.find('#nameOfList').props().value).
    toEqual('some list name');
  });
  it('can render an error on the list name field', () => {
    expect(shopListForm.find('#nameOfList').props().error).
    toEqual('some list name error');
  });
  it('can call the on change event handler', () => {
    shopListForm.find('#nameOfList').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  //
  it('has the correct label for the description field', () => {
    expect(shopListForm.find('#descriptionOfList').props().label).
    toEqual('Description');
  });
  it('has the correct name for the description field', () => {
    expect(shopListForm.find('#descriptionOfList').props().name).
    toEqual('listDescription');
  });
  it('has the correct placeholder for the description field', () => {
    expect(shopListForm.find('#descriptionOfList').props().placeholder).
    toEqual('Enter a short description about your list');
  });
  it('can render the correct value for the description field', () => {
    expect(shopListForm.find('#descriptionOfList').props().value).
    toEqual('some description');
  });
  it('can render an error on the description field', () => {
    expect(shopListForm.find('#descriptionOfList').props().error).
    toEqual('some description error');
  });
  it('can call the on change event handler', () => {
    onChangeCalled = false;
    shopListForm.find('#descriptionOfList').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  //
  it('has the correct form id', () => {
    expect(shopListForm.find('form').props().id).
    toEqual('shopForm');
  });
  it('can call the on form submit event handler', () => {
    shopListForm.find('form').simulate('submit');
    expect(onFormSubmitCalled).toEqual(true);
  });
});
