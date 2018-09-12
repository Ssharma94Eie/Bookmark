import React from 'react';
import Table from "./Table";

class TableContainer extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   tableData: {
    //     head: [
    //     {
    //       key: 'firstName',
    //       label: "First Name",
    //       editable : true,
          
    //     }, 
    //     {
    //       key: 'lastName',
    //       label: "Last Name",
    //       editable : true,
          
    //     }, 
    //     {
    //       key: 'userType', 
    //       label: "User Type",
    //       editable : false,
          
    //     }
    //   ],
    //     rows: 
    //     [
    //       {
    //         id: 1,
    //         firstName: "shubham",
    //         lastName: "sharma",
    //         userType: "AdminR",
    //         edited: false,
    //         hidden: false,

    //       },
    //       {
    //         id: 2,
    //         firstName: "anurag",
    //         lastName: "sharma",
    //         userType: "AdminR",
    //         edited: false,
    //         hidden: false,

    //       },
    //       {
    //         id: 3,
    //         firstName: "navdeep",
    //         lastName: "kumar",
    //         userType: "AdminR",
    //         edited: false,
    //         hidden: false,

    //       },
    //     ],
        
    //   },

    //   unchangedTableData: {
    //     head: [
    //       {
    //         key: 'firstName',
    //         label: "First Name",
    //       }, 
    //       {
    //         key: 'lastName',
    //         label: "Last Name"
    //       }, 
    //       {
    //         key: 'userType', 
    //         label: "User Type"
    //       }
    //     ],
    //     rows: [
    //     {
    //       id: 1,
    //       firstName: "shubham",
    //       lastName: "sharma",
    //       userType: "AdminR",
    //       editable : false,
    //       edited: false,
    //       hidden: false,

    //     },
    //     {
    //       id: 2,
    //       firstName: "anurag",
    //       lastName: "sharma",
    //       userType: "AdminR",
    //       editable : false,
    //       edited: false,
    //       hidden: false,

    //     },
    //     {
    //       id: 3,
    //       firstName: "navdeep",
    //       lastName: "kumar",
    //       userType: "AdminR",
    //       editable : false,
    //       edited: false,
    //       hidden: false, 


    //     },
    //     ]
    //   },
    //   filteredRows: [],
    //   filter : false,
    //   sort: "ASC",
    // }
    // this.handleCellChange = this.handleCellChange.bind(this);
    // this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this);
    // this.handleOnBlur = this.handleOnBlur.bind(this);
    // this.handleEditClick = this.handleEditClick.bind(this);
    // this.handleEditConfirmation = this.handleEditConfirmation.bind(this);
    // this.filterByName = this.filterByName.bind(this);
    // this.sortColumn = this.sortColumn.bind(this);
  }

  // handleCellChange(id, key, value) {
  //    
  //   let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
  //   let rowData = tableData.rows;
  //   rowData.forEach((elm, idx) => {
  //     if(elm.id == id) {
  //       elm[key] = value;
  //     }
  //   })
  //   tableData.rows = rowData;
  //   this.setState({
  //     tableData
  //   })
  //   console.log(rowData)
  // }

  // componentDidMount() {
  //   this.handleCellChange();
  // }

  // handleCellDoubleClick(id, key) {
  //    
  //   let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
  //   let rowData = tableData.rows;

  //   rowData.forEach((elm, idx) => {
  //     if(elm.id == id) {
  //       elm["editable"] = true;
  //     } else {
  //       elm["editable"] = false;
  //     }
  //   })
  //   tableData.rows = rowData;
  //   this.setState({
  //     tableData
  //   })

  //   console.log("double click")
  // }

  // handleOnBlur () {
  //    
  //   let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
  //   let rowData = tableData.rows;
  //   rowData.forEach((elm, idx) => {
  //     elm["editable"] = false;
  //   })
  //   tableData.rows = rowData;
  //   this.setState({
  //     tableData
  //   })
  // }

  // handleEditClick(id) {
  //    
  //   let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
  //   let rowData = tableData.rows;

  //   rowData.forEach((elm, idx) => {
  //     if(elm.id == id) {
  //       elm["editable"] = true;
  //     } else {
  //       elm["editable"] = false;
  //     }
  //   })
  //   tableData.rows = rowData;
  //   this.setState({
  //     tableData
  //   })

  //   console.log("double click")
  // }

  // handleEditConfirmation(id, action) {
  //    
  //   let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
  //   let rowData = tableData.rows;
  //   let unchangedTableData = JSON.parse(JSON.stringify( this.state.unchangedTableData ));
  //   let unchangedRows = unchangedTableData.rows;
  //   let oneUnchangedRow ;
  //   unchangedRows.forEach((elm, i) => {
  //     if (elm.id == id) {
  //       oneUnchangedRow = elm;
  //     }
  //   })

  //   if (action == true) {
  //     rowData.forEach((elm, idx) => {
  //       if(elm.id == id) {
  //         elm["editable"] = false;
  //         elm["edited"] = true;
  //       } else {
  //         elm["editable"] = false;
  //       }
  //     })
  //   } else {

  //     rowData.forEach((elm, idx) => {
  //       if(elm.id == id) {
  //         let keys = Object.keys(elm);
  //         keys.forEach((key, i) => {
  //           elm[key] = oneUnchangedRow[key];
  //         })
  //         elm["editable"] = false;
  //         elm = JSON.parse(JSON.stringify( oneUnchangedRow ));
  //       } else {
  //         elm["editable"] = false;
  //       }
  //     })
  //   }
    
  //   tableData.rows = rowData;
  //   this.setState({
  //     tableData
  //   })

  //   console.log("double click")
  // }


  // filterByName(value, key) {
  //   let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
  //   let rowHead = tableData.head
  //   let rowData = tableData.rows;
  //   let filteredRows = [];
  //    
  //   rowData.forEach((elm, idx) => {
  //     if (elm[key].includes(value)) {
  //       filteredRows.push(elm);
  //     }
  //   })
  //   if (filteredRows) {
  //     let filterData = {
  //       head: rowHead,
  //       rows: filteredRows
  //     }

  //     this.setState({
  //       filteredRows: filterData,
  //       filter : true,
  //     })
      
  //   } else {
  //     this.setState({
  //       tableData: tableData,
  //       filter : false,
  //     })
  //   }
    
  // }

  // sortColumn (key) {
  //   let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
  //   let rowHead = tableData.head;
  //   let rowData = tableData.rows;

  //   let sortType = this.state.sort;
  //   let sortedRow = rowData.sort(function(a, b) {
  //     var textA = a[key].toUpperCase();
  //     var textB = b[key].toUpperCase();
  //      
  //     if( sortType == "ASC" ) {
  //       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  //     } else {
  //       return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
  //     }
      
  // });
  //   if (sortedRow) {
  //     let sortedData = {
  //       head: rowHead,
  //       rows: sortedRow,
        
  //     }
  //     this.setState({
  //       tableData: sortedData,
  //       sort: sortType == "ASC" ? "DSC" : "ASC",
  //       // sort : tr,
  //     })
  //   }
  // }

  render () {
    return (
      <Table 
        tableData={this.props.filter == true ? this.props.filteredRows : this.props.tableData}  
        editable={true}
        handleCellChange={this.props.handleCellChange}
        handleCellDoubleClick={this.props.handleCellDoubleClick}
        handleOnBlur={this.props.handleOnBlur}
        handleEditClick={this.props.handleEditClick}
        handleEditConfirmation={this.props.handleEditConfirmation}
        filterByName={this.props.filterByName}
        sortColumn={this.props.sortColumn}
        handleViewUserRowClick={this.props.handleViewUserRowClick}
        selectData={this.props.selectData}
        changeShowConfirmationModal={this.props.changeShowConfirmationModal}
        hideEdit={this.props.hideEdit}
        hideDelete={this.props.hideDelete}

        
      />  
    )
  }
}

export default TableContainer;