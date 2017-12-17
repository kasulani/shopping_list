import React, { Component }from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class LoggedInContainer extends Component {
  constructor(props){
    super(props);
  }
  // This component ensures that a user of the application has logged in to access
  // the pages of the application that require login
  //
  // The component will render the page which is passed as a child
  componentDidMount() {
    if (!this.props.token) {
      browserHistory.replace("/");
    }
  }

  render() {
    if (this.props.token) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

LoggedInContainer.propTypes = {
  token: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

// This component requires the token in the global state to make a decision on
// wether to allow a user access pages that require user login
function mapStateToProps(state) {
  return{
    token: state.user.token
  };
}

export default connect(mapStateToProps)(LoggedInContainer);
