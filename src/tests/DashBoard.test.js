import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import {DashBoard, mapStateToProps, mapDispatchToProps} from "../components/dashboard/DashBoard";
import store from "../store/configStore";

let getListsOnPageCalled = false;
let getShoppingListsCalled = false;
let getUserCalled = false;
let deleteShoppingListCalled = false;
let shoppingLists = [
  {
    "description": "My road trip party",
    "id": 15,
    "title": "Road trip party"
  },
  {
    "description": "This is my birthday party shopping list",
    "id": 20,
    "title": "Birthday party"
  }
];
let status = 'pass';
let userDetails = {
  username:"testuser@mail.com", description:"open source. open mind",
  num_of_items: 200, num_of_lists: 100
};
let next_page = "/shoppinglists?page=2&limit=2";
let previous_page = "/shoppinglists?page=1&limit=2";

function configProps(shoppingLists, status, next_page, previous_page){
  const props = {
    userDetails: userDetails,
    shoppingLists: shoppingLists,
    status: status,
    next_page: next_page,
    previous_page: previous_page,
    getShoppingLists: () => { getShoppingListsCalled = true; },
    getUser: () => { getUserCalled = true; },
    deleteShoppingList: () => {
      deleteShoppingListCalled =true;
      return Promise.resolve();
    },
    getListsOnPage: () => { getListsOnPageCalled = true; }
  };
  return props;
}

describe('Run tests on DashBoard component', () => {
  const dashboard = mount(<DashBoard
    {...configProps(shoppingLists, status, next_page, previous_page)}/>);
  // test markup elements
  it('has a navigation bar', () => {
    expect(dashboard.find('NavBar').length).toBe(1);
  });
  it('has a user profile section', () => {
    expect(dashboard.find('UserProfile').length).toBe(1);
  });
  it('user profile section renders the correct user details passed via props',
  () => {
    const userProfile = dashboard.find('UserProfile');
    expect(userProfile.find('#profileName').text()).toEqual('testuser@mail.com');
    expect(userProfile.find('#listCount').text()).toEqual('100');
    expect(userProfile.find('#itemCount').text()).toEqual('200');
    expect(userProfile.find('#profileDescription').text()).
    toEqual('open source. open mind');
  });
  it('has a list container', () => {
    expect(dashboard.find('ListContainer').length).toBe(1);
  });
  it('list container shows the correct title when the table has shopping lists', () => {
    expect(dashboard.find('ListContainer').
    find('h3').text()).toBe(' Here are your shopping lists ');
  });
  it('has a shopping list table', () => {
    expect(dashboard.find('ShoppingListTable').length).toBe(1);
  });
  it('has a pagination navigator', () => {
    expect(dashboard.find('SimplePager').length).toBe(1);
  });
  it('has a delete modal', () => {
    expect(dashboard.find('DeleteModal').length).toBe(1);
  });
  // test functionality
  const searchInput = dashboard.find('NavBar').find('input');
  searchInput.node.value = "test search";
  searchInput.simulate('change', searchInput);
  it('can enter a search term in the search field', () => {
    expect(searchInput.props().value).toBe("test search");
  });
  it('search form can respond to form submit behaviour', () => {
    getListsOnPageCalled = false; // reset
    const searchForm = dashboard.find('NavBar').find('form');
    searchForm.simulate('submit');
    expect(getListsOnPageCalled).toEqual(true);
  });
  it('when the search field text has changed, the state has changed', () => {
    expect(dashboard.state().search.term).toBe("test search");
  });
  // click on previous button
  const simplePager = dashboard.find('SimplePager');
  it('paginator previous button can respond to on click event', () => {
    // when you click on the previous btn in the pager, it will call the getListsOnPage
    // with the page to fetch. In this test, we mock it by toggling a simple bool variable
    simplePager.find('#previousBtn').simulate('click');
    expect(getListsOnPageCalled).toEqual(true);
  });
  // click on next button
  it('paginator next button can respond to on click event', () => {
    getListsOnPageCalled = false; // reset
    simplePager.find('#nextBtn').simulate('click');
    expect(getListsOnPageCalled).toEqual(true);
  });
  // delete a shopping list in the table
  it('can delete the first shopping list in the table', ()=>{
    const deleteListBtn = dashboard.find('ShoppingListTable').
    find('#deleteListBtn').first();
    deleteListBtn.simulate('click');
    expect(dashboard.state().shoppingList.id).toBe(15);
  });
  // test delete modal behaviour
  it('can confirm delete operation using the delete dialog', ()=>{
    deleteShoppingListCalled = false;
    const deleteModalBtn = dashboard.find('DeleteModal').find('#deleteModalBtn');
    deleteModalBtn.simulate('click');
    expect(deleteShoppingListCalled).toEqual(true);
  });
  // test the branch where the status is fail
  shoppingLists = []; status = 'fail';
  const dboard = mount(<DashBoard
    {...configProps(shoppingLists, status, 'none', 'none')}/>);
  it('list container shows the correct title when the table has no shopping lists', () => {
    expect(dboard.find('ListContainer').
    find('h3').text()).toBe(' Welcome! Add your first list ');
  });
  it('shows the right toastr message when status is fail', ()=>{
    deleteShoppingListCalled = false;
    const deleteModalBtn = dboard.find('DeleteModal').find('#deleteModalBtn');
    deleteModalBtn.simulate('click');
    expect(deleteShoppingListCalled).toEqual(true);
  });
  //test mapStateToProps
  it('mapStateToProps behaves correctly', ()=>{
    const state = {
      shoppingLists: {
        lists: [{
          "description": "My shopping list test",
          "id": 1,
          "title": "shopping list test"
        }],
        next_page: 'none',
        previous_page: 'none'
      },
      deletedShoppingList:{
        status: 'pass',
        message: 'this is a pass message'
      },
      userDetails: userDetails
    };
    //
    const expected = {
      next_page: 'none',
      prev_page: 'none',
      shoppingLists: [{
        "description": "My shopping list test",
        "id": 1,
        "title": "shopping list test"
      }],
      status: 'pass',
      message: 'this is a pass message',
      userDetails: userDetails
    };
    //
    expect(mapStateToProps(state)).toEqual(expected);
  });
  it('mapDispatchToProps behaves correctly', ()=>{
    mapDispatchToProps(store.dispatch);
  });
});
