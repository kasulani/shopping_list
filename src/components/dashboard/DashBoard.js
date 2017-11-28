import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import NavBar from '../common/NavBar';
import UserProfile from '../common/UserProfile';
import ShoppingListTable from '../common/ShoppingListTable';
import SimplePager from '../common/SimplePager';
import ListContainer from '../list/ListContainer';
import {bindActionCreators} from "redux";
import {
  getShoppingLists,
  deleteShoppingList,
  getUser, getListsOnPage} from "../../actions/shoppingListsActions";
import toastr from "toastr";
import {TOASTR_CONFIG} from "../../configs";
import DeleteModal from '../common/DeleteModal';
import { browserHistory } from 'react-router';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList:{id:""},
      search:{term:""}
    };
    this.getTitle = this.getTitle.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.setDeleteId = this.setDeleteId.bind(this);
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
    this.onPrevButtonClick = this.onPrevButtonClick.bind(this);
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
  }

  componentDidMount(){
    //when the DashBoard component mounts, fetch the shopping lists
    this.props.getShoppingLists();
    this.props.getUser(); // get the user details
  }

  getTitle(){
    // this function returns the title to display on the area where the table of
    // lists is
    if (this.props.shoppingLists){
      let obj = this.props.shoppingLists;
      if(Object.keys(obj).length === 0){
        return "Welcome! Add your first list"; // this shows for a first time user
      }
      return "Here are your shopping lists"; // this shows when user has lists
    }
  }

  deleteList(){
    this.props.deleteShoppingList(this.state.shoppingList.id)
    .then(()=>{
      if (this.props.status == 'fail'){
        toastr.error(
         this.props.message, "Shopping List - Error", TOASTR_CONFIG);
      } else {
        toastr.success(
         this.props.message, "Shopping List", TOASTR_CONFIG);
         this.props.getShoppingLists(); // force refresh the shopping list table
         this.props.getUser(); // update user profile component
      }
    });
  }

  setDeleteId(id){
    const shoppingList = this.state.shoppingList;
    shoppingList.id = id;
    this.setState({shoppingList:shoppingList});
  }

  onSearchFormSubmit(event){
    event.preventDefault();
    if(this.state.search.term != ""){
      this.props.getListsOnPage("/shoppinglists?q="+this.state.search.term);
    }
    // console.log("/shoppinglists?q="+this.state.search.term);
  }

  onNextButtonClick(){
    // This the function will be called when user clicks on the next button of
    // the pager to fetch the next page
    if(this.props.next_page != 'none'){
      // console.log(this.props.next_page);
      this.props.getListsOnPage(this.props.next_page);
    }
  }

  onPrevButtonClick(){
    // This the function will be called when user clicks on the previous button of
    // the pager to fetch the previous page
    if(this.props.prev_page != 'none'){
      this.props.getListsOnPage(this.props.prev_page);
    }
  }
  onSearchTextChange(event){
    const search = this.state.search;
    if (event.target.name == 'searchField'){
      search.term = event.target.value;
    }
    this.setState({search: search});
  }

  render(){
    return(
      <div className="container">
        <NavBar
          onFormSubmit={this.onSearchFormSubmit}
          searchTerm={this.state.search.term}
          onSearchTextChange={this.onSearchTextChange}
        />
        <section className="content">
          {/*<div>
            <ol className="breadcrumb">
            <li className="active">
              <span className="glyphicon glyphicon-dashboard" aria-hidden="true"></span> Dashboard</li>
            </ol>
          </div>*/}
          <div className="row">
            <UserProfile
              username={this.props.userDetails.username}
              description={this.props.userDetails.description}
              lists={this.props.userDetails.num_of_lists}
              items={this.props.userDetails.num_of_items}/>
            <ListContainer
              icon="glyphicon glyphicon-list-alt"
              title={this.getTitle()}
              footer={
                <SimplePager
                  onPrevButtonClick={this.onPrevButtonClick}
                  onNextButtonClick={this.onNextButtonClick}
                  next_page_state={this.props.next_page}
                  prev_page_state={this.props.prev_page}
                  show={
                    (this.props.next_page === 'none' &&
                    this.props.prev_page === 'none')?"false":"true"}
                />
              }
            >
              <ShoppingListTable onDeleteClick={this.setDeleteId} lists={this.props.shoppingLists}/>
            </ListContainer>
          </div>
        </section>
        <DeleteModal
          action="Delete a list"
          message="Are you sure you want to permanently delete this list from the database?"
          deleteFunc={this.deleteList}/>
      {/*div-container*/}
      </div>
    );
  }
}

DashBoard.propTypes = {
  userDetails: PropTypes.object.isRequired,
  shoppingLists: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getListsOnPage: PropTypes.func.isRequired,
  getShoppingLists: PropTypes.func.isRequired,
  deleteShoppingList: PropTypes.func.isRequired,
  next_page: PropTypes.string.isRequired,
  prev_page: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return{
    next_page: state.shoppingLists.next_page,
    prev_page: state.shoppingLists.previous_page,
    shoppingLists: state.shoppingLists.lists,
    status: state.deletedShoppingList.status,
    message: state.deletedShoppingList.message,
    userDetails: state.userDetails
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getShoppingLists, deleteShoppingList, getUser, getListsOnPage},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
