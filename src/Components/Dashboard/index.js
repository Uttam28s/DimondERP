import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";

class DashboardIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Sidebar table="no">
        <div>Dashboards</div>
      </Sidebar>
    );
  }
}

export default DashboardIndex;
