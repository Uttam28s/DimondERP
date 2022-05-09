import React, { Component } from 'react';
import { connect } from "react-redux";
import Model from "../../Common/Model";
import AssignRough from '../AssignRough';
import Sidebar from "../../Common/Sidebar";
import RoughSorting from "../RoughSorting";
import AddRoughModal from "../AddRoughModal";
import OfficeSubRough from "./OfficeSubRough";
import FactorySubRough from './FactorySubRough';
import {
  getRough,
  addRough,
  getRoughPrefrence,
  getSortingData,
  addSortingData,
} from "../../../Actions/Rough";
import {assignFactory} from "../../../Actions/Factory";
import { getOfficeList } from "../../../Actions/Office";
import {getOfficeSubList} from "../../../Actions/Office";
import { removeMainRough } from "../../../Actions/Delete";
import { getFactoryList } from "../../../Actions/Factory";
import {assignOffice, getUnusedList} from "../../../Actions/Office";
import {OfficeSubRoughColumn, FactorySubRoughColumn} from "../../Collumn/Rough";
export class RoughViewTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: false,
            subRoughModel: false,
            tabSelected: 0,
            preSelectedData: "",
            editArray: [],
            tableData:[],
            caratList:[],
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
            subpacketlist: [],
          }
    }
    componentDidMount = () => {
        // this.onModelPopup()
        this.getListOfRough()
        this.handelModelTabChange(0)
    }

    //onModelPopup = (data) => {
      // this.props.getOfficeList({roughId: this.props.match.params.id}).then((result) => {
      //   for(let date of result.data){
      //     if(date.return_date){
      //       const format_date = date => date.toISOString().slice(0, 10);
      //       const new_date = format_date(new Date(date.return_date))
      //       const modify_date = new_date.split("-").reverse().join("-");
      //       date.return_date = modify_date
      //     }
      //   }
      //   console.log('result', result)
      //   this.setState({tableData: result.data});
      // }).catch((err) => {
      // });
    //}

    handelModelTabChange = (e) => {
      console.log(e,"handelModelTabChange ==> RoughViewTab")
      if(e==1){
        this.props.getFactoryList({roughId: this.props.match.params.id}).then((result) => {
          console.log('resultgetFactoryList', result)
          for(let date of result.data){
            if(date.return_date){
              const format_date = date => date.toISOString().slice(0, 10);
              const new_date = format_date(new Date(date.return_date))
              const modify_date = new_date.split("-").reverse().join("-");
              date.return_date = modify_date
            }
          }
          this.setState({
            subpacketlist: result.data,
            tabSelected: e,
          });
        }).catch((err) => {
        });
      }
      if(e==0){
        this.props.getOfficeList({roughId: this.props.match.params.id}).then((result) => {
          console.log('resultgetOfficeList', result)
          for(let date of result.data){
            if(date.return_date){
              const format_date = date => date.toISOString().slice(0, 10);
              const new_date = format_date(new Date(date.return_date))
              const modify_date = new_date.split("-").reverse().join("-");
              date.return_date = modify_date
            }
          }
          this.setState({
            subpacketlist: result.data,
            tabSelected: e,
          });
        })
      }
    };
    closeModal = () => {
      this.setState({
        model: false,
        subRoughModel: false,
        preSelectedData: "",
        editArray: []
      });
    };
    closeSubPacket = () => {
      this.props.history.push("/rough")
    }
    onPageChange = async (page) => {
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
      await this.props
        .getRough(pageData)
        .then((res) => {
          this.setState({
            tableData: res.data,
            pageinationRef: {
            ...this.state.pageinationRef,
            totalCount: res.count,
            },
          })
        }
        )
        .catch((e) => {
        console.log('res111111', e)
        console.log(e)
        });
    };
    edit = (data) => {
      console.log(":rocket: ~ file: RoughIndex.js ~ line 243 ~ RoughIndex ~ data", data)
      // let editArray = data && data.brokername ? ["Add Rough", "Sorting Rough"] : ["Assign Rough"]
      this.setState({
      //   subRoughModel: false,
        model: true,
        preSelectedData: data,
      //   editArray: editArray
      });
    }
    remove = (data) => {
      console.log(":rocket: ~ file: RoughIndex.js ~ line 248 ~ RoughIndex ~ data", data)
      this.props.removeMainRough({id: data._id}).then((result) => {
        console.log(":rocket: ~ file: RoughIndex.js ~ line 245 ~ RoughIndex ~ removeMainRough ~ result", result)
        this.getListOfRough()
      }).catch((err) => {
      });
      //this.setState({open: true});
    }
    handelAddRough = (data) => {
      this.props
        .addRough(data)
        .then((res) => {
          this.props
            .getRough(this.state.pageinationRef)
            .then((ress) => {
              this.setState({
                tableData: ress.data,
                pageinationRef: {
                  ...this.state.pageinationRef,
                  totalCount: ress.count,
                },
              });
              this.closeModal();
            })
            .catch((e) => console.log(e));
          this.props.getRoughPrefrence().then((res) => {
            // console.log("RoughIndex -> componentDidMount -> res", res);
            this.setState({
              caratList: res.commonGet.caratList,
            });
          });
        })
        .catch((e) => console.log(e));
    };

    getListOfRough = async () => {
      await this.props.getRough(this.state.pageinationRef).then((res) => {
      this.setState({
        tableData: res.data,
        pageinationRef: {
          ...this.state.pageinationRef,
          totalCount: res.count
        },
      })
      })
      var caratList
      if (this.props.roughPreference?.length) {caratList = this.props.roughPreference.caratList}
      else {
        await this.props.getRoughPrefrence().then((res) => {caratList = res.commonGet.caratList})
      }
      console.log(":rocket: ~ file: RoughIndex.js ~ line 73 ~ RoughIndex ~ componentDidMount= ~ caratList", this.props.roughPreference, caratList)
      this.setState({
        caratList: caratList,
      });
    }
    handelAddSorting = (data) => {
      console.log("RoughIndex -> handelAdewrwejrhwegyudSorting -> data", data);
      this.props
        .addSortingData(data)
        .then((res) => this.closeModal())
        .catch((e) => console.log(e));
    };
    handelAssignOffice = (data) => {
      console.log("RoughIndex -> handelAssignOffice -> data", data);
      this.props
        .assignOffice(data)
        .then((res) => console.log("this is add assign", res))
        .catch((e) => console.log(e));
    };
    handelAssignFactory = (data) => {
      console.log("RoughIndex -> handelAssignFactory -> data", data);
      this.props
        .assignFactory(data)
        .then((res) => console.log("this is add assign", res))
        .catch((e) => console.log(e));
    }
  render() {
    console.log(this.props,"props value in RoughViewIndex.js")
    const mainRoughTabArray = [
      {
        id: "1",
        lebal: "Add Rough",
        tabContent: (this.state.model &&
          <AddRoughModal
            close={this.closeModal}
            handelAddRough={this.handelAddRough}
            preSelectedData={this.state.preSelectedData}
          />
        ),
      },
      {
        id: "2",
        lebal: "Sorting Rough",
        tabContent: (
          this.state.model && <RoughSorting
            caratList={this.state.caratList}
            handelAddSorting={this.handelAddSorting}
            sortingData={this.state.sortingData}
            close={this.closeModal}
          />
        ),
      },
      {
        id: "3",
        lebal: "Assign Rough",
        tabContent: (
          this.state.model && <AssignRough
            close={this.closeModal}
            caratList={this.state.caratList}
            handelAssignOffice={this.handelAssignOffice}
            handelAssignFactory={this.handelAssignFactory}
            getSortingData={this.props.getSortingData}
            //getRough={this.props.getRough}
            getUnusedList={this.props.getUnusedList}
            getOfficeList={this.props.getOfficeList}
            getOfficeSubList={this.props.getOfficeSubList}
            preSelectedData={this.state.preSelectedData}
          />
        ),
      },
    ];
    const subRoughTab = [
        {
          id: "1",
          lebal: "Office Rough",
          tabContent:
            (<OfficeSubRough
              subClose={this.closeSubPacket}
              rowData={this.state.subpacketlist}
              column={OfficeSubRoughColumn}
              pageSize={this.onPageChange}
              totalData={this.state.subPacketpageinationRef}
              edit={this.edit}
              remove={this.remove}
            />)
        },
        {
          id: "2",
          lebal: "Factory Rough",
          tabContent:
            (<FactorySubRough
              subClose={this.closeSubPacket}
              rowData={this.state.subpacketlist}
              column={FactorySubRoughColumn}
              pageSize={this.onPageChange}
              totalData={this.state.subPacketpageinationRef}
              edit={this.edit}
              remove={this.remove}
            />)
        }
      ]
    return (
      <Sidebar
        tabContent={subRoughTab||[]}
        handelModelTabChange={this.handelModelTabChange}
        tabSelected={this.state.tabSelected}
        edit={this.edit}
      >
        <Model
          modalName="Rough Packet Details"
          open={this.state.model}
          close={this.closeModal}
          tabContent={this.state.model && mainRoughTabArray||[]}
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
export default connect(null, {
  removeMainRough,
  getRough,
  addRough,
  getRoughPrefrence,
  getSortingData,
  addSortingData,
  assignOffice, getUnusedList, getOfficeList, getOfficeSubList, assignFactory,
  getFactoryList
}) (RoughViewTab);