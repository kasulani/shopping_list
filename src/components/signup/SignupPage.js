import React from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput';

class SignupPage extends React.Component {
  constructor(props){
    super(props);
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
            <form>
              <TextInput
                name="username"
                label="username"
                placeholder="Enter your email address here"
                />
              <TextInput
                name="password1"
                label="password"
                placeholder="Enter your password here"
              />
              <TextInput
                name="password2"
                label="confirm password"
                placeholder="confirm your password here"
              />
              <input type="submit" value="Create Account" className="btn btn-sm btn-success" role="button"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupPage;
