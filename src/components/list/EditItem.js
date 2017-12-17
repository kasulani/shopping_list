import React, {Component} from "react";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ListItemForm from '../common/ListItemForm';
import SubmitButton from '../common/SubmitButton';
import ListContainer from '../list/ListContainer';
import {editShoppingListItem} from "../../actions/shoppingListsActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import PropTypes from "prop-types";
import {Link,browserHistory} from "react-router";
import _ from 'lodash';


class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: { listId: "", itemId: "", name: "", description: "" },
      errors: {}
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.isListFormValid = this.isListFormValid.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentWillMount(){
    const currentItem = this.state.currentItem;
    currentItem.listId = this.props.params.listId; // id of list item belongs to
    currentItem.itemId = this.props.selectedListItem.id; // id of item
    currentItem.name = this.props.selectedListItem.name;
    currentItem.description = this.props.selectedListItem.description;
    this.setState({currentItem: currentItem});
  }

  isListFormValid(){
    // this method validates data for the add a new list form
    let isValid = true;
    const errors = this.state.errors;
    this.setState({errors: {}}); // clear any errors
    if (this.state.currentItem.name.length == 0){
      // this means nothing has been typed in this field
      errors.name = "Please enter a name for the shopping list";
      isValid = false;
    }

    if (this.state.currentItem.description.length == 0){
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
    this.props.editShoppingListItem(this.state.currentItem)
      .then(()=>{
        if (this.props.status == 'fail'){
          toastr.error(
           this.props.message, "Shopping List - Error", TOASTR_CONFIG);
        }else{
          toastr.success(
           this.props.message, "Shopping List", TOASTR_CONFIG);
           browserHistory.push(`/view/items/${this.props.params.listId}`);
        }
      });
  }

  onChangeText(event){
    const currentItem = this.state.currentItem;
    const errors = this.state.errors;
    //forevery stroke, store the change of the input field in the state
    if (event.target.name == 'itemName'){
      currentItem.name = event.target.value;
      errors.name = ""; // clear any errors
    }
    if (event.target.name == 'itemDescription'){
      currentItem.description = event.target.value;
      errors.description = ""; // clear any errors
    }
    this.setState({currentItem: currentItem, errors:errors});
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
              icon="glyphicon glyphicon-edit"
              title="Edit a shopping list Item">
              {[
                <ListItemForm
                  key="1" formId="itemForm" onChangeText={this.onChangeText}
                  onFormSubmit={this.onFormSubmit}
                  ValueOfNameField={this.state.currentItem.name}
                  ValidationErrorsOfNameField={this.state.errors.name}
                  ValueOfDescriptionField={this.state.currentItem.description}
                  ValidationErrorsOfDescriptionField={this.state.errors.description}/>,

                <SubmitButton key="2" formId="itemForm" buttonText="Save Changes"/>,
                <Link key="3" to={`/view/items/${this.props.params.listId}`}
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

EditItem.propTypes = {
  params: PropTypes.object.isRequired,
  editShoppingListItem: PropTypes.func.isRequired,
  getShoppingList: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  selectedListItem: PropTypes.object,
  userDetails: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return{
    userDetails: state.userDetails,
    status: state.editedListItem.status,
    message: state.editedListItem.message,
    selectedListItem: _.mapKeys(state.shoppingListItems, 'id')[ownProps.params.itemId]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({editShoppingListItem},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
