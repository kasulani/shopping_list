import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import SubmitButton from "../../components/common/SubmitButton";

function setup(){
  const props ={
    formId:"testForm", buttonText:"Save"
  };
  return shallow(<SubmitButton {...props}/>);
}

describe('Run tests on SubmitButton component', () => {
  const textField = setup();
  it('has the correct button bootstrap class', () => {
    expect(textField.find('button').props().className).
    toEqual('btn btn-sm btn-primary pull-right');
  });
  it('has the correct form id', () => {
    expect(textField.find('button').props().form).toEqual('testForm');
  });
  it('has the correct button type set as submit', () => {
    expect(textField.find('button').props().type).toEqual('submit');
  });
  it('shows the correct button text', () => {
    expect(textField.find('button').text()).toEqual('Save');
  });
});
