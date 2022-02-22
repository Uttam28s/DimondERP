import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
// import { RoughColumn } from "../../Collumn/Rough";
import { TableData } from "../../Common/TableData";
import { PacketStatusReport } from "../../Collumn/Report/PacketStatusReport";

class PacketStatusIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
    };
  }

  render() {
    return (
      <Sidebar
        title="Packet Status Report"
        button="Print"
        onClick={this.onModelPopup}
        // addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={PacketStatusReport}
      ></Sidebar>
    );
  }
}

export default PacketStatusIndex;
