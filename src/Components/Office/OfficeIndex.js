import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
import CreateOfficePacket from "./CreateOfficePacket";
import Model from "../Common/Model";
import ReturnOfficePacket from "./ReturnPacket";
import ReturnOfficeRough from "./ReturnOfficeRough";
// import { TableData } from "../Common/TableData";
import { OfficeRough } from "../Collumn/Office/OfficeRough";
import { connect } from "react-redux";
import {
  getOfficeList,
  getOfficeSubList,
  getpacketSrNo,
  createSubPacket,
  returnOfficePacket,
} from "../../Actions/Office";
import { ChapkaList } from "./SubPacket/ChapkaList";
import { SawingList } from "./SubPacket/SawingList";
import {
  OfficeSawingSubPackets,
  OfficeSubPackets,
} from "../Collumn/Office/OfficeSubpackets";
import { getRoughPrefrence } from "../../Actions/Rough";

class OfficeIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
      subPacketModel: false,
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
      tableData: [],
      subPacketData: [],
      officeSubId: "",
      tabSelected: 0,
      roughList: [],
      officeIdList: [],
      srno: 0,
    };
  }

  componentDidMount = () => {
    // const pageData = {
    //   skip: this.state.skip,
    //   limit: this.state.limit,
    // };
    this.props
      .getOfficeList(this.state.pageinationRef)
      .then((res) => {
        this.setState({
          tableData: res.data,
          pageinationRef: {
            ...this.state.pageinationRef,
            totalCount: res.count,
          },
        });
      })
      .catch((e) => console.log(e));
    this.props
      .getRoughPrefrence()
      .then((res) => {
        console.log("OfficeIndex -> componentDidMount -> res", res);
        this.setState({
          roughList: res.commonGet.caratList,
        });
      })
      .catch((e) => console.log(e));

    // this.props.getRoughPrefrence().then((res) => {
    //   console.log("RoughIndex -> componentDidMount -> res", res);
    //   this.setState({
    //     caratList: res.commonGet.caratList,
    //   });
    // });
  };

  closeModal = () => {
    // console.log("log in a close modal");
    this.setState({
      model: false,
      subPacketModel: false,
      tabSelected: 0,
    });
  };

  handelAddDataModal = () => {
    this.setState({
      model: true,
    });
  };

  onModelPopup = (data) => {
    // console.log("OfficeIndex -> onModelPopup -> data", data);
    const value = {
      ...this.state.subPacketpageinationRef,
      id: data,
      type: "chapka",
    };
    this.props
      .getOfficeSubList(value)
      .then((res) =>
        this.setState({
          subPacketData: res.data,
          subPacketpageinationRef: {
            ...this.state.subPacketpageinationRef,
            totalCount: res.count,
          },
        })
      )
      .catch((e) => console.log(e));
    this.setState({
      subPacketModel: true,
      model: true,
      officeSubId: data,
    });
  };

  handelModelTabChange = (e) => {
    const value = {
      ...this.state.subPacketpageinationRef,
      id: this.state.officeSubId._id,
      type: e === 0 ? "chapka" : "sawing",
    };
    console.log("OfficeIndex -> handelModelTabChange -> value", value, e);
    this.props
      .getOfficeSubList(value)
      .then((res) =>
        this.setState({
          subPacketData: res.data,
          subPacketpageinationRef: {
            ...this.state.subPacketpageinationRef,
            totalCount: res.count,
          },
          tabSelected: e,
        })
      )
      .catch((e) => console.log(e));
  };

  handleCreateSubpacket = (data) => {
    console.log("OfficeIndex -> handleCreateSubpacket -> data", data);
    this.props
      .createSubPacket(data)
      .then((res) =>
        console.log("OfficeIndex -> handleCreateSubpacket -> res", res)
      )
      .catch((e) => console.log(e));
  };

  // handelOfficeCaratList = (data) => {
  //   // console.log("OfficeIndex -> handelOfficeCaratList -> data", data);
  //   this.props
  //     .getRoughPrefrence({ roughId: data })
  //     .then((res) => {
  //       console.log("OfficeIndex -> componentDidMount -> res", res);
  //       this.setState({
  //         officeIdList: res.commonGet.officeDetails,
  //       });
  //     })
  //     .catch((e) => console.log(e));
  // };

  handelReturnOffice = (data) => {
    console.log("OfficeIndex -> handelReturnOffice -> data", data);
    // this.props
    //   .returnOfficePacket(data)
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e));
  };

  onPageChange = (page) => {
    console.log("RoughIndex -> onPageChange -> page", page);
    // this.setState({
    //   pageinationRef: {
    //     ...this.state.pageinationRef,
    //     currentPage: page,
    //     skip: (page - 1) * this.state.pageinationRef.limit,
    //   },
    // });
    // const pageData = {
    //   skip: (page - 1) * this.state.pageinationRef.limit,
    //   limit: this.state.pageinationRef.limit,
    // };

    // this.props
    //   .getRough(pageData)
    //   .then((res) =>
    //     this.setState({
    //       tableData: res.data,
    //       pageinationRef: {
    //         ...this.state.pageinationRef,
    //         totalCount: res.count,
    //       },
    //     })
    //   )
    //   .catch((e) => console.log(e));
  };

  render() {
    const tabArray = [
      {
        id: "1",
        lebal: "Create Packet",
        tabContent: (
          <CreateOfficePacket
            close={this.closeModal}
            caratList={this.state.roughList}
            handleCreateSubpacket={this.handleCreateSubpacket}
            // data={this.state.singleOfiiceData}
          />
        ),
      },
      {
        id: "2",
        lebal: "Return Packet",
        tabContent: (
          <ReturnOfficePacket
            close={this.closeModal}
            caratList={this.state.roughList}
            handleCreateSubpacket={this.handleCreateSubpacket}
          />
        ),
      },
      {
        id: "3",
        lebal: "Return Rough",
        tabContent: (
          <ReturnOfficeRough
            close={this.closeModal}
            caratList={this.state.roughList}
            handelReturnOffice={this.handelReturnOffice}
          />
        ),
      },
    ];

    const subPacket = [
      {
        id: "1",
        lebal: "Chapka",
        tabContent: (
          <ChapkaList
            close={this.closeModal}
            rowData={this.state.subPacketData}
            column={OfficeSubPackets}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
            // data={this.state.singleOfiiceData}
          />
        ),
      },
      {
        id: "2",
        lebal: "Sawing",
        tabContent: (
          <SawingList
            close={this.closeModal}
            rowData={this.state.subPacketData}
            column={OfficeSawingSubPackets}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
          />
        ),
      },
    ];
    return (
      <Sidebar
        title="Office"
        button="Create Packet"
        cureentTab={2}
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={this.state.tableData}
        column={OfficeRough}
        // tabview={true}
        pageSize={this.onPageChange}
        totalData={this.state.pageinationRef}
      >
        <Model
          modalName="Office Packet Details"
          open={this.state.model}
          close={this.closeModal}
          handelModelTabChange={this.handelModelTabChange}
          tabContent={this.state.subPacketModel === true ? subPacket : tabArray}
          tabSelected={this.state.tabSelected}
          // data={this.state.singleOfiiceData}
        />
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.Test });

export default connect(mapStateToProps, {
  getOfficeList,
  getOfficeSubList,
  getRoughPrefrence,
  getpacketSrNo,
  createSubPacket,
  returnOfficePacket,
})(OfficeIndex);
