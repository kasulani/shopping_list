import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import TextArea from './TextArea';

const EditProfileForm = (props) => {
  return(
    <form id={props.formId} onSubmit={props.onFormSubmit}>
      <TextInput id="firstname"
        label="First name"
        name="firstName"
        type="text"
        placeholder="Enter your first name"
        error={props.ValidationErrorsOfFirstNameField}
        value={props.ValueOfFirstNameField}
        onChange={props.onChangeText}
      />
      <TextInput id="lastname"
        label="Last name"
        name="lastName"
        type="text"
        placeholder="Enter your last name"
        error={props.ValidationErrorsOfLastNameField}
        value={props.ValueOfLastNameField}
        onChange={props.onChangeText}
      />
      <TextArea id="profileDescription"
        label="Description"
        name="description"
        placeholder="Describe your self in a sentence"
        rows="3"
        error={props.ValidationErrorsOfDescriptionField}
        value={props.ValueOfDescriptionField}
        onChange={props.onChangeText}
      />
    </form>
  );
};

EditProfileForm.propTypes = {
  formId: PropTypes.string.isRequired,
  ValidationErrorsOfFirstNameField: PropTypes.string,
  ValidationErrorsOfLastNameField: PropTypes.string,
  ValidationErrorsOfDescriptionField: PropTypes.string,
  ValueOfFirstNameField: PropTypes.string.isRequired,
  ValueOfLastNameField: PropTypes.string.isRequired,
  ValueOfDescriptionField: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default EditProfileForm;
