//This is a stateless functional component/presentational component
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const UserProfile = (props) => {
  return(
    <div className="col-md-3"> {/*this the column with the profile picture and about me and it appears on all pages*/}
        {/*Profile Image*/}
        <div className="box box-primary">
          <div className="box-body box-profile">
            {/*<img id="profile_picture" className="profile-user-img img-responsive img-circle" src="#" onerror="this.src='{{url_for('static', filename='img/profile.png')}}';" alt="profile picture">*/}
            <h3 id="profileName" className="profile-username text-center"><small>{props.username}</small></h3>
            <ul className="list-group list-group-unbordered">
              <li className="list-group-item">
                <b>Shopping Lists</b> <a id="listCount" className="pull-right">{props.lists}</a>
              </li>
              <li className="list-group-item">
                <b>Total Items</b> <a id="itemCount" className="pull-right">{props.items}</a>
              </li>
              {/*<li className="list-group-item">
              <b>Friends</b> <a className="pull-right">0</a>
              </li>*/}
            </ul>
          </div> {/*box-body*/}
        </div> {/*box*/}

        {/*About Me Box*/}
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title"><span className="glyphicon glyphicon-user"></span> About Me</h3>
          </div>{/*box-header*/}
          <div id="profileDescription" className="box-body">
            <p>{(!props.description) ? "Add something about yourself, please head over to your profile and complete it.": props.description}</p>
          </div>{/*box-body*/}
        </div>{/*box*/}
    {/*col*/}
    </div>
  );
};

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  lists: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default UserProfile;
