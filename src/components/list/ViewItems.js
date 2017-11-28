import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ShoppingListItemsTable from '../common/ShoppingListItemsTable';
import ListContainer from '../list/ListContainer';
import {bindActionCreators} from "redux";
import {getShoppingListItems, deleteShoppingListItem, getUser} from "../../actions/shoppingListsActions";
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import _ from 'lodash';
import {Link} from "react-router";
import DeleteModal from '../common/DeleteModal';

class ViewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: { id: "", name: "", description: "" },
      shoppingListItem: {id: ""}
    };
    this.getTitle = this.getTitle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setDeleteId = this.setDeleteId.bind(this);
  }

  componentWillMount(){
    const currentList = this.state.currentList;
    currentList.id = this.props.selectedShoppingList.id;
    currentList.name = this.props.selectedShoppingList.title;
    currentList.description = this.props.selectedShoppingList.description;
    this.setState({currentList: currentList});
  }

  componentDidMount(){
    //when the ViewItems component mounts, fetch the shopping lists
    this.props.getShoppingListItems(this.state.currentList.id);
    this.props.getUser(); // get the user details
  }

  getTitle(){
    // this function returns the title to display on the area where the table of
    // lists is
    let obj = this.props.shoppingListItems;
    try {
      if(Object.keys(obj).length === 0){
        return "Add a shopping list item"; // this shows for a first time user
      }
      return "Here are your shopping lists Items"; // this shows when user has lists
    } catch (e) {
      return "Add a shopping list item";
    }
  }

  deleteItem(){
    this.props.deleteShoppingListItem(
      this.state.shoppingListItem.id, this.state.currentList.id
    )
    .then(()=>{
      if (this.props.status == 'fail'){
        toastr.error(
         this.props.message, "Shopping List - Error", TOASTR_CONFIG);
      } else {
        toastr.success(
         this.props.message, "Shopping List", TOASTR_CONFIG);
         this.props.getShoppingListItems(this.state.currentList.id); // force refresh the items table
         this.props.getUser(); // update user profile component
      }
    });
  }

  setDeleteId(id){
    const shoppingListItem = this.state.shoppingListItem;
    shoppingListItem.id = id;
    this.setState({shoppingListItem:shoppingListItem});
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
            <ListContainer title={this.getTitle()}>
              {[
                <Link key="1" to="/dashboard"
                  className="btn btn-sm btn-primary pull-right">
                  Back
                </Link>,
                <ShoppingListItemsTable key="2"
                  onDeleteClick={this.setDeleteId}
                  listId={this.props.params.id} items={this.props.shoppingListItems}/>
              ]}
            </ListContainer>
          </div>
        </section>
        <DeleteModal
          action="Delete an item"
          message="Are you sure you want to permanently delete this item from the database?"
          deleteFunc={this.deleteItem}/>
      {/*div-container*/}
      </div>
    );
  }
}

ViewItems.propTypes = {
  params: PropTypes.object.isRequired,
  shoppingListItems: PropTypes.object.isRequired,
  selectedShoppingList: PropTypes.object.isRequired,
  getShoppingListItems: PropTypes.func.isRequired,
  deleteShoppingListItem: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return{
    userDetails: state.userDetails,
    status: state.deletedShoppingListItem.status,
    message: state.deletedShoppingListItem.message,
    shoppingListItems: state.shoppingListItems,
    selectedShoppingList: _.mapKeys(state.shoppingLists.lists, 'id')[ownProps.params.id]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getShoppingListItems, getUser, deleteShoppingListItem},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewItems);
