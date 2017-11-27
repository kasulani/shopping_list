import React, { Component }from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from "react-router";

class ShoppingListItemsTable extends Component{
  // This component is passed the table data as a prop from the application state
  constructor(props){
    super(props);
    this.state = {};
    //bind functions here - ES6 does not autobind
    this.renderTableDataAsRow = this.renderTableDataAsRow.bind(this);
  }

  renderTableDataAsRow(){
    // This method will map over the list object passed via the props and render
    // one table row per item in the object
    // objects in JS don't have a map function like arrays so we use lodash map
    // function to map the object that contains the shopping lists
    try {
      return _.map(this.props.items, theItem => {
        return (
          <tr key={theItem.id}>
            <td>{theItem.name}</td>
            <td>
              <Link to={`/edit/lists/${this.props.listId}/items/${theItem.id}`} className="btn btn-primary btn-xs">Edit</Link>
              <button
                onClick={()=>{this.props.onDeleteClick(theItem.id);}}
                data-toggle="modal" data-target="#myModal"
                style={{marginRight: 0.5 + 'em', marginLeft: 0.5 + 'em'}}
                className="btn btn-danger btn-xs" href="#">Delete</button>
              {/*<Link to={`add/items/${theItem.id}`}
                style={{marginRight: 0.5 + 'em'}}
                className="btn btn-success btn-xs" href="#">Add Items</Link>
              <a className="btn btn-warning btn-xs" href="#">View Items</a>*/}
            </td>
          </tr>
        );
      });
    } catch (e) {
      return;
    }
  }

  render(){
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Shopping list item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableDataAsRow()}
        </tbody>
      </table>
    );
  } // render()
} // class ShoppingListItemsTable

ShoppingListItemsTable.propTypes = {
  listId: PropTypes.number.isRequired,
  items: PropTypes.object.isRequired
};

export default ShoppingListItemsTable;
