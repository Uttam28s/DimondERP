import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";

class SettingIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Sidebar>
        <div>Settings</div>
      </Sidebar>
    );
  }
}

export default SettingIndex;
