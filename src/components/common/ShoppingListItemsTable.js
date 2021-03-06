import React, { Component }from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from "react-router";

function renderTableDataAsRow(props){
  // This method will map over the list object passed via the props and render
  // one table row per item in the object
  // objects in JS don't have a map function like arrays so we use lodash map
  // function to map the object that contains the shopping lists
  // try {
  return _.map(props.items, theItem => {
    return (
      <tr key={theItem.id}>
        <td id="itemName">{theItem.name}</td>
        <td id="itemActions">
          <Link
            id="editItemBtn"
            to={`/edit/lists/${props.listId}/items/${theItem.id}`}
            className="btn btn-primary btn-xs">Edit</Link>
          <button id="deleteItemBtn"
            onClick={()=>{props.onDeleteClick(theItem.id);}}
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
  // } catch (e) {
  //   return;
  // }
}

const ShoppingListItemsTable = (props) => {
  return(
    <table className="table">
      <thead>
        <tr>
          <th>Shopping list item</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {renderTableDataAsRow(props)}
      </tbody>
    </table>
  );
};

ShoppingListItemsTable.propTypes = {
  listId: PropTypes.number.isRequired,
  items: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ShoppingListItemsTable;
