import expect from "expect";
import React from "react";
import { mount } from "enzyme";
import { AddList, mapStateToProps, mapDispatchToProps } from "../components/list/AddList";
import store from "../store/configStore";

let userDetails = {
    username: "testuser@mail.com", description: "",
    firstname: "", lastname: "",
    num_of_items: 200, num_of_lists: 100
};

let selectedShoppingList = {
    title: "test shopping list"
};

let addNewShoppingListCalled = false;

function configProps(status, msg) {
    const props = {
        userDetails: userDetails,
        selectedShoppingList: selectedShoppingList,
        status: status,
        message: msg,
        addNewShoppingList: () => { addNewShoppingListCalled = true; return Promise.resolve(); }
    };
    return props;
}

function formSubmitWithData(status, msg){
    const theList = mount(<AddList {...configProps(status, msg) } />);
    const field1 = theList.find('TextInput').find('input');
    field1.node.value = "test list";
    field1.simulate('change', field1);
    //
    const field2 = theList.find('TextArea').find('textarea');
    field2.node.value = "test list description";
    field2.simulate('change', field2);
    theList.find('ShoppingListForm').find('#listForm').simulate('submit');
    //
    expect(theList.props().status).toEqual(status);
    expect(theList.state().newList.name).toEqual("test list");
    expect(theList.state().newList.description).toEqual("test list description");
}

describe('Run tests on Add list component', () => {
    const addList = mount(<AddList {...configProps("pass", "item added successfuly") } />);
    // test markup
    it('has a navigation bar', () => {
        expect(addList.find('NavBar').length).toBe(1);
    });
    it('has a user profile section', () => {
        expect(addList.find('UserProfile').length).toBe(1);
    });
    it('has a list container', () => {
        expect(addList.find('ListContainer').length).toBe(1);
    });
    it('has a list container that shows the correct title when the table has shopping lists', () => {
        expect(addList.find('ListContainer').
            find('h3').text()).toBe(' Add a new shopping list ');
    });
    it('has a add list form', () => {
        expect(addList.find('ShoppingListForm').length).toBe(1);
    });
    it('has a add list button', () => {
        expect(addList.find('SubmitButton').length).toBe(1);
    });
    it('has a cancel button', () => {
        expect(addList.find('Link').last().text()).toBe("Cancel");
    });
    // test errors are rendered
    addList.find('ShoppingListForm').find('#listForm').simulate('submit');
    it('can render a name field error if the item name is not entered', ()=>{
        expect(addList.state().errors.name)
            .toEqual("Please enter a name for the shopping list");
    });
    it('can render a description field error if a description is not entered', ()=>{
        expect(addList.state().errors.description)
            .toEqual("Please enter a description for the shopping list");
    });
    // test on change event handler
    it('can set the value of the name field', ()=>{
        const field = addList.find('TextInput').find('input');
        field.node.value = "test list";
        field.simulate('change', field);
        expect(addList.state().newList.name).toEqual("test list");
    });
    it('can set the value of the description field', ()=>{
        const field = addList.find('TextArea').find('textarea');
        field.node.value = "test list description";
        field.simulate('change', field);
        expect(addList.state().newList.description).toEqual("test list description");
    });
    // test formsubmit with status fail
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("fail", "list not added");
    });
    // test formsubmit with status pass
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("pass", "list added");
    });
    // test mapStateToProps
    it('mapStateToProps behaves correctly', () => {
        const state = {
            userDetails: userDetails,
            newShoppingList: {
                status: "pass",
                message: "item added"
            }
        };
        const expected = {
            userDetails: state.userDetails,
            status: state.newShoppingList.status,
            message: state.newShoppingList.message
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
    it('mapDispatchToProps behaves correctly', () => {
        mapDispatchToProps(store.dispatch);
    });
});