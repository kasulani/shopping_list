import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import TextArea from "../../components/common/TextArea";

let onChangeCalled = false;

function setup(errorMsg){
  const props ={
    label:"subcounty", name:"customName", rows:"3", placeholder:"your subcounty",
    value:"busega", onChange: () => { onChangeCalled = true;},
    error: errorMsg
  };
  return shallow(<TextArea {...props}/>);
}

describe('Run tests on TextArea component', () => {
  const testArea = setup("some error msg");
  it('has the correct label', () => {
    expect(testArea.find('label').text()).toEqual('subcounty');
  });
  it('has the correct rows for the TextArea', () => {
    expect(testArea.find('textarea').props().rows).toEqual('3');
  });
  it('has the correct placeholder', () => {
    expect(testArea.find('textarea').props().placeholder).toEqual('your subcounty');
  });
  it('has the correct value', () => {
    expect(testArea.find('textarea').props().value).toEqual('busega');
  });
  it('has the correct name', () => {
    expect(testArea.find('textarea').props().name).toEqual('customName');
  });
  it('can render an error message', () => {
    expect(testArea.find('#fieldAreaError').text()).toEqual('some error msg');
  });
  it('has the correct bootstrap class for the html textarea control', () => {
    expect(testArea.find('textarea').props().className).toEqual('form-control');
  });
  it('has the correct outter bootstrap class for outter div', () => {
    expect(testArea.find('#areaOutWrapper').props().className).toEqual('form-group has-error');
  });
  it('has the correct inner bootstrap class for the inner div around html textarea control', () => {
    expect(testArea.find('#areaInWrapper').props().className).toEqual('field');
  });
  it('can call the on change handler', () => {
    testArea.find('textarea').simulate('change');
    expect(onChangeCalled).toEqual(true);
  });
  it('can render no error message if non is specified', () => {
    const textarea = setup("");
    expect(textarea.find('#fieldAreaError').text()).toEqual('');
    expect(textarea.find('#areaOutWrapper').props().className).toEqual('form-group');
  });
});
