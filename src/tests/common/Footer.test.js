import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import Footer from "../../components/common/Footer";

describe('Run tests on Footer component', () => {
  const footer = shallow(<Footer/>);
  it('has footer section', () => {
    expect(footer.find('footer').length).toBe(1);
  });
  it('has a paragraph tag', () => {
    expect(footer.find('p').length).toBe(1);
  });
  it('has an anchor tag', () => {
    expect(footer.find('a').length).toBe(1);
  });
  // delete button
  it('can render the correct message in footer', () => {
    expect(footer.find('footer').text()).
    toEqual('© 2017 Emmanuel King Kasulani.');
  });
});
