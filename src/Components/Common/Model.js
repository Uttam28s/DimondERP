import React, { Component } from "react";
import { Modal } from "carbon-components-react";
import TabView from "./Tabs";

class Model extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // console.log("props in modal", this.props);
    return (
      <div>
        <Modal
          open={this.props.open}
          hasForm
          className={`modal-wrapper ${this.props.className}`}
          passiveModal
          modalHeading={this.props.modalName}
          onRequestClose={this.props.close}
          // selectorPrimaryFocus
        >
          <TabView
            tabContent={this.props.tabContent}
            handelModelTabChange={this.props.handelModelTabChange}
            tabSelected={this.props.tabSelected}
          />
        </Modal>
      </div>
    );
  }
}

export default Model;
