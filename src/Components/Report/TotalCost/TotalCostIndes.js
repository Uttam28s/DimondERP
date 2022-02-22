import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
import { TableData } from "../../Common/TableData";
import { TotalCostReport } from "../../Collumn/Report/TotalCostReport";

class TotalCostIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
    };
  }

  render() {
    return (
      <Sidebar
        title="Total cost Report"
        button="Print"
        onClick={this.onModelPopup}
        // addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={TotalCostReport}
      ></Sidebar>
    );
  }
}

export default TotalCostIndex;
