import React from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    /* Note:
    in react, a mutable state is kept in this.state property of components and
    only update via setState()
    */
    this.state = {
      username: "",
      password: ""
    };
    //bind functions here - ES6 does not autobind
    this.onChange = this.onChange.bind(this);  // handles change
    this.onClickSubmit = this.onClickSubmit.bind(this);  // handles submit form action
  }

  onChange(event){
    //forevery stroke, store the change of the input field in the state
    this.setState({[event.target.name]: [event.target.value]});
  }

  onClickSubmit(){
    //make an api call to the auth endpoint that handles Login
  }

  render() {
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
            <form>
              <TextInput
                name="username"
                label="username"
                placeholder="Enter your email address here"
                onChange={this.onChange}
                value={this.state.username}
                />
              <TextInput
                name="password"
                label="password"
                placeholder="Enter your password here"
                onChange={this.onChange}
                value={this.state.username}
              />
              <input type="submit" value="Login" className="btn btn-sm btn-primary" role="button"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
