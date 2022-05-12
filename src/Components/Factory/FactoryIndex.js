import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
import Model from "../Common/Model";
import CreateSubPacket from "./CreateSubPacket";
import ReturnSubPacket from "./ReturnPacket";
import AssignSubPacket from "./AssignFactoryPacket";
import { Factoryrough } from "../Collumn/Factory/FactoryRough";
import {getRoughPrefrence} from "../../Actions/Rough";
import {getFactoryList, createFactoryPacket, getFactorySubList} from "../../Actions/Factory"
import {connect} from "react-redux";
import Sarin from "./SubProcess/Sarin";
import Tiching from "./SubProcess/Tiching";
import FourP from "./SubProcess/FourP";
import Table from "./SubProcess/Table";
import Polish from "./SubProcess/Polish";
import {FactorySubProcess} from "../Collumn/Factory/FactorySubPacket";
import _ from "lodash";
import {removeFactorySubRough, removeFactoryRough} from "../../Actions/Delete"
import ReturnFactoryPacket from "./ReturnFactoryPacket";


class FactoryIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
      roughList: [],
      subPacketData: [],
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

    await this.props.getFactoryList(this.state.pageinationRef).then((result) => {
      let totalCarat = result.totalCarat
      this.setState({
        totalFactoryCarat: totalCarat, tableData: result.data, pageinationRef: {
          ...this.state.pageinationRef,
          totalCount: result.count
        }
      })
    }).catch((err) => {})
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
      subPacketModel: false
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
      currentPage: page
    };

    this.props.getFactoryList(pageData)
      .then((res) =>
      {
        this.setState({
          tableData: res.data,
          pageinationRef: {
            ...this.state.pageinationRef,
            totalCount: res.count,
          },
        })
      }
      )
      .catch((e) => console.log(e));
  };



  onModelPopup = async (data) => {
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

    await this.props.getFactorySubList({factory_id: data._id}).then((result) => {
      console.log("🚀 ~ file: FactoryIndex.js ~ line 129 ~ FactoryIndex ~ this.props.getFactorySubList ~ result", result)
      let newdata = []
      result.data.map((data) => {
        data.all_process.map((val) => {
          newdata.push({
            id: val.process_carat_id,
            factory_carat: data.assign_carat,
            assign_name: val.assign_name,
            assign_carat: val.assign_carat,
            assign_date: val.assign_date,
            return_date: val.returndata ? val.returndata.return_date : "",
            return_carat: val.returnCarat,
            piece: val.piece,
            return_peice: val.returndata ? val.returndata.return_peice : "",
            purity: val.purity,
            process_name: val.process_name
          })
        })
      })
      let SubPacketObj = _.groupBy(newdata, "process_name")
      console.log("🚀 ~ file: FactoryIndex.js ~ line 151 ~ FactoryIndex ~ newdata ~ newdata", SubPacketObj, newdata)

      this.setState({
        subPacketData: SubPacketObj
      })

    }).catch((err) => {

    });
    this.setState({
      subPacketModel: true,
      model: true,
      // officeSubId: data,
    });
  };


  edit = (data) => {
    console.log("🚀 ~ file: FactoryIndex.js ~ line 176 ~ FactoryIndex ~ data", data)

  }


  remove = async (data) => {
    console.log("🚀 ~ file: FactoryIndex.js ~ line 182 ~ FactoryIndex ~ remove= ~ data", data)
    if (data && data.process_name) {
      // this.props.removeFactorySubRough({id: data.id}).then((result) => {
      //   console.log("🚀 ~ file: FactoryIndex.js ~ line 182 ~ FactoryIndex ~ this.props.removeFactorySubRough ~ result", result)
      // }).catch((err) => {
      // });
    } else {
      this.props.removeFactoryRough({id: data._id}).then((result) => {
        console.log("🚀 ~ file: FactoryIndex.js ~ line 188 ~ FactoryIndex ~ this.props.removeFactoryRough ~ result", result)
      }).catch((err) => {
      });
    }

  }

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

    const subPacketArray = [
      {
        id: "1",
        lebal: "Sarin",
        tabContent:
          <Sarin
            close={this.closeModal}
            rowData={this.state.subPacketData["Sarin"] || []}
            column={FactorySubProcess}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
            useZebraStyles={true}
            edit={this.edit}
            remove={this.remove}
          />,
      },
      {
        id: "2",
        lebal: "Tiching",
        tabContent:
          <Tiching
            close={this.closeModal}
            rowData={this.state.subPacketData["Tiching"] || []}
            column={FactorySubProcess}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
            useZebraStyles={true}
            edit={this.edit}
            remove={this.remove}
          />,
      }, {
        id: "3",
        lebal: "4P",
        tabContent:
          < FourP
            close={this.closeModal}
            rowData={this.state.subPacketData["4P"] || []}
            column={FactorySubProcess}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
            useZebraStyles={true}
            edit={this.edit}
            remove={this.remove}
          />,
      },
      {
        id: "4",
        lebal: "Table",
        tabContent:
          <Table
            close={this.closeModal}
            rowData={this.state.subPacketData["Table"] || []}
            column={FactorySubProcess}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
            useZebraStyles={true}
            edit={this.edit}
            remove={this.remove}
          />,
      }, {
        id: "5",
        lebal: "Polish",
        tabContent:
          <Polish
            close={this.closeModal}
            rowData={this.state.subPacketData["Polish"] || []}
            column={FactorySubProcess}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
            useZebraStyles={true}
            edit={this.edit}
            remove={this.remove}

          />,
      },
    ]
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
      {
        id: "4",
        lebal: "Return Rough",
        tabContent: <ReturnFactoryPacket
        getFactoryList={this.props.getFactoryList}
          caratList={this.state.roughList}
          subRoughList={this.state.subRoughList}
        close={this.closeModal} />,
      },
    ];


    return (
      <Sidebar
        title="Factory"
        button="Create Packet"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={this.state.tableData|| []}
        column={Factoryrough}
       // tabview={true}
        pageSize={this.onPageChange}
        totalData={this.state.pageinationRef}
        edit={this.edit}
        remove={this.remove}
      >

        <Model
          modalName="Factory Packet Details"
          open={this.state.model}
          close={this.closeModal}
          tabContent={this.state.subPacketModel === true ? subPacketArray : tabArray}

        />
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => {
  let reducerState = state.reducerState
  //console.log('reducerState.factoryList?.data', reducerState.factoryList?.data?.filter(() => true) )
  return {
 ///   roughList: reducerState.roughList,
  //  roughPreference: reducerState.roughPreference,
   // factoryTotal: reducerState.factoryList.totalCarat,
    // factoryList: reducerState.factoryList?.data?.filter(() => true)
  }
};

export default connect(mapStateToProps, {getRoughPrefrence, removeFactoryRough, removeFactorySubRough, getFactorySubList, getFactoryList, createFactoryPacket})(FactoryIndex);