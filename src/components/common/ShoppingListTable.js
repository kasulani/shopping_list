import React, { Component }from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from "react-router";

function renderTableDataAsRow(props){
  // This method will map over the list object passed via the props and render
  // one table row per item in the object
  // objects in JS don't have a map function like arrays so we use lodash map
  // function to map the object that contains the shopping lists
  return _.map(props.lists, aList => {
    return (
      <tr key={aList.id}>
        <td id="listTitle">{aList.title}</td>
        <td id="listActions">
          <Link id="editListBtn" to={`edit/lists/${aList.id}`}
            className="btn btn-primary btn-xs">Edit</Link>
          <button id="deleteListBtn"
            onClick={()=>{props.onDeleteClick(aList.id);}}
            data-toggle="modal" data-target="#myModal"
            style={{marginRight: 0.5 + 'em', marginLeft: 0.5 + 'em'}}
            className="btn btn-danger btn-xs">Delete</button>
          <Link id="addItemBtn" to={`add/items/${aList.id}`}
            style={{marginRight: 0.5 + 'em'}}
            className="btn btn-success btn-xs">Add Items</Link>
          <Link id="viewItemBtn" to={`view/items/${aList.id}`}
            className="btn btn-warning btn-xs">View Items</Link>
        </td>
      </tr>
    );
  });
}

const ShoppingListTable = (props) => {
  return(
    <table className="table">
      <thead>
        <tr>
          <th>Shopping list</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {renderTableDataAsRow(props)}
      </tbody>
    </table>
  );
};

ShoppingListTable.propTypes = {
  lists: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ShoppingListTable;
