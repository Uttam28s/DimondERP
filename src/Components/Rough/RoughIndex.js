import React, { Component } from "react";
import Sidebar from "../Common/Sidebar";
import Model from "../Common/Model";
import AddRoughModal from "./AddRoughModal";
import AssignRough from "./AssignRough";
import RoughSorting from "./RoughSorting";
import { RoughColumn } from "../Collumn/Rough";
import { connect } from "react-redux";
import {
  getRough,
  addRough,
  getRoughPrefrence,
  getSortingData,
  addSortingData,
} from "../../Actions/Rough";
import { assignOffice } from "../../Actions/Office";

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
      caratList: [],
      sortingData: [],
      singleOfiiceData: "",
      subPacketModel: false,
    };
  }

  componentDidMount = () => {
    // const pageData = {
    //   skip: this.state.skip,
    //   limit: this.state.limit,
    // };
    this.props
      .getRough(this.state.pageinationRef)
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

    this.props.getRoughPrefrence().then((res) => {
      console.log("RoughIndex -> componentDidMount -> res", res);
      this.setState({
        caratList: res.commonGet.caratList,
      });
    });
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
    console.log("log in a close modal");
    this.setState({
      model: false,
    });
  };

  onModelPopup = (data) => {
    this.setState({
      singleOfiiceData: data,
      subPacketModel: true,
      // model: true,
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
          console.log("RoughIndex -> componentDidMount -> res", res);
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

  render() {
    const tabArray = [
      {
        id: "1",
        lebal: "Add Rough",
        tabContent: (
          <AddRoughModal
            close={this.closeModal}
            handelAddRough={this.handelAddRough}
          />
        ),
      },
      {
        id: "2",
        lebal: "Sorting Rough",
        tabContent: (
          <RoughSorting
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
          <AssignRough
            close={this.closeModal}
            caratList={this.state.caratList}
            handelAssignOffice={this.handelAssignOffice}
          />
        ),
      },
    ];
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
      >
        {/* {console.log("log in render")} */}
        {/* <h1>Hello Fuck</h1> */}
        <Model
          modalName="Rough Details"
          open={this.state.model}
          close={this.closeModal}
          tabContent={tabArray}
        />
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.Test });

export default connect(mapStateToProps, {
  getRough,
  addRough,
  getRoughPrefrence,
  getSortingData,
  addSortingData,
  assignOffice,
})(RoughIndex);
