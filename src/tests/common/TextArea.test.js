import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import TextArea from "../../components/common/TextArea";

let onChangeCalled = false;

function setup(){
  const props ={
    label:"subcounty", name:"customName", rows:"3", placeholder:"your subcounty",
    value:"busega", onChange: () => { onChangeCalled = true;},
    error: "some error msg"
  };
  return shallow(<TextArea {...props}/>);
}

describe('Run tests on TextArea component', () => {
  const textField = setup();
  it('has the correct label', () => {
    expect(textField.find('label').text()).toEqual('subcounty');
  });
  it('has the correct rows for the TextArea', () => {
    expect(textField.find('textarea').props().rows).toEqual('3');
  });
  it('has the correct placeholder', () => {
    expect(textField.find('textarea').props().placeholder).toEqual('your subcounty');
  });
  it('has the correct value', () => {
    expect(textField.find('textarea').props().value).toEqual('busega');
  });
  it('has the correct name', () => {
    expect(textField.find('textarea').props().name).toEqual('customName');
  });
  it('can render an error message', () => {
    expect(textField.find('#fieldAreaError').text()).toEqual('some error msg');
  });
  it('has the correct bootstrap class for the html textarea control', () => {
    expect(textField.find('textarea').props().className).toEqual('form-control');
  });
  it('has the correct outter bootstrap class for outter div', () => {
    expect(textField.find('#areaOutWrapper').props().className).toEqual('form-group has-error');
  });
  it('has the correct inner bootstrap class for the inner div around html textarea control', () => {
    expect(textField.find('#areaInWrapper').props().className).toEqual('field');
  });
  it('can call the on change handler', () => {
    textField.find('textarea').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
});
