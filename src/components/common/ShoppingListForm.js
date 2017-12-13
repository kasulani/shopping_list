import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import TextArea from './TextArea';

const ShoppingListForm = (props) => {
  return (
    <form id={props.formId} onSubmit={props.onFormSubmit}>
      <TextInput id="nameOfList"
        label={props.LabelOfNameField}
        name="listName"
        type="text"
        placeholder={props.NameFieldPlaceholder}
        error={props.ValidationErrorsOfNameField}
        value={props.ValueOfNameField}
        onChange={props.onChangeText}
      />
      <TextArea id="descriptionOfList"
        label={props.LabelOfDescriptionField}
        name="listDescription"
        placeholder={props.DescriptionFieldPlaceholder}
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
  NameFieldPlaceholder: PropTypes.string,
  DescriptionFieldPlaceholder: PropTypes.string,
  LabelOfNameField: PropTypes.string,
  ValueOfNameField: PropTypes.string.isRequired,
  ValueOfDescriptionField: PropTypes.string.isRequired,
  LabelOfDescriptionField: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default ShoppingListForm;
