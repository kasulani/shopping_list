import React from 'react';
import PropTypes from 'prop-types';

const SimplePager = (props) => {
  if (props.show === 'true') {
    return(
      <nav id="outterPagerNavWrapper" aria-label="...">
        <button id="previousBtn"
          onClick={props.onPrevButtonClick}
          className="btn btn-xs btn-default pull-left"
          disabled={(props.prev_page_state === 'none')?"disabled":""}>
          <span id="previousBtnSpan"
            className="glyphicon glyphicon-triangle-left" aria-hidden="true">
          </span> PREVIOUS PAGE
        </button>
        <button id="nextBtn"
          onClick={props.onNextButtonClick}
          className="btn btn-xs btn-default pull-right"
          disabled={(props.next_page_state === 'none')?"disabled":""}>
          NEXT PAGE
          <span id="nextBtnSpan"
            className="glyphicon glyphicon-triangle-right" aria-hidden="true">
          </span>
        </button>
      </nav>
    );
  } else {
    return <nav aria-label="..."></nav>; // show no navigation buttons
  }
};

SimplePager.propTypes = {
  show: PropTypes.string.isRequired,
  onPrevButtonClick: PropTypes.func.isRequired,
  prev_page_state: PropTypes.string.isRequired,
  onNextButtonClick: PropTypes.func.isRequired,
  next_page_state: PropTypes.string.isRequired
};

export default SimplePager;
