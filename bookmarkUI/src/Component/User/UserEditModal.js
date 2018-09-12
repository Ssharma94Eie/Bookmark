import React from "react";
import "../../css/user.css";
import apiClient from "./API.js";

class UserEditModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      toEdit: false,
      firstName: "",
      lastName: "",
      age: "",
      id : "",
    }
    this.client = apiClient();
    this.changeToEdit = this.changeToEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateUserData = this.handleUpdateUserData.bind(this);
  }

  changeToEdit () {
    this.setState ({
      toEdit: !this.state.toEdit,
    })
  }

  componentWillMount () {
    let modalData = this.props.modalData;
    if (modalData) {
      this.setState({
        firstName: modalData.firstName,
        lastName: modalData.lastName,
        age: modalData.age,
        id : modalData.id,
      })
    }
  }

  handleInputChange (value, type) {
    debugger
    if (type == 'firstName') {
      this.setState({
        firstName: value
      })
    } else if (type == 'lastName') {
      this.setState({
        lastName: value
      })
    } else if (type == 'age') {
      this.setState({
        age: value
      })
    }
  }

  handleUpdateUserData () {
    let state = this.state;
    let userObject = {
      'firstName' : state.firstName,
      'lastName' : state.lastName,
      'age' : state.age,
    }
    this.client.updateUser(state.id, userObject).then(() => {
      debugger
      this.props.updateRowData(state.id, userObject);
      this.props.closeModelHandler();
    })
  } 

  render () {
    let modalData = this.props.modalData;
    let toEdit = this.state.toEdit;
    let state = this.state;
    return (
      <div className="modal fade in userModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button 
                type="button" 
                className="close" 
                data-dismiss="modal" 
                aria-label="Close"
                onClick={() => {this.props.closeModelHandler()}}
              ><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Edit User Data</h4>

            </div>
            <div className="modal-body">
            {
              !toEdit ?
              (
                <span 
                  className="glyphicon glyphicon-edit pull-right"
                  onClick={() => {this.changeToEdit()}}
                ></span>
              ) : null
            }
              

              <div className="row">
                <div className="col-md-4">
                  <label>ID</label>
                </div>
                <div className="col-md-6">
                  <span>{modalData.id}</span>
                </div>
                
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label>First Name</label>
                </div>
                <div className="col-md-6">
                {
                  toEdit ?
                  (
                    <input 
                      value={state.firstName}
                      type="text"
                      onChange={(e) => {this.handleInputChange(e.target.value, "firstName")}}

                    />
                  ) :
                  (
                    <span>{modalData.firstName}</span>
                  )
                  
                }
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label>Last Name</label>
                </div>
                <div className="col-md-4">
                  {
                  toEdit ?
                  (
                    <input 
                      value={state.lastName}
                      type="text"
                      onChange={(e) => {this.handleInputChange(e.target.value, "lastName")}}

                    />
                  ) :
                  (
                    <span>{modalData.lastName}</span>
                  )
                  
                }
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label>Age</label>
                </div>
                <div className="col-md-4">
                  {
                  toEdit ?
                  (
                    <input 
                      value={state.age}
                      type="number"
                      onChange={(e) => {this.handleInputChange(e.target.value, "age")}}

                    />
                  ) :
                  (
                    <span>{modalData.age}</span>
                  )
                  
                }
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-default" 
                data-dismiss="modal"
                onClick={() => {this.props.closeModelHandler()}}
              >Close</button>
              {
                toEdit ?
                (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {this.handleUpdateUserData()}}
                  >Save changes</button>
                ) : null
              }
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserEditModal;