import React, { Component } from 'react'
import { connect } from "react-redux";
import TabView from "../Common/Tabs";

export class Datasheet extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
  render() {
    return (
      <div>
          <TabView
              tabContent={this.props.tabContent}
          />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Datasheet);