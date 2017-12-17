import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import DeleteModal from "../../components/common/DeleteModal";

let onDeleteCalled = false;

function setup(){
  const props ={
    action: "Delete a list",
    message: "You are about to delete a list, are you sure?",
    deleteFunc: () => { onDeleteCalled = true; }
  };
  return shallow(<DeleteModal {...props}/>);
}

describe('Run tests on DeleteModal component', () => {
  const dialogBox = setup();
  it('can render the correct action to the user', () => {
    expect(dialogBox.find('h4').text()).toEqual('Delete a list');
  });
  it('can render the correct message to the user', () => {
    expect(dialogBox.find('p').text()).
    toEqual('You are about to delete a list, are you sure?');
  });
  // cancel button
  it('has a cancel button', () => {
    expect(dialogBox.find('#cancelModalBtn').text()).toEqual('Cancel');
  });
  // delete button
  it('has correct text on the delete button', () => {
    expect(dialogBox.find('#deleteModalBtn').text()).
    toEqual('Yes Delete');
  });
  it('can call delete item on click handler', () => {
    dialogBox.find('#deleteModalBtn').simulate('click');
    expect(onDeleteCalled).toEqual(true);
  });
});
