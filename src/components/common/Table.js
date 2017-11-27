import React, { Component }from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from "react-router";

class Table extends Component{
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
    return _.map(this.props.lists, aList => {
      return (
        <tr key={aList.id}>
          <td>{aList.title}</td>
          <td>
            <Link to={`edit/lists/${aList.id}`} className="btn btn-primary btn-xs">Edit</Link>
            <button onClick={()=>{this.props.onDeleteClick(aList.id);}} data-toggle="modal" data-target="#myModal"
              style={{marginRight: 0.5 + 'em', marginLeft: 0.5 + 'em'}}
              className="btn btn-danger btn-xs">Delete</button>
            <Link to={`add/items/${aList.id}`}
              style={{marginRight: 0.5 + 'em'}}
              className="btn btn-success btn-xs">Add Items</Link>
            <Link to={`view/items/${aList.id}`}
              className="btn btn-warning btn-xs">View Items</Link>
          </td>
        </tr>
      );
    });
  }

  render(){
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Shopping list</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableDataAsRow()}
        </tbody>
      </table>
    );
  } // render()
} // class Table

Table.propTypes = {
  lists: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default Table;
