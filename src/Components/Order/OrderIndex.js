import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
// import CreateOfficePacket from "./CreateOfficePacket";
import Model from "../Common/Model";
// import ReturnOfficePacket from "./ReturnPacket";
// import ReturnOfficeRough from "./ReturnOfficeRough";
import CreateOrder from "./CreateOrder";
import { TableData } from "../Common/TableData";
import { OrderSummary } from "../Collumn/OrderSummary";

class OrderIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
      pageinationRef: {
        totalCount: 0,
        limit: 10,
        skip: 0,
        currentPage: 1,
      },
      subPacketpageinationRef: {
        totalCount: 0,
        limit: 10,
        skip: 0,
        currentPage: 1,
      },
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
        lebal: "Add Order",
        tabContent: <CreateOrder close={this.closeModal} />,
      },
    ];
    return (
      <Sidebar
        title="Order Summary"
        button="Add Order"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={OrderSummary}
        totalData={this.state.pageinationRef}
        edit={this.edit}
        remove={this.remove}

      >
        <Model
          modalName="Order Details"
          open={this.state.model}
          close={this.closeModal}
          tabContent={tabArray}
        />
      </Sidebar>
    );
  }
}

export default OrderIndex;
