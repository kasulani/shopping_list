import expect from "expect";
import React from "react";
import { mount, shallow } from "enzyme";
import { EditProfile, mapStateToProps, mapDispatchToProps } from "../components/profile/EditProfile";
import store from "../store/configStore";

let editUserCalled = false;
let getUserCalled = false;
let userDetails = {
    username: "testuser@mail.com", description: "",
    firstname: "", lastname: "",
    num_of_items: 200, num_of_lists: 100
};

function configProps(status, msg) {
    const props = {
        userDetails: userDetails,
        status: status,
        message: msg,
        editUser: () => { editUserCalled = true; return Promise.resolve();},
        getUser: () => { getUserCalled = true; }
    };
    return props;
}

function formSubmitWithData(status, msg){
    const profile = mount(<EditProfile {...configProps(status, msg) } />);
    const field1 = profile.find('TextInput').first().find('input');
    field1.node.value = "king";
    field1.simulate('change', field1);
    //
    const field2 = profile.find('TextInput').last().find('input');
    field2.node.value = "emmanuel";
    field2.simulate('change', field2);
    //
    const field3 = profile.find('TextArea').find('textarea');
    field3.node.value = "open source. open mind.";
    field3.simulate('change', field3);
    profile.find('EditProfileForm').find('#profileForm').simulate('submit');
    //
    expect(profile.props().status).toEqual(status);
    expect(profile.state().user.firstname).toEqual("king");
    expect(profile.state().user.lastname).toEqual("emmanuel");
    expect(profile.state().user.description).toEqual("open source. open mind.");
}

describe('Run tests on EditProfile component', () => {
    const editProfile = mount(<EditProfile {...configProps("pass","user profile updated") } />);
    // test markup elements
    it('has a navigation bar', () => {
        expect(editProfile.find('NavBar').length).toBe(1);
    });
    it('has a user profile section', () => {
        expect(editProfile.find('UserProfile').length).toBe(1);
    });
    it('user profile section renders the correct user details passed via props',
        () => {
            const userProfile = editProfile.find('UserProfile');
            expect(userProfile.find('#profileName').text()).toEqual('testuser@mail.com');
            expect(userProfile.find('#listCount').text()).toEqual('100');
            expect(userProfile.find('#itemCount').text()).toEqual('200');
            // expect(userProfile.find('#profileDescription').text()).
            //     toEqual('open source. open mind');
        });
    it('has a list container', () => {
        expect(editProfile.find('ListContainer').length).toBe(1);
    });
    it('list container shows the correct title when the table has shopping lists', () => {
        expect(editProfile.find('ListContainer').
            find('h3').text()).toBe(' Edit your profile ');
    });
    it('has a edit profile form', () => {
        expect(editProfile.find('EditProfileForm').length).toBe(1);
    });
    it('has a save button', () => {
        expect(editProfile.find('SubmitButton').length).toBe(1);
    });
    it('has a back button', () => {
        expect(editProfile.find('Link').last().text()).toBe("Back");
    });
    // test errors are rendered
    editProfile.find('EditProfileForm').find('#profileForm').simulate('submit');
    it('can render a firstname field error if the first name is not entered', ()=>{
        expect(editProfile.state().errors.firstname).toEqual("Please enter your first name");
    });
    it('can render a lastname field error if the last name is not entered', ()=>{
        expect(editProfile.state().errors.lastname).toEqual("Please enter your last name");
    });
    it('can render a description field error if the description is not entered', ()=>{
        expect(editProfile.state().errors.description).toEqual("Describe your self in a sentence");
    });
    // test on change event handler
    it('can set the value of the first name field', ()=>{
        const field = editProfile.find('TextInput').first().find('input');
        field.node.value = "king";
        field.simulate('change', field);
        expect(editProfile.state().user.firstname).toEqual("king");
    });
    it('can set the value of the last name field', ()=>{
        const field = editProfile.find('TextInput').last().find('input');
        field.node.value = "emmanuel";
        field.simulate('change', field);
        expect(editProfile.state().user.lastname).toEqual("emmanuel");
    });
    it('can set the value of the description field', ()=>{
        const field = editProfile.find('TextArea').find('textarea');
        field.node.value = "open source. open mind.";
        field.simulate('change', field);
        expect(editProfile.state().user.description).toEqual("open source. open mind.");
    });
    // test formsubmit with status fail
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("fail", "user profile not updated");
    });
    // test formsubmit with status pass
    it('can render a toastr message on status fail', ()=>{
        formSubmitWithData("pass", "user profile not updated");
    });
    // test mapStateToProps
    it('mapStateToProps behaves correctly', ()=>{
        const state = {
            userDetails: userDetails,
            editedUser: {
                status: "pass",
                message: "user edited"
            }
        };
        const expected = {
            userDetails: state.userDetails,
            status: state.editedUser.status,
            message: state.editedUser.message
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
    it('mapDispatchToProps behaves correctly', ()=>{
        mapDispatchToProps(store.dispatch);
    });
});