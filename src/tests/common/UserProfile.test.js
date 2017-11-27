import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import UserProfile from "../../components/common/UserProfile";

function setup(description){
  const props ={
    username: "king@mail.com",
    lists: "200",
    items: "1000",
    description: description
  };
  return shallow(<UserProfile {...props}/>);
}

describe('Run tests on UserProfile component', () => {
  const userProfile = setup("");
  it('can render the correct username', () => {
    expect(userProfile.find('#profileName').text()).toEqual('king@mail.com');
  });
  it('can render the correct number of lists', () => {
    expect(userProfile.find('#listCount').text()).toEqual('200');
  });
  it('can render the correct number of items', () => {
    expect(userProfile.find('#itemCount').text()).toEqual('1000');
  });
  it('can render the correct default profile description', () => {
    expect(userProfile.find('#profileDescription').text()).
    toEqual('Add something about yourself, please head over to your profile and complete it.');
  });
  it('can render the correct profile description if description is provided', () => {
    const profile = setup("this is a brief description")
    expect(profile.find('#profileDescription').text()).
    toEqual('this is a brief description');
  });
});
