import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import NavBar from "../../components/common/NavBar";

let onSearchTextChangeCalled = false;
let onFormSubmitCalled = false;

function setup(){
  const props ={
    onSearchTextChange: () =>{ onSearchTextChangeCalled = true; },
    searchTerm:"testing",
    onFormSubmit: () =>{ onFormSubmitCalled = true; }
  };
  return shallow(<NavBar {...props}/>);
}

describe('Run tests on NavBar component', () => {
  const navBar = setup();
  it('has the correct button bootstrap class for the previous button', () => {
    expect(navBar.find('input').props().value).toBe('testing');
  });
  it('can call the on search text change event handler', () => {
    navBar.find('input').simulate('change');
    expect(onSearchTextChangeCalled).toEqual(true);
  });
  it('can call the on form submit event handler', () => {
    navBar.find('form').simulate('submit');
    expect(onFormSubmitCalled).toEqual(true);
  });
});
