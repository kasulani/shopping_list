import React from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput';

class HomePage extends React.Component {
  constructor(props){
    super(props);
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
                />
              <TextInput
                name="password"
                label="password"
                placeholder="Enter your password here"
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
