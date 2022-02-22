import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
import Model from "../../Common/Model";
import { TableData } from "../../Common/TableData";
import FasctoryEmployee from "./FasctoryEmployee";
import { Employee } from "../../Collumn/Employee";

class EmployeeIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
    };
  }

  closeModal = () => {
    // console.log("log in a close modal");
    this.setState({
      model: false,
    });
  };

  handelAddDataModal = () => {
    this.setState({
      model: true,
    });
  };

  render() {
    const tabArray = [
      {
        id: "1",
        lebal: "Add Employee details",
        tabContent: <FasctoryEmployee close={this.closeModal} />,
      },
    ];
    return (
      <Sidebar
        title="Employee"
        button="Add Employee"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={Employee}
        // tabview={true}
      >
        <Model
          modalName="Add Employee Data"
          open={this.state.model}
          close={this.closeModal}
          tabContent={tabArray}
        />
      </Sidebar>
    );
  }
}

export default EmployeeIndex;
