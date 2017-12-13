import React, {Component} from "react";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ShoppingListForm from '../common/ShoppingListForm';
import SubmitButton from '../common/SubmitButton';
import ListContainer from '../list/ListContainer';
import {addNewShoppingList} from "../../actions/shoppingListsActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import PropTypes from "prop-types";
import {Link,browserHistory} from "react-router";


export class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: { name: "", description: "" },
      errors: {}
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.isListFormValid = this.isListFormValid.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  isListFormValid(){
    // this method validates data for the add a new list form
    let isValid = true;
    const errors = this.state.errors;
    this.setState({errors: {}}); // clear any errors
    if (this.state.newList.name.length == 0){
      // this means nothing has been typed in this field
      errors.name = "Please enter a name for the shopping list";
      isValid = false;
    }

    if (this.state.newList.description.length == 0){
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
    this.props.addNewShoppingList(this.state.newList)
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
    const newList = this.state.newList;
    const errors = this.state.errors;
    //forevery stroke, store the change of the input field in the state
    if (event.target.name == 'listName'){
      newList.name = event.target.value;
      errors.name = ""; // clear any errors
    }
    if (event.target.name == 'listDescription'){
      newList.description = event.target.value;
      errors.description = ""; // clear any errors
    }
    this.setState({newList: newList, errors:errors});
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
              title="Add a new shopping list">
              {[
                <ShoppingListForm
                  key="1" formId="listForm" onChangeText={this.onChangeText}
                  onFormSubmit={this.onFormSubmit}
                  LabelOfNameField="List name"
                  NameFieldPlaceholder="Enter a unique name for your list"
                  ValueOfNameField={this.state.newList.name}
                  ValidationErrorsOfNameField={this.state.errors.name}
                  LabelOfDescriptionField="Description"
                  DescriptionFieldPlaceholder="Enter a short description about your list"
                  ValueOfDescriptionField={this.state.newList.description}
                  ValidationErrorsOfDescriptionField={this.state.errors.description}/>,

                <SubmitButton key="2" formId="listForm" buttonText="Add new List"/>,
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

AddList.propTypes = {
  addNewShoppingList: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  userDetails: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  return{
    userDetails: state.userDetails,
    status: state.newShoppingList.status,
    message: state.newShoppingList.message
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({addNewShoppingList},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AddList);
