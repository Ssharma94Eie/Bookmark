import React from "react";
import '../../css/confirmation-modal.css'


function ConfirmationModal (props) {
  return (
    <div className="modal fade in confirmation-modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={() => {props.changeShowConfirmationModal()}} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Confirm Delete</h4>
          </div>
          <div className="modal-body">
            <p>{props.confirmationText}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={() => {props.changeShowConfirmationModal()}} data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" onClick={() => {props.acceptAction()}} >Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ConfirmationModal; 
