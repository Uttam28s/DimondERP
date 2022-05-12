import React, { Component } from 'react';
import _ from "lodash";
import Table from './Table';
import FourP from './FourP';
import Sarin from './Sarin';
import Polish from './Polish';
import Tiching from './Tiching';
import CreateSubPacket from "../CreateSubPacket";
import ReturnSubPacket from "../ReturnPacket";
import AssignSubPacket from "../AssignFactoryPacket";
import { connect } from "react-redux";
import Model from "../../Common/Model";
import Sidebar from '../../Common/Sidebar';
import { useParams } from "react-router-dom";
import {FactorySubProcess} from "../../Collumn/Factory/FactorySubPacket";
import {removeFactorySubRough, removeFactoryRough} from "../../../Actions/Delete";
import {getRoughPrefrence} from "../../../Actions/Rough";
import {getFactoryList, getFactorySubList, createFactoryPacket} from "../../../Actions/Factory"

export class FectoryViewTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: false,
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
            roughList: [],
            preSelectedData: "",
            preSelectData: "",
        }
    }

    componentDidMount = async () => {
      this.onModelPopup()

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

    };

    onModelPopup = async (data) => {
      await this.props.getFactorySubList({factory_id: this.props.match.params.id}).then((result) => {
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
        // model: true,
        // officeSubId: data,
      });
    };    
      
    closeSubPacket = () => {
      this.props.history.push("/factory-work")
    }

    closeModal = () => {
      this.setState({
        model: false,
        tabSelected: 0,
        preSelectedData: "",
        preSelectData: "",
      });
    };

    edit = (data) => {
      console.log("🚀 ~ file: RoughIndex.js ~ line 243 ~ RoughIndex ~ data", data)

      // let editArray = data && data.brokername ? ["Add Rough", "Sorting Rough"] : ["Assign Rough"]
  
      this.setState({
        // subRoughModel: false,
        model: true,
        preSelectedData: data,
        preSelectData: this.props.location.state,
        // editArray: editArray
      });

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
      
    render() {
        console.log(this.props,"this.props.location.state ===================>")
        console.log(this.props.location.state,"this.props.location.state ===>")
        // const params = useParams();
        console.log(this.props.match.params.id,"params")

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
              preSelectedData={this.state.preSelectedData}
              preSelectData={this.state.preSelectData}
            />,
          },
          {
            id: "2",
            lebal: "Assign Packet",
            tabContent: <AssignSubPacket
              getFactoryList={this.props.getFactoryList}
              caratList={this.state.roughList}
              subRoughList={this.state.subRoughList}
              close={this.closeModal} 
              preSelectedData={this.state.preSelectedData}
              preSelectData={this.state.preSelectData}
            />,
          },
          {
            id: "3",
            lebal: "Return sub Packet",
            tabContent: <ReturnSubPacket
              getFactoryList={this.props.getFactoryList}
              caratList={this.state.roughList}
              subRoughList={this.state.subRoughList}
              close={this.closeModal} 
              preSelectedData={this.state.preSelectedData}
              preSelectData={this.state.preSelectData}
            />,
          },
        ];    

        const subPacketArray = [
            {
              id: "1",
              lebal: "Sarin",
              tabContent:
                <Sarin
                  subClose={this.closeSubPacket}
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
                  subClose={this.closeSubPacket}
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
                  subClose={this.closeSubPacket}
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
                  subClose={this.closeSubPacket}
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
                  subClose={this.closeSubPacket}
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
      
        return (
            <Sidebar
              tabContent={subPacketArray||[]}
              // handelModelTabChange={this.handelModelTabChange}
              // tabSelected={this.state.tabSelected}
              edit={this.edit}
            >
              <Model
                modalName="factory Sub Packet Details"
                open={this.state.model}
                close={this.closeModal}
                tabContent={this.state.model && tabArray||[]}
                // handelModelTabChange={this.handelModelTabChange}
                // tabSelected={this.state.tabSelected}
                // tabContent={this.state.subPacketModel === true ? subPacket : tabArray}
                // data={this.state.singleOfiiceData}
              />

            </Sidebar>
        )
    }
}
const mapStateToProps = (state) => ({...state});
export default connect(null, { getRoughPrefrence, createFactoryPacket, getFactorySubList, getFactoryList, removeFactorySubRough, removeFactoryRough }) (FectoryViewTab);