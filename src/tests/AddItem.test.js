import expect from "expect";
import React from "react";
import { mount } from "enzyme";
import { AddItem, mapStateToProps, mapDispatchToProps } from "../components/list/AddItem";
import store from "../store/configStore";

let userDetails = {
    username: "testuser@mail.com", description: "",
    firstname: "", lastname: "",
    num_of_items: 200, num_of_lists: 100
};

let selectedShoppingList = {
    title: "test shopping list"
};

let addNewItemCalled = false;

function configProps(status, msg) {
    const props = {
        userDetails: userDetails,
        selectedShoppingList: selectedShoppingList,
        status: status,
        message: msg,
        addNewItem: () => { addNewItemCalled = true; return Promise.resolve(); }
    };
    return props;
}

function formSubmitWithData(status, msg){
    const item = mount(<AddItem {...configProps(status, msg) } />);
    const field1 = item.find('TextInput').find('input');
    field1.node.value = "test item";
    field1.simulate('change', field1);
    //
    const field2 = item.find('TextArea').find('textarea');
    field2.node.value = "test item description";
    field2.simulate('change', field2);
    item.find('ShoppingListForm').find('#itemForm').simulate('submit');
    //
    expect(item.props().status).toEqual(status);
    expect(item.state().newItem.name).toEqual("test item");
    expect(item.state().newItem.description).toEqual("test item description");
}

describe('Run tests on Add item component', () => {
    const addItem = mount(<AddItem {...configProps("pass", "item added successfuly") } />);
    // test markup
    it('has a navigation bar', () => {
        expect(addItem.find('NavBar').length).toBe(1);
    });
    it('has a user profile section', () => {
        expect(addItem.find('UserProfile').length).toBe(1);
    });
    it('has a list container', () => {
        expect(addItem.find('ListContainer').length).toBe(1);
    });
    it('has a list container that shows the correct title when the table has shopping lists', () => {
        expect(addItem.find('ListContainer').
            find('h3').text()).toBe(' test shopping list: Add a new item ');
    });
    it('has a add item form', () => {
        expect(addItem.find('ShoppingListForm').length).toBe(1);
    });
    it('has a add item button', () => {
        expect(addItem.find('SubmitButton').length).toBe(1);
    });
    it('has a cancel button', () => {
        expect(addItem.find('Link').last().text()).toBe("Cancel");
    });
    // test errors are rendered
    addItem.find('ShoppingListForm').find('#itemForm').simulate('submit');
    it('can render a name field error if the item name is not entered', ()=>{
        expect(addItem.state().errors.name)
            .toEqual("Please enter a name for the shopping list item");
    });
    it('can render a description field error if a description is not entered', ()=>{
        expect(addItem.state().errors.description)
            .toEqual("Please enter a description for the shopping list item");
    });
    // test on change event handler
    it('can set the value of the name field', ()=>{
        const field = addItem.find('TextInput').find('input');
        field.node.value = "test item";
        field.simulate('change', field);
        expect(addItem.state().newItem.name).toEqual("test item");
    });
    it('can set the value of the description field', ()=>{
        const field = addItem.find('TextArea').find('textarea');
        field.node.value = "test item description";
        field.simulate('change', field);
        expect(addItem.state().newItem.description).toEqual("test item description");
    });
    // test formsubmit with status fail
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("fail", "item not added");
    });
    // test formsubmit with status pass
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("pass", "item added");
    });
    // test mapStateToProps
    it('mapStateToProps behaves correctly', () => {
        const state = {
            userDetails: userDetails,
            newShoppingListItem: {
                status: "pass",
                message: "item added"
            },
            shoppingLists: {lists: []}
        };
        const expected = {
            userDetails: state.userDetails,
            status: state.newShoppingListItem.status,
            message: state.newShoppingListItem.message,
            selectedShoppingList:undefined
        };
        const ownProps = {
            params: {id: 1}
        };
        expect(mapStateToProps(state,ownProps)).toEqual(expected);
    });
    it('mapDispatchToProps behaves correctly', () => {
        mapDispatchToProps(store.dispatch);
    });
});