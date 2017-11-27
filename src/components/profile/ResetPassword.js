import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ListContainer from '../list/ListContainer';
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import ResetPasswordForm from '../common/ResetPasswordForm';
import {bindActionCreators} from "redux";
import SubmitButton from '../common/SubmitButton';
import {Link} from "react-router";
import {resetPassword} from "../../actions/authActions";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{ username: "", oldPassword: "", newPassword: "", confirmPassword: "" },
      errors: {}
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.isPasswordResetFormValid = this.isPasswordResetFormValid.bind(this);
    this.onResetPasswordFormSubmit = this.onResetPasswordFormSubmit.bind(this);
  }

  componentWillMount() {
    const user = this.state.user;
    user.username = this.props.userDetails.username;
  }

  onChangeText(event){
    const user = this.state.user;
    const errors = this.state.errors;
    //forevery stroke, store the change of the input field in the state
    if (event.target.name == 'oldPassword'){
      user.oldPassword = event.target.value;
      errors.oldPassword = ""; // clear any errors
    }
    if (event.target.name == 'newPassword'){
      user.newPassword = event.target.value;
      errors.newPassword = ""; // clear any errors
    }
    if (event.target.name == 'confirmPassword'){
      user.confirmPassword = event.target.value;
      errors.confirmPassword = ""; // clear any errors
    }
    this.setState({user: user, errors:errors});
  }

  isPasswordResetFormValid(){
    let isValid = true;
    const errors = this.state.errors;
    this.setState({errors: {}}); // clear any errors
    if (this.state.user.oldPassword.length == 0 || this.state.user.oldPassword.length < 5){
      // this means nothing has been typed in this field
      errors.oldPassword = "Please enter your old password here";
      isValid = false;
    }

    if (this.state.user.newPassword.length == 0 || this.state.user.newPassword.length < 5){
      // this means nothing has been typed in this field
      errors.newPassword = "Please enter your new password here. Password should be 5 or more characters long";
      isValid = false;
    }

    if (this.state.user.confirmPassword.length == 0 || this.state.user.confirmPassword.length < 5){
      // this means no password was typed in this field
      errors.confirmPassword = "Please confirm your new password here. Password should be 5 or more characters long";
      isValid = false;
    }

    if (!(this.state.user.newPassword.length == this.state.user.confirmPassword.length)){
      // new password must match confirm password
      errors.confirmPassword = errors.newPassword = "Please make sure these two passwords match";
      isValid = false;
    }

    this.setState({errors: errors});
    return isValid;
  }

  onResetPasswordFormSubmit(event){
    event.preventDefault(); // tells the browser, don't submit the form
    // Validate form data
    if(!this.isPasswordResetFormValid()){
      return;
    }
    this.props.resetPassword(this.state.user).then(()=>{
      if (this.props.status == 'fail'){
        toastr.error(
         this.props.message, "Shopping List - Error", TOASTR_CONFIG);
      }else{
        toastr.success(
         this.props.message, "Shopping List", TOASTR_CONFIG);
      }
    });
  }

  render(){
    return(
      <div className="container">
        <NavBar />
        <section className="content">
          <div className="row">
          <UserProfile
            username={this.props.userDetails.username}
            description={this.props.userDetails.description}
            lists={this.props.userDetails.num_of_lists}
            items={this.props.userDetails.num_of_items}/>
            <ListContainer
              icon="glyphicon glyphicon-lock"
              title="Reset your password">
              {[
                <ResetPasswordForm
                  key="1" formId="resetPassword" onChangeText={this.onChangeText}
                  onFormSubmit={this.onResetPasswordFormSubmit}
                  ValueOfOldPasswordField={this.state.user.oldPassword}
                  ValidationErrorsOfOldPasswordField={this.state.errors.oldPassword}
                  ValueOfNewPasswordField={this.state.user.newPassword}
                  ValidationErrorsOfNewPasswordField={this.state.errors.newPassword}
                  ValueOfConfirmPasswordField={this.state.user.confirmPassword}
                  ValidationErrorsOfConfirmPasswordField={this.state.errors.confirmPassword}/>,

                <SubmitButton key="2" formId="resetPassword" buttonText="Reset Password"/>,
                <Link key="4" to="/edit/profile"
                  className="btn btn-sm btn-danger pull-right"
                  style={{marginRight: 0.5 + 'em'}}
                >
                  Back
                </Link>
              ]}
            </ListContainer>
          </div>
        </section>
      {/*div-container*/}
      </div>
    );
  }
}

ResetPassword.propTypes = {
  userDetails: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

function mapStateToProps( state ) {
  return {
    userDetails: state.userDetails,
    status: state.resetPass.status,
    message: state.resetPass.message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({resetPassword},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
