import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import ListItemForm from "../../components/common/ListItemForm";

let onChangeCalled = false;
let onFormSubmitCalled = false;

function setup(){
  const props ={
    ValueOfDescriptionField:"some description",
    ValidationErrorsOfDescriptionField:"some description error",
    ValueOfNameField:"some item name", onChangeText: () => { onChangeCalled = true;},
    ValidationErrorsOfNameField: "some item name error",
    onFormSubmit: () => { onFormSubmitCalled = true;}, formId: "itemForm"
  };
  return shallow(<ListItemForm {...props}/>);
}

describe('Run tests on ListItemForm component', () => {
  const itemForm = setup();

  it('has the correct label for the item name field', () => {
    expect(itemForm.find('#nameOfItem').props().label).toEqual('Item name');
  });
  it('has the correct name for the item name field', () => {
    expect(itemForm.find('#nameOfItem').props().name).toEqual('itemName');
  });
  it('has the correct type for the item name field', () => {
    expect(itemForm.find('#nameOfItem').props().type).toEqual('text');
  });
  it('has the correct placeholder for the item name field', () => {
    expect(itemForm.find('#nameOfItem').props().placeholder).
    toEqual('Enter a unique name for your item');
  });
  it('can render the correct value for the item name field', () => {
    expect(itemForm.find('#nameOfItem').props().value).
    toEqual('some item name');
  });
  it('can render an error on the item name field', () => {
    expect(itemForm.find('#nameOfItem').props().error).
    toEqual('some item name error');
  });
  it('can call the on change event handler', () => {
    itemForm.find('#nameOfItem').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  //
  it('has the correct label for the description field', () => {
    expect(itemForm.find('#descriptionOfItem').props().label).
    toEqual('Description');
  });
  it('has the correct name for the description field', () => {
    expect(itemForm.find('#descriptionOfItem').props().name).
    toEqual('itemDescription');
  });
  it('has the correct placeholder for the description field', () => {
    expect(itemForm.find('#descriptionOfItem').props().placeholder).
    toEqual('Enter a short description about your item');
  });
  it('can render the correct value for the description field', () => {
    expect(itemForm.find('#descriptionOfItem').props().value).
    toEqual('some description');
  });
  it('can render an error on the description field', () => {
    expect(itemForm.find('#descriptionOfItem').props().error).
    toEqual('some description error');
  });
  it('can call the on change event handler', () => {
    onChangeCalled = false;
    itemForm.find('#descriptionOfItem').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  //
  it('has the correct form id', () => {
    expect(itemForm.find('form').props().id).
    toEqual('itemForm');
  });
  it('can call the on form submit event handler', () => {
    itemForm.find('form').simulate('submit');
    expect(onFormSubmitCalled).toEqual(true);
  });
});
