import React, { Component }from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";

const DeleteModal = (props) => {
  return(
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">{props.action}</h4>
          </div>
          <div className="modal-body">
            <p>{props.message}</p>
          </div>
          <div className="modal-footer">
            <button id="cancelModalBtn" type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            <button  id="deleteModalBtn" onClick={props.deleteFunc} type="button" data-dismiss="modal" className="btn btn-danger">Yes Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  deleteFunc: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default DeleteModal;
