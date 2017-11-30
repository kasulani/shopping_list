import React from "react";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ListContainer from '../list/ListContainer';
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import { Link } from 'react-router';

const Error404 = (props) => {
  return(
    <div className="container">
      <NavBar />
      <section className="content">
        <div className="row">
          <UserProfile />
          <ListContainer title="No Items found on the list you selected">
            {[
              <Link key="1" to="/dashboard"
                className="btn btn-lg btn-primary pull-right">
                Back
              </Link>,
              <section key="2" className="content">
              <div className="error-page">
                <h2 className="headline text-yellow">404</h2>
                <div className="error-content">
                  <h3>Opps! Items not found</h3>
                  <p>
                  We could not find the items you were looking for on this list. Meanwhile,
                  you may return to <Link to="/dashboard">dashboard</Link> and add items to the list
                  or try using the search form.
                  </p>
                </div>
              </div>
            </section>]}
          </ListContainer>
        </div>
      </section>
    {/*div-container*/}
    </div>
  );
};

export default Error404;
