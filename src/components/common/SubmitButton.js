import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = (props) => {
  return(
    <button
      type="submit"
      form={props.formId}
      className="btn btn-sm btn-primary pull-right">{props.buttonText}</button>
  );
};

SubmitButton.propTypes = {
  formId: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default SubmitButton;
