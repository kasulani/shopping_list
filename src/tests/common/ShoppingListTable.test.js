import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import ShoppingListTable from "../../components/common/ShoppingListTable";

let onDeleteCalled = false;

function setup(){
  const props ={
    lists:[
      {
        "id": 7, "title": "React Redux party",
        "description": "My redux party list"
      }
    ], onDeleteClick: () => { onDeleteCalled = true;}
  };
  return shallow(<ShoppingListTable {...props}/>);
}

describe('Run tests on ShoppingListTable component', () => {
  const tableOfLists = setup();
  it('has the correct list title', () => {
    expect(tableOfLists.find('#listTitle').text()).toEqual('React Redux party');
  });
  // edit button
  it('has an edit list button has the correct bootstrap class', () => {
    expect(tableOfLists.find('#editListBtn').props().className).
    toEqual('btn btn-primary btn-xs');
  });
  it('has an edit list button has the correct text', () => {
    expect(tableOfLists.find('#editListBtn').props().children).toEqual('Edit');
  });
  it('has an edit list button pointing to the correct edit list url', () => {
    expect(tableOfLists.find('#editListBtn').props().to).
    toEqual('edit/lists/7');
  });
  // add items button
  it('has an add items button has the correct bootstrap class', () => {
    expect(tableOfLists.find('#addItemBtn').props().className).
    toEqual('btn btn-success btn-xs');
  });
  it('has an add items button has the correct text', () => {
    expect(tableOfLists.find('#addItemBtn').props().children).toEqual('Add Items');
  });
  it('has an add items button pointing to the correct edit list url', () => {
    expect(tableOfLists.find('#addItemBtn').props().to).
    toEqual('add/items/7');
  });
  // View items button
  it('has an View items button has the correct bootstrap class', () => {
    expect(tableOfLists.find('#viewItemBtn').props().className).
    toEqual('btn btn-warning btn-xs');
  });
  it('has an View items button has the correct text', () => {
    expect(tableOfLists.find('#viewItemBtn').props().children).toEqual('View Items');
  });
  it('has an View items button pointing to the correct edit list url', () => {
    expect(tableOfLists.find('#viewItemBtn').props().to).
    toEqual('view/items/7');
  });
  // delete button
  it('has correct bootstrap class for delete button', () => {
    expect(tableOfLists.find('#deleteListBtn').props().className).
    toEqual('btn btn-danger btn-xs');
  });
  it('can call delete list on click handler', () => {
    tableOfLists.find('#deleteListBtn').simulate('click');
    expect(onDeleteCalled).toEqual(true);
  });
});
