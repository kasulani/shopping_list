//This is a stateless functional component/presentational component
import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
  let wrapperClass = "form-group";
  if(props.error && props.error.length > 0){
    wrapperClass += " " + "has-error";
  }

  return(
    <div id="inputOutWrapper" className={wrapperClass}>
      <label htmlFor={props.name}>{props.label}</label>
      <div id="inputInWrapper" className="field">
        <input type={props.type}
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}/>
        <div id="fieldError" style={{color: 'red'}}>{props.error}</div>
      </div>
    </div>
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
