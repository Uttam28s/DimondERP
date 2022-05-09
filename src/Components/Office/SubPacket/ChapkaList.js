import React from "react";
import PageTopSection from "../../Common/PageTopSection";
import { connect } from "react-redux";

export const ChapkaList = (props) => {
  console.log("ChapkaList")
  return (
    <div>
      <PageTopSection
        // noButton
        rowData={props.rowData}
        column={props.column}
        pageSize={props.pageSize}
        totalData={props.totalData}
        edit={props.edit}
        remove={props.remove}

        button="Close Sub Packet"
        title="Sub Office"
        subClose={props.subClose}
        handleManageData={props.manageButtonFunction}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChapkaList);

// import React, { Component } from 'react'
// import { connect } from "react-redux";
// import Model from "../../Common/Model";
// import Sidebar from "../../Common/Sidebar";
// import PageTopSection from "../../Common/PageTopSection";

// export class ChapkaList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       model : false
//     }
//   }

//     handelAddDataModal = () => {
//       this.setState({
//         model: true,
//       });
//     };

//     closeModal = () => {
//       this.setState({
//         model: false,
//       })
//     }

//   render() {
//     return (
//       <PageTopSection
//         // noButton
//         button="Close Sub Packet"
//         title="Sub Office"
//         subClose={this.props.subClose}
//         rowData={this.props.rowData}
//         column={this.props.column}
//         pageSize={this.props.pageSize}
//         totalData={this.props.totalData}
//         edit={this.props.edit}
//         remove={this.props.remove}

//         // handelAddData={this.props.addButtonFunction}
//         // handelAddData={this.handelAddDataModal}

//       >
//         {/* <Model
//           modalName="Office Packet Details"
//           // open={this.state.model}
//           open={this.props.open}
//           close={this.props.close}
//           // close={this.closeModal}
//           tabContent={this.props.tabContent}
//           // handelModelTabChange={this.handelModelTabChange}
//           // tabContent={this.state.subPacketModel === true ? subPacket : tabArray}
//           // tabSelected={this.state.tabSelected}
//         // data={this.state.singleOfiiceData}
//         /> */}
//       </PageTopSection>
//     )
//   }
// }

// const mapStateToProps = (state) => ({...state});
// const mapDispatchToProps = {};
// export default connect(mapStateToProps, mapDispatchToProps)(ChapkaList);
