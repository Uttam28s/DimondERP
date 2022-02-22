import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
import Model from "../Common/Model";
// import AddRoughModal from "./AddRoughModal";
import { TableData } from "../Common/TableData";
import { CostModal } from "../Collumn/CostModal";

class CostModelIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
    };
  }

  // onModelPopup = () => {
  //   this.setState({
  //     model: true,
  //   });
  // };

  closeModal = () => {
    console.log("log in a close modal");
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
        lebal: "Add Cost Details",
        // tabContent: <AddRoughModal close={this.closeModal} />,
      },
    ];
    return (
      <Sidebar
        title="Cost Model"
        button="Add Types"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={CostModal}
      >
        {/* {console.log("log in render")} */}
        {/* <h1>Hello Fuck</h1> */}
        <Model
          modalName="Process Cost"
          open={this.state.model}
          close={this.closeModal}
          tabContent={tabArray}
        />
      </Sidebar>
    );
  }
}

export default CostModelIndex;
