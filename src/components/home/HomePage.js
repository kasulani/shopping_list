import React, { Component }from 'react';
import { Link, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {loginUser} from "../../actions/authActions";
import PropTypes from 'prop-types';

class HomePage extends Component {
  constructor(props){
    super(props);
    /* Note:
    * in react, a mutable state is kept in this.state property of components and
    * only updated via this.setState()
    */
    this.state = { // this is a container component state not application state
      user: { username: "", password: ""},
      errors: {}
    };
    //bind functions here - ES6 does not autobind
    this.onChangeText = this.onChangeText.bind(this);  // handles change
    this.onFormSubmit = this.onFormSubmit.bind(this);  // handles submit form action
    this.isLoginFormValid = this.isLoginFormValid.bind(this); // validate form data
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token){
      browserHistory.push('/dashboard');
    }
  }

  onChangeText(event){
    const user = this.state.user;
    //forevery stroke, store the change of the input field in the state
    if (event.target.name == 'username'){
      user.username = event.target.value;
    }
    if (event.target.name == 'password'){
      user.password = event.target.value;
    }
    this.setState({user: user});
  }

  isLoginFormValid(){
    // this method validates data for the login form 
    let isValid = true;
    const errors = this.state.errors;
    this.setState({errors: {}}); // clear any errors
    if (this.state.user.username.length == 0){
      // this means nothing has been typed in this field
      errors.username = "Please enter a valid email address";
      isValid = false;
    }

    if (this.state.user.password.length == 0){
      // this means no password was typed in this field
      errors.password = "please enter a password";
      isValid = false;
    }
    this.setState({errors: errors});
    return isValid;
  }

  onFormSubmit(event){
    event.preventDefault(); // tells the browser, don't submit the form
    // make an api request to the auth/login endpoint via an action creator
    // pass a callback function to the action creator, which will be called
    // after the api call has been made and some custom logic has been applied
    if(!this.isLoginFormValid()){
      return;
    }
    this.props.loginUser(this.state.user);
  }

  render() {
    //console.log(this.props.token);
    return(
      <div className="jumbotron">
        <h1>Shopping List</h1>
        <div className="row">
          <div className="col-lg-8">
            <p className="lead">
              This is an application that allows you to record and share things you want to
              spend your money on and keep track of your shopping lists and the best part of
              it all is that you can share your Shopping List with your friends.
            </p>
            <p><Link to="signup" className="btn btn-lg btn-success" role="button">Sign up today</Link></p>
          </div>
          <div className="col-lg-4">
            <h4>Login Area</h4>
            <form onSubmit={this.onFormSubmit}>
              <TextInput
                name="username"
                label="username"
                placeholder="Enter your email address here"
                onChange={this.onChangeText}
                value={this.state.username}
                type="email"
                error={this.state.errors.username}
                />
              <TextInput
                name="password"
                label="password"
                placeholder="Enter your password here"
                onChange={this.onChangeText}
                value={this.state.password}
                type="password"
                error={this.state.errors.password}
              />
              <input type="submit" value="Login" className="btn btn-sm btn-primary" role="button"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{
    token: state.user.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser },dispatch);
}

//connect helps us have components that can work with redux
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
