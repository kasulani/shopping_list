import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import TextArea from './TextArea';

const ShoppingListForm = (props) => {
  return(
    <form id={props.formId} onSubmit={props.onFormSubmit}>
      <TextInput
        label="List name"
        name="listName"
        type="text"
        placeholder="Enter a unique name for your list"
        error={props.ValidationErrorsOfNameField}
        value={props.ValueOfNameField}
        onChange={props.onChangeText}
      />
      <TextArea
        label="Description"
        name="listDescription"
        placeholder="Enter a short description about your list"
        rows="3"
        error={props.ValidationErrorsOfDescriptionField}
        value={props.ValueOfDescriptionField}
        onChange={props.onChangeText}
      />
    </form>
  );
};

ShoppingListForm.propTypes = {
  formId: PropTypes.string.isRequired,
  ValidationErrorsOfNameField: PropTypes.string,
  ValidationErrorsOfDescriptionField: PropTypes.string,
  ValueOfNameField: PropTypes.string.isRequired,
  ValueOfDescriptionField: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default ShoppingListForm;
