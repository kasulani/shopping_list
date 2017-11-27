import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import TextArea from './TextArea';

const ListItemForm = (props) => {
  return(
    <form id={props.formId} onSubmit={props.onFormSubmit}>
      <TextInput id="nameOfItem"
        label="Item name"
        name="itemName"
        type="text"
        placeholder="Enter a unique name for your item"
        error={props.ValidationErrorsOfNameField}
        value={props.ValueOfNameField}
        onChange={props.onChangeText}
      />
      <TextArea id="descriptionOfItem"
        label="Description"
        name="itemDescription"
        placeholder="Enter a short description about your item"
        rows="3"
        error={props.ValidationErrorsOfDescriptionField}
        value={props.ValueOfDescriptionField}
        onChange={props.onChangeText}
      />
    </form>
  );
};

ListItemForm.propTypes = {
  formId: PropTypes.string.isRequired,
  ValidationErrorsOfNameField: PropTypes.string,
  ValidationErrorsOfDescriptionField: PropTypes.string,
  ValueOfNameField: PropTypes.string.isRequired,
  ValueOfDescriptionField: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default ListItemForm;
