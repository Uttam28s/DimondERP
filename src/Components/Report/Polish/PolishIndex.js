import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
import { PacketReport } from "../../Collumn/Report/PacketReport";
import { TableData } from "../../Common/TableData";

class PolishIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
    };
  }

  render() {
    return (
      <Sidebar
        title="Polish Report"
        button="Print"
        onClick={this.onModelPopup}
        // addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={PacketReport}
      ></Sidebar>
    );
  }
}

export default PolishIndex;
