import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import SimplePager from "../../components/common/SimplePager";

let onPrevButtonClickCalled = false;
let onNextButtonClickCalled = false;

function setup(prev_state, next_state, show){
  const props ={
    onPrevButtonClick: () =>{ onPrevButtonClickCalled = true; },
    prev_page_state:prev_state,
    onNextButtonClick: () =>{ onNextButtonClickCalled = true; },
    next_page_state:next_state,
    show: show
  };
  return shallow(<SimplePager {...props}/>);
}

describe('Run tests on SimplePager component', () => {
  const simplePager =
  setup("/example.com/?page=1&limit=2", "/example.com/?page=2&limit=2", "true");
  // test previous button
  it('has the correct button bootstrap class for the previous button', () => {
    expect(simplePager.find('#previousBtn').props().className).
    toEqual('btn btn-xs btn-default pull-left');
  });
  it('has the correct button state for the previous button', () => {
    expect(simplePager.find('#previousBtn').props().disabled).toEqual('');
  });
  it('has the correct button correct glyphicon for the previous button', () => {
    expect(simplePager.find('#previousBtnSpan').props().className).
    toEqual('glyphicon glyphicon-triangle-left');
  });
  it('shows the correct button text', () => {
    expect(simplePager.find('#previousBtn').text()).toEqual(' PREVIOUS PAGE');
  });
  it('can call the previous button on click handler', () => {
    simplePager.find('#previousBtn').simulate('click');
    expect(onPrevButtonClickCalled).toEqual(true);
  });
  // test next button
  it('has the correct button bootstrap class for the next button', () => {
    expect(simplePager.find('#nextBtn').props().className).
    toEqual('btn btn-xs btn-default pull-right');
  });
  it('has the correct button state for the next button', () => {
    expect(simplePager.find('#nextBtn').props().disabled).toEqual('');
  });
  it('has the correct button correct glyphicon for the next button', () => {
    expect(simplePager.find('#nextBtnSpan').props().className).
    toEqual('glyphicon glyphicon-triangle-right');
  });
  it('shows the correct button text', () => {
    expect(simplePager.find('#nextBtn').text()).toEqual('NEXT PAGE');
  });
  it('can disable pager buttons if no page', () => {
    const pager = setup('none', 'none', 'true');
    expect(pager.find('#previousBtn').props().disabled).toEqual('disabled');
    expect(pager.find('#nextBtn').props().disabled).toEqual('disabled');
  });
  it('can not render a pager if the show property is false', () => {
    const pager = setup('none', 'none', 'false');
    expect(pager.find('nav').length).toBe(1);
  });
});
