import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import SubmitButton from "../../components/common/SubmitButton";

function setup(btnClass){
  const props ={
    formId:"testForm", buttonText:"Save", buttonClass: btnClass
  };
  return shallow(<SubmitButton {...props}/>);
}

describe('Run tests on SubmitButton component', () => {
  const submitBtn = setup("");
  it('has the correct button bootstrap class', () => {
    expect(submitBtn.find('button').props().className).
    toEqual('btn btn-sm btn-primary pull-right');
  });
  it('has the correct form id', () => {
    expect(submitBtn.find('button').props().form).toEqual('testForm');
  });
  it('has the correct button type set as submit', () => {
    expect(submitBtn.find('button').props().type).toEqual('submit');
  });
  it('shows the correct button text', () => {
    expect(submitBtn.find('button').text()).toEqual('Save');
  });
  it('can change the button bootstrap class', () => {
    const btn = setup("btn btn-sm btn-primary pull-left");
    expect(btn.find('button').props().className).
    toEqual('btn btn-sm btn-primary pull-left');
  });
});
