//This is a stateless functional component/presentational component
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import TextInput from './TextInput';

const NavBar = (props) => {
  return(
    <div classNameName="header clearfix">
      <nav className="navbar navbar-default-custom">
        <div className="container-fluid">
          {/*Brand and toggle get grouped for better mobile display*/}
          <div className="navbar-header">
            <button type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          <Link to="/dashboard" className="navbar-brand">Shopping List</Link>
          </div>

          {/*Collect the nav links, forms, and other content for toggling*/}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form onSubmit={props.onFormSubmit} className="navbar-form navbar-right">
              <div className="form-group">
                <input
                  name="searchField"
                  type="text" className="form-control" value={props.searchTerm}
                  placeholder="Search" onChange={props.onSearchTextChange}/>
              </div>
              <button type="submit" className="btn btn-default btn-default-custom">Search</button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/lists/new">Add a list</Link></li>
              <li><Link to="/edit/profile">profile</Link></li>
              <li><Link to="/logout">Log out</Link></li>
            </ul>
          </div>{/*.navbar-collapse*/}
        </div>{/*.container-fluid*/}
      </nav>
    {/*header clearfix*/}
    </div>
  );
};

NavBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default NavBar;
