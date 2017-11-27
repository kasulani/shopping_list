import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = (props) => {
  let wrapperClass = "btn btn-sm btn-primary pull-right";
  if (props.buttonClass){
    wrapperClass = props.buttonClass;
  }
  return(
    <button
      type="submit"
      form={props.formId}
      className={wrapperClass}>{props.buttonText}</button>
  );
};

SubmitButton.propTypes = {
  formId: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default SubmitButton;
