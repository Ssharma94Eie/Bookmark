import React from "react";
import ConfirmationModal from "./ConfirmationModal";

class ConfirmationModalContainer extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    }


  }

  render () {
    return (
      <ConfirmationModal 
        changeShowConfirmationModal={this.props.changeShowConfirmationModal}
        confirmationText={this.props.confirmationText}
        acceptAction={this.props.acceptAction}
      />
    )
  }
}


export default ConfirmationModalContainer; 