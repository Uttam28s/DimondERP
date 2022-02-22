import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
import SellerDetailsPage from "../Common/SellerDetailsPage";

class SellingIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Sidebar table="no">
        <SellerDetailsPage />
      </Sidebar>
    );
  }
}

export default SellingIndex;
