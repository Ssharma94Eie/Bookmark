import React from "react";
import apiClient from "./API.js";
import TableContainer from "../Table/TableContainer";
import { DateFormatter } from "../Helper";
import ConfirmationModalContainer from "../ConfirmationModal/ConfirmationModalContainer";
import UserEditModal from "./UserEditModal"

class UserContainer extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      tableData: {
        head: [],
      },
      unchangedTableData: [],
      filteredRows: [],
      filter : false,
      sort: "ASC",
      modalData: [],
      toShowModal: false,
      allUserData: [],
      columnIndex: [  "firstName"
                    , "lastName"
                    , "age"

                  ],
      userId: '',
      // for confirm modal
      singleUserData: '',
      tableType: '',
      showConfirmationModal: false,
    }
    this.client = apiClient();
    this.getUserData = this.getUserData.bind(this);

    this.handleCellChange = this.handleCellChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditConfirmation = this.handleEditConfirmation.bind(this);
    this.filterByName = this.filterByName.bind(this);
    this.sortColumn = this.sortColumn.bind(this);
    this.handleViewUserRowClick = this.handleViewUserRowClick.bind(this);
    this.changeShowConfirmationModal = this.changeShowConfirmationModal.bind(this);
    this.closeModelHandler = this.closeModelHandler.bind(this);
    this.updateRowData = this.updateRowData.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

  }

  componentWillMount () {
    this.getUserData();
  }




  getUserData () {
     this.client.getAllUsers().then((json) => {
      console.log(json);
      let userData = buildDataForTable(json) ;
      if (userData) {
        
        let nonEditableHead = ["id"];
        let headExclude = ["createdAt", "updatedAt"];
        // let head = createTableHead (userData[0].user, nonEditableHead, headExclude);
        // let rows = createTableRow (userData, "user");
        let columnNumbering = this.state.columnIndex;
        let tableData = {
          head: createTableHead (userData[0], nonEditableHead, headExclude, columnNumbering),
          rows: createTableRow (userData, "user"),
        };
        this.setState({
          tableData: tableData,
          unchangedTableData: tableData,
          allUserData: userData,
        }, () => {
          this.handleCellChange();
        })
        
      }
    })
  }

  handleCellChange(id, key, value) {
     debugger
    let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
    let rowData = tableData.rows;

    let filterData = this.state.filteredRows;
    let filteredRowData;

    if(this.state.filter) {
      
      filteredRowData = filterData.rows;
      filteredRowData.forEach((elm, idx) => {
        if(elm.id === id) {
          if (key === 'gender') {
            elm[key] = value;
          } else if (key === 'stateId') {
            elm[key] = value;
          } else if (key === 'countryId') {
            elm[key] = value;
          } else {
            debugger
            elm[key] = capitalizeFirstLetter(value);
          }
          
        }
      })
    }


    rowData.forEach((elm, idx) => {
      if(elm.id === id) {
        if (key === 'gender') {
          elm[key] = value;
        } else if (key === 'stateId') {
          elm[key] = value;
        } else if (key === 'countryId') {
          elm[key] = value;
        }  else {
          debugger
          elm[key] = capitalizeFirstLetter(value);
        }
        
      }
    })
    tableData.rows = rowData;
    filterData.rows = filteredRowData;
    this.setState({
      tableData: tableData,
      filteredRows: filterData,
    })
    console.log(rowData)
  }

  handleEditClick(id) {
     
    let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
    let rowData = tableData.rows;

    let filterData = this.state.filteredRows;
    let filteredRowData;
    if(this.state.filter) {
      
      filteredRowData = filterData.rows;
      filteredRowData.forEach((elm, idx) => {
        if(elm.id === id) {
          elm["editable"] = true;
        } else {
          elm["editable"] = false;
        }
      })
    }
 
    rowData.forEach((elm, idx) => {
      if(elm.id === id) {
        elm["editable"] = true;
      } else {
        elm["editable"] = false;
      }
    })
    tableData.rows = rowData;
    filterData.rows = filteredRowData;
    this.setState({
      tableData : tableData,
      filteredRows: filterData,
    })

    console.log("double click")
  }

  handleEditConfirmation(id, action) {
     
    let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
    let rowData = tableData.rows;
    let unchangedTableData = JSON.parse(JSON.stringify( this.state.unchangedTableData ));
    let unchangedRows = unchangedTableData.rows;
    let oneUnchangedRow ;
    unchangedRows.forEach((elm, i) => {
      if (elm.id === id) {
        oneUnchangedRow = elm;
      }
    })

    if (action === true) {
      rowData.forEach((elm, idx) => {
        if(elm.id === id) {
          this.handleUpdateUserData(elm, "userTable");
          elm["editable"] = false;
          elm["edited"] = true;
        } else {
          elm["editable"] = false;
        }
      })
    } else {
      rowData.forEach((elm, idx) => {
        if(elm.id === id) {
          let keys = Object.keys(elm);
          keys.forEach((key, i) => {
            elm[key] = oneUnchangedRow[key];
          })
          elm["editable"] = false;
          elm = JSON.parse(JSON.stringify( oneUnchangedRow ));
        } else {
          elm["editable"] = false;
        }
      })
    }
    
    tableData.rows = rowData;
    this.setState({
      tableData
    })

    console.log("double click")
  }

  filterByName(value, key) {
    let tableData = JSON.parse(JSON.stringify( this.state.tableData ));
    let rowHead = tableData.head
    let rowData = tableData.rows;
    let filteredRows = [];
     
    rowData.forEach((elm, idx) => {
      if(elm[key]) {
        if(key === "gender") {
          if(elm[key].value.toString().includes(capitalizeFirstLetter(value))) {
            filteredRows.push(elm);
          }
        } else if ( key === "stateId" || key === "countryId" ) {
          if(elm[key].label.toString().includes(capitalizeFirstLetter(value))) {
            filteredRows.push(elm);
          }
        }
         else if (elm[key].toString().includes(capitalizeFirstLetter(value))) {
          filteredRows.push(elm);
        }
      }
      
    })
    if (filteredRows && value != "") {
      let filterData = {
        head: rowHead,
        rows: value ? filteredRows : rowData,
      }

      this.setState({
        filteredRows: filterData,
        filter : true,
      })
      
    } else {
      this.setState({
        tableData: tableData,
        filter : false,
      })
    }
    
  }

  sortColumn (key) {
    let isFiltered = this.state.filter; 

    let tableData = JSON.parse(JSON.stringify( isFiltered ? this.state.filteredRows : this.state.tableData ));
    let rowHead = tableData.head;
    let rowData = tableData.rows;


    let sortType = this.state.sort;
    let sortedRow = rowData.sort(function(a, b) {
      var textA = a[key] ? a[key] : "";
      var textB = b[key] ? b[key] : "";
       
      if( sortType === "ASC" ) {
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      } else {
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      }
      
  });
    if (sortedRow) {
      let sortedData = {
        head: rowHead,
        rows: sortedRow,
        
      }
      if(isFiltered) {
        this.setState({
          filteredRows: sortedData,
          sort: sortType === "ASC" ? "DSC" : "ASC",
          // sort : tr,
        })
      } else {
        this.setState({
          tableData: sortedData,
          sort: sortType === "ASC" ? "DSC" : "ASC",
          // sort : tr,
        })
      }
      
    }
  }

  handleViewUserRowClick (id) {
    let allUserData = this.state.allUserData;
    let onUserData ;
    allUserData.forEach((elm, idx) => {
      if (elm.id === id) {
        onUserData = elm;
      }
    })
    this.setState({
      modalData: onUserData,
      toShowModal: true,
      userId: id, 
    })
  }

  changeShowConfirmationModal (id) {
    this.setState ({
      showConfirmationModal: !this.state.showConfirmationModal,
      userId: id,
    })
  }

  closeModelHandler () {
    this.setState({
      toShowModal: false,
    })
  }

  updateRowData(id, data) {
    debugger
    let tableData = Object.assign({}, this.state.tableData);
    tableData.rows && tableData.rows.forEach((elm, i) => {
      if (id == elm.id) {
        debugger
        tableData.rows[i]['firstName'] = data.firstName;
        tableData.rows[i]['lastName'] = data.lastName;
        tableData.rows[i]['age'] = data.age;
      }
    })
    this.setState({
      tableData
    })
  }

  deleteUser() {
    debugger
    this.client.deleteUser().then(() => {
      let tableData = Object.assign({}, this.state.tableData) ;
      tableData.rows && tableData.rows.forEach((elm, i) => {
        if (this.state.userId == elm.id) {
          debugger
          tableData.rows.splice(i, 1);
        }
      })
      this.setState({
        tableData: tableData,
        showConfirmationModal: false,
      })
    }) 
  }


  render () {
    return (
      <div>
      {
        this.state.tableData.head.length > 0 ?
        (
          <TableContainer 
            tableData={this.state.filter === true ? this.state.filteredRows : this.state.tableData}  
            editable={true}
            handleCellChange={this.handleCellChange}
            handleCellDoubleClick={this.handleCellDoubleClick}
            handleOnBlur={this.handleOnBlur}
            handleEditClick={this.handleEditClick}
            handleEditConfirmation={this.handleEditConfirmation}
            filterByName={this.filterByName}
            sortColumn={this.sortColumn}
            filter={this.state.filter}
            filteredRows={this.state.filteredRows}
            handleViewUserRowClick={this.handleViewUserRowClick}
            selectData={this.state.selectData}
            changeShowConfirmationModal={this.changeShowConfirmationModal}
          />
        ) : "Please Wait"
      }

      {
        this.state.toShowModal ?
        (
          <UserEditModal 
            modalData={this.state.modalData}
            closeModelHandler={this.closeModelHandler}
            handleUpdateUserData={this.handleUpdateUserData}
            tableData={this.state.filter === true ? this.state.filteredRows : this.state.tableData} 
            userId={this.state.userId}
            updateRowData={this.updateRowData}
          />
        ) : null
      }
      {
        this.state.showConfirmationModal ?
        (
          <ConfirmationModalContainer
            changeShowConfirmationModal={this.changeShowConfirmationModal}
            confirmationText="Do you really want to delete this user?"
            acceptAction={this.deleteUser}

          />
        ) : null
      }
      </div>
    )
  }
}

export default UserContainer;






function buildDataForTable(data) {
   

  let userAllData = [];
  data.forEach((elm, idx) => { 
    debugger
    // let oneData = {};                                                                    // Here we can itrate and select what stucture of data we need 
    // oneData['user'] = elm.trainerDetails.clientDetails.user;
    // oneData['clientProfile'] = elm.trainerDetails.clientDetails.clientProfile;
    // oneData['merchantProfile'] = elm.merchantProfile;
    // oneData['trainerProfile'] = elm.trainerDetails.trainerProfile;
    // userAllData.push(oneData)
    userAllData.push(elm);
  })


   
  return userAllData;
}



function createTableHead (data, nonEditableHead, headExclude, columnNumbering) {
   
  let head = [];
  let keys = Object.keys(data);
  debugger
  columnNumbering.forEach((item, i) => {
    debugger
    keys.forEach((elm, idx) => {
      debugger
      if(item == elm) {
        if(!headExclude.includes(elm)) {
          let oneHeadObject = {
            key: elm,
          };
          let string = capitalizeFirstLetter(elm)
          
          let splitedText = string.split(/(?=[A-Z])/);
          let splitedTextWithNumber = [];
          splitedText.forEach((txt, i) => {
            let temp = []
            temp.push(txt.split(/([0-9]+)/).join(" "));

            splitedTextWithNumber.push(temp.join(" "));
          })
          let label = splitedTextWithNumber.join(" ");

          oneHeadObject["label"] = label;

          if (nonEditableHead.includes(elm)) {
            oneHeadObject["editable"] = false;
          } else {
            oneHeadObject["editable"] = true;
          }

          head.push(oneHeadObject);
        }
      }
      
    })
  })

   
  return head;

}

function capitalizeFirstLetter(string) {
    return string ? ( string.charAt(0).toUpperCase() + string.slice(1) ) : null
}


function createTableRow (allData, requiredKey) {
   
  let rows = [];
  allData.forEach((elm, idx) => {
    // let row = elm.user ? elm.user.toUpperCase() : "";
    let row = {};
    let keys = Object.keys(elm);
    keys.forEach((key) => {
      if (key === "createdAt" || key === "updatedAt") {
        row[key] = DateFormatter(elm[key]);
      } else if (key === "stateId") {
        window.state.forEach((state) => {
          if (state.id === elm[key]) {
            row[key] = {
              label: state.name,
              value: state.id,
            };
          }
        })
      } else if (key === "countryId") {
        window.country.forEach((country) => {
          if (country.id === elm[key]) {
            row[key] = {
              label: country.name,
              value: country.id,
            };
          }
        })
      } else if (key === "role") {
         
        if (elm[key] == "UserR") {
          row[key] = "User"
        } else {
          row[key] = "Admin"
        }
      } else {
        if (key === "isActive" || key === "emailVerified") {
          row[key] = elm[key] ? (key === "id" ? elm[key] : elm[key] ) : false;
        } else {
          row[key] = elm[key] ? (key == "id" ? elm[key] : elm[key] ) : "";
        }
        

      }
    })
    if (row.gender) {
      let genderOption = {
        label: row.gender,
        value: row.gender,
      }
      row.gender = genderOption;
    }
    row["edited"] = false;
    row["hidden"] = false;
    row["editable"] = false;
    row["modalView"] = false;
    rows.push(row);
  })
   
  return rows;

}
