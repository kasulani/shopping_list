import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import Error404 from "../../components/common/NotFound";

describe('Run tests on NotFound component', () => {
  const notFound = shallow(<Error404/>);
  it('has navigation bar section', () => {
    expect(notFound.find('NavBar').length).toBe(1);
  });
  it('has user profile section', () => {
    expect(notFound.find('UserProfile').length).toBe(1);
  });
  it('has container', () => {
    expect(notFound.find('ListContainer').length).toBe(1);
  });
});
