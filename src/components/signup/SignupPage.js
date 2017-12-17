import React from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput';
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";


export class SignupPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      newUser: {username: "", password1: "", password2: ""},
      errors: {}
    };

    this.toastr =

    this.onChangeText = this.onChangeText.bind(this);  // handles change
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.isRegistrationFormValid = this.isRegistrationFormValid.bind(this); // validate form data
  }

  onChangeText(event){
    const user = this.state.newUser;
    const errors = this.state.errors;
    // forevery stroke, store the change of the input field in the state
    if (event.target.name == 'username'){
      user.username = event.target.value;
      errors.username = ""; // clear any errors set on this field
    }

    if (event.target.name == 'password1'){
      user.password1 = event.target.value;
      errors.password1 = errors.password2 = "";
    }

    if (event.target.name == 'password2'){
      user.password2 = event.target.value;
      errors.password2 = errors.password1 ="";
    }
    // update the component state
    this.setState({user: user, errors:errors});
  }

  isRegistrationFormValid(){
    // this method validates data for the login form
    let isValid = true;
    const errors = this.state.errors;
    this.setState({errors: {}}); // clear any pervious errors for all the fields

    if (this.state.newUser.username.length == 0){
      // this means nothing has been typed in this field
      errors.username = "Please enter a valid email address";
      isValid = false;
    }

    if (this.state.newUser.password1.length == 0){
      // this means no password was typed in this field
      errors.password1 = "Please enter a password";
      isValid = false;
    }

    if (this.state.newUser.password2.length == 0){
      // this means no password was typed in this field
      errors.password2 = "Please enter a password";
      isValid = false;
    }

    if (!(this.state.newUser.password2 == this.state.newUser.password1)){
      // this means the two passwords don't match
      errors.password2 = "Please make sure these passwords match";
      errors.password1 = errors.password2;
      isValid = false;
    }

    this.setState({errors: errors});
    return isValid;
  }

  onFormSubmit(event){
    event.preventDefault(); // tells the browser, don't submit the form
    if(!this.isRegistrationFormValid()){ // validate form data
      return;
    }
    // make an api request to the auth/register endpoint via an action creator
    // note: password1 should be the same as password2
    this.props.registerUser(
      {
        username: this.state.newUser.username,
        password: this.state.newUser.password1}, (response)=>{ // callback
            if (response.data.status == 'fail'){
                toastr.error(
                  response.data.message,
                  "Shopping List - Error", TOASTR_CONFIG
                );
            }
            if (response.data.status == 'pass'){
                toastr.success(
                  response.data.message,
                  "Shopping List", TOASTR_CONFIG
                );
            }
        });
  }

  render() {
    return(
      <div className="jumbotron">
        <h1>Welcome new user</h1>
        <div className="row">
          <div className="col-lg-6">
            <p className="lead">
              Please provide us some information and we create an account for you to start having fun!
              We promise it will take a short time.
            </p>
            <p>If you already have an account, go ahead and click on <Link to="/" role="button">Login</Link></p>
          </div>
          <div className="col-lg-6">
            <h3>Signup</h3>
            <form onSubmit={this.onFormSubmit}>
              <TextInput
                name="username"
                label="username"
                placeholder="Enter your email address here"
                onChange = {this.onChangeText}
                value = {this.state.newUser.username}
                error={this.state.errors.username}
                type ="email"
                />
              <TextInput
                name="password1"
                label="password"
                placeholder="Enter your password here"
                onChange = {this.onChangeText}
                value = {this.state.newUser.password1}
                error={this.state.errors.password1}
                type="password"
              />
              <TextInput
                name="password2"
                label="confirm password"
                placeholder="confirm your password here"
                onChange = {this.onChangeText}
                value = {this.state.newUser.password2}
                error={this.state.errors.password2}
                type="password"
              />
              <input type="submit" value="Create Account" className="btn btn-sm btn-success" role="button"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  newUser: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

export function mapStateToProps(state) {
  return { newUser: state.newUser};
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({registerUser},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
