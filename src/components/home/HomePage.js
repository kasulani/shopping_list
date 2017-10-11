import React from 'react';
import { Link } from 'react-dom';
import TextInput from '../common/TextInput';

class HomePage extends React.Component {
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
            <p><a className="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
          </div>
          <div className="col-lg-4">
            <h4>Login Area</h4>
            <form>
              <TextInput
                name="username"
                label="username"
                />
              <TextInput
                name="password"
                label="password"
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
