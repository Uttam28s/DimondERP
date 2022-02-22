import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";

class ReportIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Sidebar>
        <div>Reports</div>
      </Sidebar>
    );
  }
}

export default ReportIndex;
