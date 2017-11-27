import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const ResetPasswordForm = (props) => {
  return(
    <form id={props.formId} onSubmit={props.onFormSubmit}>
      <TextInput id="password1"
        label="Old password"
        name="oldPassword"
        type="password"
        placeholder="Enter your old password here"
        error={props.ValidationErrorsOfOldPasswordField}
        value={props.ValueOfOldPasswordField}
        onChange={props.onChangeText}
      />
      <TextInput id="password2"
        label="New password"
        name="newPassword"
        type="password"
        placeholder="Enter your new password here"
        error={props.ValidationErrorsOfNewPasswordField}
        value={props.ValueOfNewPasswordField}
        onChange={props.onChangeText}
      />
      <TextInput id="password3"
        label="Confirm password"
        name="confirmPassword"
        type="password"
        placeholder="Enter your new password here again"
        error={props.ValidationErrorsOfConfirmPasswordField}
        value={props.ValueOfConfirmPasswordField}
        onChange={props.onChangeText}
      />
    </form>
  );
};

ResetPasswordForm.propTypes = {
  formId: PropTypes.string.isRequired,
  ValidationErrorsOfOldPasswordField: PropTypes.string,
  ValidationErrorsOfNewPasswordField: PropTypes.string,
  ValidationErrorsOfConfirmPasswordField: PropTypes.string,
  ValueOfOldPasswordField: PropTypes.string.isRequired,
  ValueOfNewPasswordField: PropTypes.string.isRequired,
  ValueOfConfirmPasswordField: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default ResetPasswordForm;
