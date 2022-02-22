import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
import Model from "../Common/Model";
import CreateSubPacket from "./CreateSubPacket";
import ReturnSubPacket from "./ReturnPacket";
import AssignSubPacket from "./AssignFactoryPacket";
import { TableData } from "../Common/TableData";
import { Factoryrough } from "../Collumn/Factory/FactoryRough";

class FactoryIndex extends Component {
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
        tabContent: <CreateSubPacket close={this.closeModal} />,
      },
      {
        id: "2",
        lebal: "Assign Packet",
        tabContent: <AssignSubPacket close={this.closeModal} />,
      },
      {
        id: "3",
        lebal: "Return sub Packet",
        tabContent: <ReturnSubPacket close={this.closeModal} />,
      },
      // {
      //   id: "3",
      //   lebal: "Return Rough",
      //   tabContent: <ReturnOfficeRough close={this.closeModal} />,
      // },
    ];
    return (
      <Sidebar
        title="Factory"
        button="Create Packet"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={Factoryrough}
        tabview={true}
      >
        <Model
          modalName="Factory Packet Details"
          open={this.state.model}
          close={this.closeModal}
          tabContent={tabArray}
        />
      </Sidebar>
    );
  }
}

export default FactoryIndex;
