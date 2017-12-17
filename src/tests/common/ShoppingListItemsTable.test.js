import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import ShoppingListItemsTable from "../../components/common/ShoppingListItemsTable";

let onDeleteCalled = false;

function setup(){
  const props ={
    items:[
      {
        "id": 7, "name": "Atom",
        "description": "The IDE of choice"
      }
    ], listId: 5, onDeleteClick: () => { onDeleteCalled = true; }
  };
  return shallow(<ShoppingListItemsTable {...props}/>);
}

describe('Run tests on ShoppingListItemsTable component', () => {
  const tableOfItems = setup();
  it('has the correct item name', () => {
    expect(tableOfItems.find('#itemName').text()).toEqual('Atom');
  });
  // edit button
  it('has an edit item button has the correct bootstrap class', () => {
    expect(tableOfItems.find('#editItemBtn').props().className).
    toEqual('btn btn-primary btn-xs');
  });
  it('has an edit item button has the correct text', () => {
    expect(tableOfItems.find('#editItemBtn').props().children).toEqual('Edit');
  });
  it('has an edit item button pointing to the correct edit item url', () => {
    expect(tableOfItems.find('#editItemBtn').props().to).
    toEqual('/edit/lists/5/items/7');
  });
  // delete button
  it('has correct bootstrap class for delete button', () => {
    expect(tableOfItems.find('#deleteItemBtn').props().className).
    toEqual('btn btn-danger btn-xs');
  });
  it('can call delete item on click handler', () => {
    tableOfItems.find('#deleteItemBtn').simulate('click');
    expect(onDeleteCalled).toEqual(true);
  });
});
