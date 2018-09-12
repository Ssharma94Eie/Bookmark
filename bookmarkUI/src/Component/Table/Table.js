import React from 'react';
import '../../css/table.css';
import Select from 'react-select';




function Table (props) {

  return(
    <div>
        <table className="table table-responsive table-hover table-bordered" id="myTable">
          {
            props.tableData ?
            (
              
                <thead>
                  <tr>
                    {
                      props.tableData.head.map((elm, idx) => {
                        return(
                          <HeadCell 
                            key={idx} 
                            headData={elm} 
                            filterByName={props.filterByName}
                            sortColumn={props.sortColumn}
                            headIndex={idx}

                          />
                        )
                        
                      })
                    } 
                    <th>Action</th>
                  </tr>
                </thead>
                
                 
                
              
            ) :
            "Please provide table data in correct format and props name"
          }
          {
            <tbody>
              {props.tableData.rows.map((elm, idx) => {
                return(
                  <Rows 
                    key={idx} 
                    rowData={elm} 
                    headData={props.tableData.head} 
                    handleCellChange={props.handleCellChange} 
                    handleCellDoubleClick={props.handleCellDoubleClick}
                    handleOnBlur={props.handleOnBlur}
                    handleEditClick={props.handleEditClick}
                    handleEditConfirmation={props.handleEditConfirmation}
                    handleViewUserRowClick={props.handleViewUserRowClick}
                    selectData={props.selectData}
                    changeShowConfirmationModal={props.changeShowConfirmationModal}
                    hideEdit={props.hideEdit}
                    hideDelete={props.hideDelete}


                    
                  />
                )  
              })}
            </tbody>
          }
        </table>
      </div>
  )
}

export default Table;


function HeadCell (props) {
  return (
    <th>
      <input 
        type='text' 
        placeholder={props.headData.label} 
        className="form-control " 
        data-column-no={props.headIndex}  
        onChange={(event) => {props.filterByName(event.target.value, props.headData.key)}}
        />
      <div className="input-group-btn">
        <button 
          type="button" 
          data-table-id="" 
          data-row-name="" 
          data-column-name="" 
          className="btn btn-default" 
          onClick={() => {props.sortColumn(props.headData.key)}}
        >
          <span className="caret"></span> <span className="sr-only">Sort By Name</span>
        </button>
      </div>
    </th>
  )
}

function Rows (props) {
  if (props.rowData.hidden == false) {
    return (
      <tr data-id={props.rowData.id}>
        {
          props.headData && props.headData.map((head, i) => {
            return(
              <td key={i} 
                onDoubleClicks={() => {props.handleCellDoubleClick(props.rowData.id, head.key)}}
              >
                {
                  head.editable ? 
                  (
                    props.rowData.editable ?
                    (
                      props.selectData && props.selectData[head.key] ?
                      (
                        <SelectComponent 
                          value={props.rowData[head.key]}
                          options={props.selectData[head.key]}
                          handleCellChange={props.handleCellChange} 
                          id={props.rowData.id} 
                          headKey={head.key}
                        />
                      ) :
                      (
                        <input 
                          type='text' 
                          value={props.rowData[head.key]} 
                          onChange={(e) => {props.handleCellChange(props.rowData.id, head.key, e.target.value)}} 
                          bonDoubleClicks={() => {props.handleCellDoubleClick(props.rowData.id, head.key)}}
                          onBlurs={() => {props.handleOnBlur()}}
                        />
                      )
                      

                    ) : (

                      props.rowData[head.key] ? (
                        head.key == "gender" || head.key == "countryId" || head.key == "stateId" ? 
                        (
                          props.rowData[head.key].label ? capitalizeFirstLetter(String(props.rowData[head.key].label)) : ""
                        ) : (
                          props.rowData[head.key] ? capitalizeFirstLetter(String(props.rowData[head.key])) : ""
                        )
                        
                      ) : props.rowData[head.key] ? capitalizeFirstLetter(String(props.rowData[head.key])) : ""
                    )
                  ) : 
                  (
                    props.rowData[head.key] ? (
                        head.key == "gender" || head.key == "countryId" || head.key == "stateId" ? 
                        (
                          props.rowData[head.key].label ? capitalizeFirstLetter(String(props.rowData[head.key].label)) : ""
                        ) : (
                          props.rowData[head.key] ? capitalizeFirstLetter(String(props.rowData[head.key])) : ""
                        )
                        
                      ) : ""
                  )
                  

                }
                
              </td>
            )
          })
          
        }
        <td>
         {
          props.rowData.editable ?
          (
            <span className='edit-confirmation'>
              <span 
                className='glyphicon glyphicon-ok'
                onClick={() => {props.handleEditConfirmation(props.rowData.id, true)}}
              ></span>
              <span 
                className='glyphicon glyphicon-remove'
                onClick={() => {props.handleEditConfirmation(props.rowData.id, false)}}
              ></span>
            </span>
          ) :
          (
            <span className='edit-delete'>
              {/*<span 
                className='glyphicon glyphicon-pencil'
                onClick={() => {props.handleEditClick(props.rowData.id)}}
              ></span>*/}
              {
                !props.hideDelete ? 
                (
                  <span 
                    className='glyphicon glyphicon-trash'
                    onClick={(e) => {props.changeShowConfirmationModal(props.rowData.id, "", e)}}
                  ></span>
                ) : 
                null
              }
             
              {/*{
                props.rowData.modalView ?
                (*/}
                {
                  !props.hideEdit ? 
                  (
                    <span 
                      className='glyphicon glyphicon-eye-open' 
                      onClick={() => {props.handleViewUserRowClick(props.rowData.id)}}
                    ></span>
                  ) : null
                }
                  
                {/*) : null
              }*/}
              
            </span>
          )
         }
          
          
        </td>
      </tr>
    )
  }
  else {
    return(
      <span></span>
    )
  }
}

class SelectComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleChange = (selectedOption) => {
     
    // this.setState({ selectedOption });
    this.props.handleCellChange(this.props.id, this.props.headKey, selectedOption)
    console.log(`Option selected:`, selectedOption);
  }

  render () {
    return (
      <Select 
        value={this.props.value}
        options={this.props.options}
        onChange={this.handleChange}
      />
    )
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

