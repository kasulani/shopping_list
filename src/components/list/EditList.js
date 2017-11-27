import React, {Component} from "react";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ShoppingListForm from '../common/ShoppingListForm';
import SubmitButton from '../common/SubmitButton';
import ListContainer from '../list/ListContainer';
import {editShoppingList} from "../../actions/shoppingListsActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import PropTypes from "prop-types";
import {Link,browserHistory} from "react-router";
import _ from 'lodash';


class EditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: { id: "", name: "", description: "" },
      errors: {}
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.isListFormValid = this.isListFormValid.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentWillMount(){
    const currentList = this.state.currentList;
    currentList.id = this.props.selectedShoppingList.id;
    currentList.name = this.props.selectedShoppingList.title;
    currentList.description = this.props.selectedShoppingList.description;
    this.setState({currentList: currentList});
  }

  isListFormValid(){
    // this method validates data for the add a new list form
    let isValid = true;
    const errors = this.state.errors;
    this.setState({errors: {}}); // clear any errors
    if (this.state.currentList.name.length == 0){
      // this means nothing has been typed in this field
      errors.name = "Please enter a name for the shopping list";
      isValid = false;
    }

    if (this.state.currentList.description.length == 0){
      // this means no password was typed in this field
      errors.description = "Please enter a description for the shopping list";
      isValid = false;
    }
    this.setState({errors: errors});
    return isValid;
  }

  onFormSubmit(event){
    event.preventDefault(); // tells the browser, don't submit the form
    // Validate form data
    if(!this.isListFormValid()){
      return;
    }
    // make an api request to the shopping/ endpoint via an action creator
    this.props.editShoppingList(this.state.currentList)
      .then(()=>{
        if (this.props.status == 'fail'){
          toastr.error(
           this.props.message, "Shopping List - Error", TOASTR_CONFIG);
        }else{
          toastr.success(
           this.props.message, "Shopping List", TOASTR_CONFIG);
           browserHistory.push('/dashboard');
        }
      });
  }

  onChangeText(event){
    const currentList = this.state.currentList;
    const errors = this.state.errors;
    //forevery stroke, store the change of the input field in the state
    if (event.target.name == 'listName'){
      currentList.name = event.target.value;
      errors.name = ""; // clear any errors
    }
    if (event.target.name == 'listDescription'){
      currentList.description = event.target.value;
      errors.description = ""; // clear any errors
    }
    this.setState({currentList: currentList, errors:errors});
  }

  render(){
    return(
      <div className="container">
        <NavBar />
        <section className="content">
          <div className="row">
          <UserProfile
            username={this.props.userDetails.username}
            description={this.props.userDetails.description}
            lists={this.props.userDetails.num_of_lists}
            items={this.props.userDetails.num_of_items}/>
            <ListContainer
              title="Edit a shopping list">
              {[
                <ShoppingListForm
                  key="1" formId="listForm" onChangeText={this.onChangeText}
                  onFormSubmit={this.onFormSubmit}
                  ValueOfNameField={this.state.currentList.name}
                  ValidationErrorsOfNameField={this.state.errors.name}
                  ValueOfDescriptionField={this.state.currentList.description}
                  ValidationErrorsOfDescriptionField={this.state.errors.description}/>,

                <SubmitButton key="2" formId="listForm" buttonText="Save Changes"/>,
                <Link key="3" to="/dashboard"
                  className="btn btn-sm btn-danger pull-right"
                  style={{marginRight: 0.5 + 'em'}}
                >
                  Cancel
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

EditList.propTypes = {
  params: PropTypes.object.isRequired,
  editShoppingList: PropTypes.func.isRequired,
  getShoppingList: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  selectedShoppingList: PropTypes.object,
  userDetails: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return{
    userDetails: state.userDetails,
    status: state.editedShoppingList.status,
    message: state.editedShoppingList.message,
    selectedShoppingList: _.mapKeys(state.shoppingLists, 'id')[ownProps.params.id]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({editShoppingList},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditList);
