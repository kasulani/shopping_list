import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import TextInput from "../../components/common/TextInput";

let onChangeCalled = false;

function setup(errorMsg){
  const props ={
    label:"city", name:"theName", type:"text", placeholder:"your city",
    value:"kampala", onChange: () => { onChangeCalled = true;},
    error: errorMsg
  };
  return shallow(<TextInput {...props}/>);
}

describe('Run tests on TextInput component', () => {
  const textField = setup("some error msg");
  it('has the correct label', () => {
    expect(textField.find('label').text()).toEqual('city');
  });
  it('has the correct input type', () => {
    expect(textField.find('input').props().type).toEqual('text');
  });
  it('has the correct placeholder', () => {
    expect(textField.find('input').props().placeholder).toEqual('your city');
  });
  it('has the correct value', () => {
    expect(textField.find('input').props().value).toEqual('kampala');
  });
  it('has the correct name', () => {
    expect(textField.find('input').props().name).toEqual('theName');
  });
  it('can render an error message', () => {
    expect(textField.find('#fieldError').text()).toEqual('some error msg');
  });
  it('has the correct bootstrap class for the html input control', () => {
    expect(textField.find('input').props().className).toEqual('form-control');
  });
  it('has the correct outter bootstrap class for outter div', () => {
    expect(textField.find('#inputOutWrapper').props().className).toEqual('form-group has-error');
  });
  it('has the correct inner bootstrap class for the inner div around html input control', () => {
    expect(textField.find('#inputInWrapper').props().className).toEqual('field');
  });
  it('can call the on change handler', () => {
    textField.find('input').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  it('can render no error message if non is specified', () => {
    const field = setup("");
    expect(field.find('#fieldError').text()).toEqual('');
    expect(field.find('#inputOutWrapper').props().className).toEqual('form-group');
  });
});
