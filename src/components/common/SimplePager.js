import React from 'react';
import PropTypes from 'prop-types';

const SimplePager = (props) => {
  if (props.show === 'true') {
    return(
      <nav aria-label="...">
        <button
          onClick={props.onPrevButtonClick}
          className="btn btn-xs btn-default pull-left"
          disabled={(props.prev_page_state === 'none')?"disabled":""}>
          <span className="glyphicon glyphicon-triangle-left" aria-hidden="true">
          </span> PREVIOUS PAGE
        </button>
        <button
          onClick={props.onNextButtonClick}
          className="btn btn-xs btn-default pull-right"
          disabled={(props.next_page_state === 'none')?"disabled":""}>
          NEXT PAGE
          <span className="glyphicon glyphicon-triangle-right" aria-hidden="true">
          </span>
        </button>
      </nav>
    );
  } else {
    return <nav aria-label="..."></nav>; // show no navigation buttons
  }
};

export default SimplePager;
