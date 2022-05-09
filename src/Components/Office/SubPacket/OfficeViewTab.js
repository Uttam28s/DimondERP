import React, { Component } from 'react';
import ChapkaList from './ChapkaList';
import SawingList from './SawingList';
import { connect } from "react-redux";
import Model from "../../Common/Model";
import Sidebar from '../../Common/Sidebar';
import ReturnOfficePacket from "../ReturnPacket";
import ReturnOfficeRough from "../ReturnOfficeRough"; 
import CreateOfficePacket from "../CreateOfficePacket";
import {getRoughPrefrence} from "../../../Actions/Rough";
import {
  OfficeSawingSubPackets,
  OfficeSubPackets
} from "../../Collumn/Office/OfficeSubpackets";
import {getOfficeList,getOfficeSubList} from "../../../Actions/Office";
import { withRouter } from 'react-router';

export class SubPacketIndex extends Component {
    constructor(props) {
      super(props);
      this.state = {
          model: false,
          editArray: [],
          modelData: "",
          officeSubId: "",
          subPacketData: [],
          preDefinedData : "",
          preSelectedData: "",
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
      }
    }

    componentDidMount = () => {
      this.getOfficeAndRough()
      this.onModelPopup()
    };

    getOfficeAndRough = async () => {
      this.props
        .getRoughPrefrence()
        .then((res) => {
          this.setState({
            roughList: res.commonGet.caratList,
          });
        })
        .catch((e) => console.log(e));
    }   
    
    onModelPopup = (data) => {
      const value = {
        ...this.state.subPacketpageinationRef,
        id: this.props.match.params.id,
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
      //   subPacketModel: true,
      //   model: true,
        officeSubId: this.props.match.params.id,
      });
    };

    handelManageDataModal = () => {
      this.props.history.push("/officesheet")
    };
  
    closeSubPacket = () => {
      this.props.history.push("/office")
      // this.setState({
      //   subPacketModel: false
      // })
    }

    closeModal = () => {
      this.setState({
        model: false,
        editArray:[],
        tabSelected: 0,
        preDefinedData: "",
        preSelectedData: "",
      });
    };
  
    handelModelTabChange = (e) => {
      const value = {
        ...this.state.subPacketpageinationRef,
        id: this.state.officeSubId,
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
  
    onPageChange = (page) => {
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
      this.props
        .getOfficeList(pageData)
        .then((res) => {
  
          for(let date of res.data){
            if(date.return_date){
              const format_date = date => date.toISOString().slice(0, 10);
              const new_date = format_date(new Date(date.return_date))
              const modify_date = new_date.split("-").reverse().join("-"); 
              date.return_date = modify_date
            } 
          }
  
          this.setState({
            modelData: res.data,
            pageinationRef: {
              ...this.state.pageinationRef,
              totalCount: res.count,
            },
          })
        }
        )
        .catch((e) => console.log(e));
    };


    handleCreateSubpacket = (data) => {

      this.props
        .createSubPacket(data)
        .then((res) => {}
          //  console.log("OfficeIndex -> handleCreateSubpacket -> res", res)
        )
        .catch((e) => console.log(e));
    };    

    edit = (data) => {
      console.log("🚀 ~ file: OfficeViewTab.js ~ line 173 ~ OfficeViewTab ~ data", data)
  
      let editArray = data && ["Create Packet", "Return Packet"]

      this.setState({
        // subRoughModel: false,
        model: true,
        preSelectedData: data,
        editArray: editArray
      });

      
      this.props
      .getOfficeList({ _id : data.office_id})
      .then((res) => {
        console.log(res,"res of getOfficeList")

        const preDefinedData = res.data.find((value) => value._id === data.office_id)

        this.setState({
          preDefinedData: preDefinedData,
        });
      })
      .catch((e) => console.log(e));
  
    }    
      
    render() {
        console.log(this.props,"this.props.location.state ===================>")
        console.log(this.props.match.params.id,"params")

        const {model,editArray} = this.state

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
                preSelectedData={this.state.preSelectedData}
                preDefinedData={this.state.preDefinedData}
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
                preSelectedData={this.state.preSelectedData}
                preDefinedData={this.state.preDefinedData}
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
                // preSelectedData={this.state.preSelectedData}
              />
            ),
          },
        ];    

        const subPacket =[
            {
              id: "1",
              lebal: "Chapka",
              tabContent: ( 
                <ChapkaList
                  subClose={this.closeSubPacket}
                  rowData={this.state.subPacketData}
                  column={OfficeSubPackets}
                  pageSize={this.onPageChange}
                  totalData={this.state.subPacketpageinationRef}
                  edit={this.edit}
                  manageButtonFunction={this.handelManageDataModal}
                // data={this.state.singleOfiiceData}
                /> 
              ),
            },
            {
              id: "2",
              lebal: "Sawing",
              tabContent: (
                <SawingList
                  subClose={this.closeSubPacket}
                  rowData={this.state.subPacketData}
                  column={OfficeSawingSubPackets}
                  pageSize={this.onPageChange}
                  totalData={this.state.subPacketpageinationRef}
                  edit={this.edit}
                  manageButtonFunction={this.handelManageDataModal}
                /> 
              ),
            },
          ]
      
        return (
            console.log("In SubPacketIndex"),
            <Sidebar
                tabContent={subPacket}
                handelModelTabChange={this.handelModelTabChange}
                tabSelected={this.state.tabSelected}
                edit={this.edit}
            >
              <Model
                modalName="Office Packet Details"
                open={this.state.model}
                close={this.closeModal}
                // tabContent={this.state.model && tabArray}
                tabContent={editArray?.length ?
                  tabArray.filter((data) => editArray.includes(data.lebal)) :
                  (model && tabArray)
                }
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
export default connect(null, { getOfficeList, getOfficeSubList, getRoughPrefrence }) (withRouter(SubPacketIndex));