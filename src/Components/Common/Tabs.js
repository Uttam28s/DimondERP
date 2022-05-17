import React, { Component } from "react";
import { Tabs, Tab } from "carbon-components-react";

class TabView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Tabs
          role="navigation"
          className="tab-wrapper"
          selected={this.props.tabSelected}
          onSelectionChange={this.props.handelModelTabChange}
          selectionMode="automatic"
        >
          {this.props.tabContent&&this.props.tabContent.map((value) => (
            <Tab
              // href="#"
              key={value.id}
              id={value.id}
              label={value.lebal}
            // onClick={function noRefCheck(){}}
            >
              {value.tabContent}
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default TabView;
