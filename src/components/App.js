//This Component handles the App template used on every page
import React from 'react';
import PropTypes from 'prop-types';
import Footer from './common/Footer';

class App extends React.Component {
  // react router will pass children as properties to this class. The children
  // are the container components configured in the routes
  render(){
    return(
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
