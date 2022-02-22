import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
import Model from "../../Common/Model";
import { TableData } from "../../Common/TableData";
import { SalaryModule } from "../../Collumn/SalaryModule";
import AddSallary from "./AddSallary";

class SallaryModuleIndex extends Component {
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
        lebal: "Create sub Packet",
        tabContent: <AddSallary close={this.closeModal} />,
      },
      // {
      //   id: "2",
      //   lebal: "Assign Packet",
      //   tabContent: <AssignSubPacket close={this.closeModal} />,
      // },
      // {
      //   id: "3",
      //   lebal: "Return sub Packet",
      //   tabContent: <ReturnSubPacket close={this.closeModal} />,
      // },
      // {
      //   id: "3",
      //   lebal: "Return Rough",
      //   tabContent: <ReturnOfficeRough close={this.closeModal} />,
      // },
    ];
    return (
      <Sidebar
        title="Salary Master"
        button="Daily Update"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={SalaryModule}
        // tabview={true}
      >
        <Model
          modalName="Add Daily Update"
          open={this.state.model}
          close={this.closeModal}
          tabContent={tabArray}
        />
      </Sidebar>
    );
  }
}

export default SallaryModuleIndex;
