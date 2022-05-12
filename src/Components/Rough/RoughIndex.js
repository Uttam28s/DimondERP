import React, {Component} from "react";
import Sidebar from "../Common/Sidebar";
import Model from "../Common/Model";
import AddRoughModal from "./AddRoughModal";
import AssignRough from "./AssignRough";
import RoughSorting from "./RoughSorting";
import {OfficeSubRoughColumn, RoughColumn} from "../Collumn/Rough";
import {connect} from "react-redux";
import {
  getRough,
  addRough,
  getRoughPrefrence,
  getSortingData,
  addSortingData,
} from "../../Actions/Rough";
import {getOfficeList} from "../../Actions/Office";
import {getOfficeSubList} from "../../Actions/Office";

import {assignOffice, getUnusedList} from "../../Actions/Office";
import {assignFactory} from "../../Actions/Factory";
import OfficeSubRough from "./SubRough/OfficeSubRough";
import FactorySubRough from "./SubRough/FactorySubRough";
import {removeMainRough} from "../../Actions/Delete"

class RoughIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
      tableData: [],
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
      caratList: [],
      sortingData: [],
      singleOfiiceData: "",
      subRoughModel: false,
      subOfficeAndFactoryData: [],
      editArray: []
    };
  }



  componentDidMount = async () => {
    // const pageData = {
    //   skip: this.state.skip,
    //   limit: this.state.limit,
    // };
    // var roughList;
    // if (this.props.roughList.length) {roughList = this.props.roughList}
    // else {
    this.getListOfRough()
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
    if (this.props.roughPreference.length) {caratList = this.props.roughPreference.caratList}
    else {
      await this.props.getRoughPrefrence().then((res) => {caratList = res.commonGet.caratList})
    }
    console.log("🚀 ~ file: RoughIndex.js ~ line 73 ~ RoughIndex ~ componentDidMount= ~ caratList", this.props.roughPreference, caratList)
    this.setState({
      caratList: caratList,
    });

  }

  handelModelTabChange = (e) => {
    // const value = {
    //   ...this.state.subPacketpageinationRef,
    //   // id: this.state.officeSubId._id,
    //   type: e === 0 ? "chapka" : "sawing",
    // };
    //  console.log("OfficeIndex -> handelModelTabChange -> value", value, e);
    // this.props
    //   .getOfficeSubList(value)
    //   .then((res) =>
    //     this.setState({
    //       subPacketData: res.data,
    //       subPacketpageinationRef: {
    //         ...this.state.subPacketpageinationRef,
    //         totalCount: res.count,
    //       },
    //       tabSelected: e,
    //     })
    //   )
    //   .catch((e) => console.log(e));
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.tableData !== prevState.tableData) {
  //     console.log(
  //       "this ois a log in a componentDidMount =====>",
  //       this.state.tableData
  //     );
  //   }
  // };
  closeModal = () => {
    //console.log("log in a close modal");
    this.setState({
      model: false,
      subRoughModel: false,
      preSelectedData: "",
      editArray: []

    });
  };

  onModelPopup = (data) => {
    this.props.getOfficeList({roughId: data._id}).then((result) => {
      console.log('result', result)
      this.setState({subOfficeAndFactoryData: result.data});
    }).catch((err) => {

    });

    this.setState({
      //  singleOfiiceData: data,
      subRoughModel: true,
      model: true,
    });
  };

  handelAddDataModal = () => {
    this.setState({
      model: true,
    });
  };
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

  handelAddSorting = (data) => {
    console.log("RoughIndex -> handelAdewrwejrhwegyudSorting -> data", data);
    this.props
      .addSortingData(data)
      .then((res) => this.closeModal())
      .catch((e) => console.log(e));
  };

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

  // onModelPopup = () => {
  //   this.setState({
  //     model: true,
  //   });
  // };

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



  edit = (data) => {
    console.log("🚀 ~ file: RoughIndex.js ~ line 243 ~ RoughIndex ~ data", data)


    let editArray = data && data.brokername ? ["Add Rough", "Sorting Rough"] : ["Assign Rough"]

    this.setState({
      subRoughModel: false,
      model: true,
      preSelectedData: data,
      editArray: editArray
    });


  }

  remove = (data) => {
    console.log("🚀 ~ file: RoughIndex.js ~ line 248 ~ RoughIndex ~ data", data)
    this.props.removeMainRough({id: data._id}).then((result) => {
      console.log("🚀 ~ file: RoughIndex.js ~ line 245 ~ RoughIndex ~ removeMainRough ~ result", result)
      this.getListOfRough()

    }).catch((err) => {

    });
    //this.setState({open: true});
  }


  closeBox = (e) => {
    if (e) {

    }
    this.setState({open: false});
  }



  render() {
    const {subRoughModel, editArray} = this.state;
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
            getOfficeSubList={
              this.props.getOfficeSubList
            }
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
            close={this.closeModal}
            rowData={this.state.subOfficeAndFactoryData}
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
            close={this.closeModal}
            rowData={this.state.subOfficeAndFactoryData}
            column={OfficeSubRoughColumn}
            pageSize={this.onPageChange}
            totalData={this.state.subPacketpageinationRef}
            edit={this.edit}
            remove={this.remove}
          />)
      }
    ]





    return (
      <Sidebar
        title="Rough List"
        button="Add Rough"
        onClick={this.onModelPopup}
        addButtonFunction={this.handelAddDataModal}
        rowData={this.state.tableData}
        column={RoughColumn}
        pageSize={this.onPageChange}
        totalData={this.state.pageinationRef}
        edit={this.edit}
        remove={this.remove}
      >
        <Model
          modalName="Rough Details"
          open={this.state.model}
          close={this.closeModal}
          handelModelTabChange={this.handelModelTabChange}
          tabContent={editArray.length ?
            mainRoughTabArray.filter((data) => editArray.includes(data.lebal)) :
            (subRoughModel ? subRoughTab : mainRoughTabArray)
          }
        />
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => {
  let reducerState = state.reducerState
  return {
    roughList: reducerState.roughList,
    roughPreference: reducerState.roughPreference
  }
};

export default connect(mapStateToProps, {
  removeMainRough,
  getRough,
  addRough,
  getRoughPrefrence,
  getSortingData,
  addSortingData,
  assignOffice, getUnusedList, getOfficeList, getOfficeSubList, assignFactory
})(RoughIndex);
