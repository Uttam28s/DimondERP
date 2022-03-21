import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
import Model from "../Common/Model";
import CreateSubPacket from "./CreateSubPacket";
import ReturnSubPacket from "./ReturnPacket";
import AssignSubPacket from "./AssignFactoryPacket";
import { TableData } from "../Common/TableData";
import { Factoryrough } from "../Collumn/Factory/FactoryRough";
import {getRoughPrefrence} from "../../Actions/Rough";
import {getFactoryList, createFactoryPacket} from "../../Actions/Factory"
import {connect} from "react-redux";
class FactoryIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
      roughList: [],
      pageinationRef: {
        totalCount: 0,
        limit: 10,
        skip: 0,
        currentPage: 1,
      },
    };
  }

  componentDidMount = async () => {
    let caratList;
    if (this.props.roughPreference?.caratList?.length) {
      caratList = this.props.roughPreference.caratList
    } else {
      await this.props.getRoughPrefrence().then((res) => {
        caratList = res.commonGet.caratList
      });
    }
    this.setState({
      roughList: caratList.map((data) => {return {id: data._id, label: data.carat.toString()}}),
    });

    var totalCarat
    if (this.props?.factoryTotal) {
      totalCarat = this.props.factoryTotal
    } else {
      await this.props.getFactoryList().then((result) => {
        totalCarat = result.totalCarat
      }).catch((err) => {})
    }
    this.setState({totalFactoryCarat: totalCarat})

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
      subRoughModel: false
    });
  };


  onPageChange = (page) => {
    console.log("RoughIndex -> onPageChange -> page", page);
    this.setState({
      pageinationRef: {
        ...this.state.pageinationRef,
        currentPage: page,
        skip: (page - 1) * this.state.pageinationRef.limit,
      },
    });
    const pageData = {
      skip: (page - 1) * this.state.pageinationRef.limit,
      limit: this.state.pageinationRef.limit,
    };

    this.props
      .getRough(pageData)
      .then((res) =>
        this.setState({
          tableData: res.data,
          pageinationRef: {
            ...this.state.pageinationRef,
            totalCount: res.count,
          },
        })
      )
      .catch((e) => console.log(e));
  };



  onModelPopup = (data) => {
    // console.log("OfficeIndex -> onModelPopup -> data", data);
    // const value = {
    //   ...this.state.subPacketpageinationRef,
    //   id: data,
    //   type: "chapka",
    // };
    // this.props
    //   .getOfficeSubList(value)
    //   .then((res) =>
    //     this.setState({
    //       subPacketData: res.data,
    //       subPacketpageinationRef: {
    //         ...this.state.subPacketpageinationRef,
    //         totalCount: res.count,
    //       },
    //     })
    //   )
    //   .catch((e) => console.log(e));
    this.setState({
      subRoughModel: true,
      //   model: true,
      // officeSubId: data,
    });
  };



  // getSubRoughList = (id) => {

  //   this.props.getFactoryList({roughId: id}).then((result) => {
  //     this.setState({
  //       subRoughList: result?.data?.map((data) => {
  //         return {id: data._id, label: data.factory_total_carat.toString()}
  //       }) || []
  //     })
  //   }).catch((err) => { });
  // }

  render() {

    const {subRoughModel} = this.state
    const tabArray = [
      {
        id: "1",
        lebal: "Create sub Packet",
        tabContent: <CreateSubPacket
          getFactoryList={this.props.getFactoryList}
          caratList={this.state.roughList}
          subRoughList={this.state.subRoughList}
          totalFactoryCarat={this.state.totalFactoryCarat}
          close={this.closeModal}
          createFactoryPacket={this.props.createFactoryPacket}
        />,
      },
      {
        id: "2",
        lebal: "Assign Packet",
        tabContent: <AssignSubPacket
          getFactoryList={this.props.getFactoryList}
          caratList={this.state.roughList}
          subRoughList={this.state.subRoughList}
          close={this.closeModal} />,
      },
      {
        id: "3",
        lebal: "Return sub Packet",
        tabContent: <ReturnSubPacket
          getFactoryList={this.props.getFactoryList}
          caratList={this.state.roughList}
          subRoughList={this.state.subRoughList}
          close={this.closeModal} />,
      },
      // {
      //   id: "3",
      //   lebal: "Return Rough",
      //   tabContent: <ReturnOfficeRough close={this.closeModal} />,
      // },
    ];


    return (
      <Sidebar
        title="Factory"
        button="Create Packet"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={TableData}
        column={Factoryrough}
        tabview={true}
        pageSize={this.onPageChange}
        totalData={this.state.pageinationRef}
      >
        {/* {console.log('first', first)} */}

        <Model
          modalName="Factory Packet Details"
          open={this.state.model}
          close={this.closeModal}
          tabContent={tabArray}
        />
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => {
  let reducerState = state.reducerState
  //console.log('reducerState.factoryList?.data', reducerState.factoryList?.data?.filter(() => true) )
  return {
    roughList: reducerState.roughList,
    roughPreference: reducerState.roughPreference,
    factoryTotal: reducerState.factoryList.totalCarat,
    // factoryList: reducerState.factoryList?.data?.filter(() => true)
  }
};

export default connect(mapStateToProps, {getRoughPrefrence, getFactoryList, createFactoryPacket})(FactoryIndex);