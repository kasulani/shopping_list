import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {authUser} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: {token: "", message: "", status: ""}
      user: {}
    };
  }

  componentWillMount() {
    // console.log(this.context);
    this.props.authUser(this.state.user, 'logout');
    browserHistory.push("/");
  }

  render(){
    return null;
  }
}

LogOut.propTypes = {
  authUser: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

// function mapStateToProps(state) {
//   return {
//     token: state.user.token
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({authUser},dispatch);
}

export default connect(null, mapDispatchToProps)(LogOut);
