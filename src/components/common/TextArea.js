//This is a stateless functional component/presentational component
import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  let wrapperClass = "form-group";
  if(props.error && props.error.length > 0){
    wrapperClass += " " + "has-error";
  }

  return(
    <div id="areaOutWrapper" className={wrapperClass}>
      <label htmlFor={props.name}>{props.label}</label>
      <div id="areaInWrapper" className="field">
        <textarea
        name={props.name}
        className="form-control"
        rows={props.rows}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}></textarea>
        <div id="fieldAreaError" style={{color: 'red'}}>{props.error}</div>
      </div>
    </div>
  );
};

TextArea.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextArea;
