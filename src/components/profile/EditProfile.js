import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ListContainer from '../list/ListContainer';
import toastr from "toastr";
import { TOASTR_CONFIG } from "../../configs";
import EditProfileForm from '../common/EditProfileForm';
import { bindActionCreators } from "redux";
import SubmitButton from '../common/SubmitButton';
import { Link } from "react-router";
import { editUser, getUser } from "../../actions/shoppingListsActions";

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "", firstname: "", lastname: "", description: "",
        oldPassword: "", newPassword: "", confirmPassword: ""
      },
      errors: {}
    };
    this.isUserEditFormValid = this.isUserEditFormValid.bind(this);
    this.onUserEditFormSubmit = this.onUserEditFormSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentWillMount() {
    const user = this.state.user;
    user.username = this.props.userDetails.username;
    user.firstname = this.props.userDetails.firstname;
    user.lastname = this.props.userDetails.lastname;
    user.description = this.props.userDetails.description;
    this.setState({ user: user });
  }

  isUserEditFormValid() {
    // this method validates data for the add a new list form
    let isValid = true;
    const errors = this.state.errors;
    this.setState({ errors: {} }); // clear any errors
    if (this.state.user.firstname.length == 0) {
      // this means nothing has been typed in this field
      errors.firstname = "Please enter your first name";
      isValid = false;
    }

    if (this.state.user.lastname.length == 0) {
      // this means nothing has been typed in this field
      errors.lastname = "Please enter your last name";
      isValid = false;
    }

    if (this.state.user.description.length == 0) {
      // this means no password was typed in this field
      errors.description = "Describe your self in a sentence";
      isValid = false;
    }
    this.setState({ errors: errors });
    return isValid;
  }

  onUserEditFormSubmit(event) {
    event.preventDefault(); // tells the browser, don't submit the form
    // Validate form data
    if (!this.isUserEditFormValid()) {
      return;
    }
    // make an api request to the shopping/ endpoint via an action creator
    this.props.editUser(this.state.user)
      .then(() => {
        if (this.props.status == 'fail') {
          toastr.error(
            this.props.message, "Shopping List - Error", TOASTR_CONFIG);
        } else {
          toastr.success(
            this.props.message, "Shopping List", TOASTR_CONFIG);
          this.props.getUser(); // get the user details
        }
      });
  }

  onChangeText(event) {
    const user = this.state.user;
    const errors = this.state.errors;
    //forevery stroke, store the change of the input field in the state
    if (event.target.name == 'firstName') {
      user.firstname = event.target.value;
      errors.firstname = ""; // clear any errors
    }
    if (event.target.name == 'lastName') {
      user.lastname = event.target.value;
      errors.lastname = ""; // clear any errors
    }
    if (event.target.name == 'description') {
      user.description = event.target.value;
      errors.description = ""; // clear any errors
    }
    this.setState({ user: user, errors: errors });
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <section className="content">
          <div className="row">
            <UserProfile
              username={this.props.userDetails.username}
              description={this.props.userDetails.description}
              lists={this.props.userDetails.num_of_lists}
              items={this.props.userDetails.num_of_items} />
            <ListContainer
              icon="glyphicon glyphicon-edit"
              title="Edit your profile">
              {[
                <EditProfileForm
                  key="1" formId="profileForm" onChangeText={this.onChangeText}
                  onFormSubmit={this.onUserEditFormSubmit}
                  ValueOfFirstNameField={this.state.user.firstname}
                  ValidationErrorsOfFirstNameField={this.state.errors.firstname}
                  ValueOfLastNameField={this.state.user.lastname}
                  ValidationErrorsOfLastNameField={this.state.errors.lastname}
                  ValueOfDescriptionField={this.state.user.description}
                  ValidationErrorsOfDescriptionField={this.state.errors.description} />,

                <SubmitButton key="2" formId="profileForm" buttonText="Save Changes" />,
                <Link key="3" to="/reset-password"
                  className="btn btn-sm btn-success pull-right"
                  style={{ marginRight: 0.5 + 'em' }}
                >
                  Reset password
                </Link>,
                <Link key="4" to="/dashboard"
                  className="btn btn-sm btn-danger pull-right"
                  style={{ marginRight: 0.5 + 'em' }}
                >
                  Back
                </Link>
              ]}
            </ListContainer>
          </div>
        </section>
        {/*div-container*/}
      </div>
    );
  }
}

EditProfile.propTypes = {
  userDetails: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
    status: state.editedUser.status,
    message: state.editedUser.message
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editUser, getUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
