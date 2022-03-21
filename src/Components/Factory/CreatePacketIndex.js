// import { Button } from "carbon-components-react";
// import React, { Component } from "react";
// import TabView from "../Common/Tabs";
// import AssignSubPacket from "./AssignFactoryPacket";
// import CreateSubPacket from "./CreateSubPacket";
// import ReturnSubPacket from "./ReturnPacket";

// class Createpacketindex extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};

//     // this.handleEvent = this.handleEvent.bind(this)
//   }

//   componentDidMount() { }

//   // componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

//   // componentWillUnmount() {

//   // }

//   render() {
//     const tabArray = [
//       {
//         id: "1",
//         lebal: "Create sub Packet",
//         tabContent: <CreateSubPacket close={this.closeModal} />,
//       },
//       {
//         id: "2",
//         lebal: "Assign Packet",
//         tabContent: <AssignSubPacket close={this.closeModal} />,
//       },
//       {
//         id: "3",
//         lebal: "Return sub Packet",
//         tabContent: <ReturnSubPacket close={this.closeModal} />,
//       },
//       // {
//       //   id: "3",
//       //   lebal: "Return Rough",
//       //   tabContent: <ReturnOfficeRough close={this.closeModal} />,
//       // },
//     ];
//     return (
//       <div className="packet-form-div-wrapper">
//         <div className="packet-header-wrapper">
//           <Button onClick={this.props.backButton}>Back</Button>
//           <h4>THis is a Inside CreateSub PAcket</h4>
//         </div>
//         <TabView
//           tabContent={tabArray}
//           handelModelTabChange={this.props.handelModelTabChange}
//           tabSelected={this.props.tabSelected}
//         />
//       </div>
//     );
//   }
// }

// export default Createpacketindex;
