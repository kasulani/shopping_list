import React, {Component} from "react";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ShoppingListForm from '../common/ShoppingListForm';
import SubmitButton from '../common/SubmitButton';
import ListContainer from '../list/ListContainer';
import {addNewItem} from "../../actions/shoppingListsActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import PropTypes from "prop-types";
import {Link,browserHistory} from "react-router";
import _ from 'lodash';


export class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: { shoppingListId: "", name: "", description: "" },
      errors: {}
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.isItemFormValid = this.isItemFormValid.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentWillMount(){
    const newItem = this.state.newItem;
    newItem.shoppingListId = this.props.selectedShoppingList.id;
    this.setState({newItem: newItem});
  }

  isItemFormValid(){
    // this method validates data for the add a new list form
    let isValid = true;
    const errors = this.state.errors;
    this.setState({errors: {}}); // clear any errors
    if (this.state.newItem.name.length == 0){
      // this means nothing has been typed in this field
      errors.name = "Please enter a name for the shopping list item";
      isValid = false;
    }

    if (this.state.newItem.description.length == 0){
      // this means no password was typed in this field
      errors.description = "Please enter a description for the shopping list item";
      isValid = false;
    }
    this.setState({errors: errors});
    return isValid;
  }

  onFormSubmit(event){
    event.preventDefault(); // tells the browser, don't submit the form
    // Validate form data
    if(!this.isItemFormValid()){
      return;
    }
    // make an api request to the shopping/ endpoint via an action creator
    this.props.addNewItem(this.state.newItem)
      .then(()=>{
        if (this.props.status == 'fail'){
          toastr.error(
           this.props.message, "Shopping List - Error", TOASTR_CONFIG);
        }else{
          toastr.success(
           this.props.message, "Shopping List", TOASTR_CONFIG);
           browserHistory.push(`/view/items/${this.props.selectedShoppingList.id}`); // show list of items on list
        }
      });
  }

  onChangeText(event){
    const newItem = this.state.newItem;
    const errors = this.state.errors;
    // forevery stroke, store the change of the input field in the state
    if (event.target.name == 'listName'){
      newItem.name = event.target.value;
      errors.name = ""; // clear any errors
    }
    if (event.target.name == 'listDescription'){
      newItem.description = event.target.value;
      errors.description = ""; // clear any errors
    }
    this.setState({newItem: newItem, errors:errors});
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
              icon="glyphicon glyphicon-plus-sign"
              title={`${this.props.selectedShoppingList.title}: Add a new item`}>
              {[
                <ShoppingListForm
                  key="1" formId="itemForm" onChangeText={this.onChangeText}
                  onFormSubmit={this.onFormSubmit}
                  LabelOfNameField="Item name"
                  NameFieldPlaceholder="Enter a unique name for your item"
                  ValueOfNameField={this.state.newItem.name}
                  ValidationErrorsOfNameField={this.state.errors.name}
                  LabelOfDescriptionField="Description"
                  DescriptionFieldPlaceholder="Enter a short description about your item"
                  ValueOfDescriptionField={this.state.newItem.description}
                  ValidationErrorsOfDescriptionField={this.state.errors.description}/>,

                <SubmitButton key="2" formId="itemForm" buttonText="Add new List"/>,
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

AddItem.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  selectedShoppingList:PropTypes.object,
  addNewItem: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
};

export function mapStateToProps(state, ownProps) {
  return{
    userDetails: state.userDetails,
    status:state.newShoppingListItem.status,
    message:state.newShoppingListItem.message,
    selectedShoppingList: _.mapKeys(state.shoppingLists.lists, 'id')[ownProps.params.id]
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({addNewItem},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);