import React, {Component} from "react";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.token){
      browserHistory.push('/');
    }
  }

  render(){
    return(
      <div className="container"><h1>DashBoard Page</h1></div>
    );
  }
}

DashBoard.propTypes = {
  token: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    token: state.user.token
  };
}

export default connect(mapStateToProps, null)(DashBoard);
