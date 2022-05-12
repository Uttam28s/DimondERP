import React, { Component } from "react";
import {
  Button,
  // Search,
  DataTable,
  TableContainer,
  TableToolbar,
  // TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Table,
  TableHead,
  TableRow,
  // TableSelectAll,
  TableHeader,
  TableBody,
  // TableSelectRow,
  // TableCell,
  Pagination,
  // OverflowMenu,
  // OverflowMenuItem,
} from "carbon-components-react";
import { Add24 } from "@carbon/icons-react";
import TableCells from "./TableCell";
import TabView from "./Tabs";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { withRouter } from "react-router";
// import {
//   Add20,
//   ListDropdown24,
//   FilterEdit24,
//   Settings24,
// } from "@carbon/icons-react";
class PageTopSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: this.props.rowData,
      headerData: this.props.column,
      currentPage: 1,
      dataPerPage: 10,
      currentPageData: [],
      cureentTab: 0,
      open: false,
      // page:1
    };
  }

  // componentDidMount = () => {
  //   this.setState({
  //     currentPage: 1,
  //   });
  // };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log(
    //   "PageTopSection -> componentDidUpdate -> prevState.currentPage",
    //   prevState.currentPage
    // );
    // if (prevState.currentPage !== this.state.currentPage) {
    //   const username = this.state.rowData || [];
    //   const { currentPage, dataPerPage } = this.state;
    //   const indexOfLastTodo = currentPage * dataPerPage;
    //   const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
    //   const currentPageData = username.slice(indexOfFirstTodo, indexOfLastTodo);
    //   this.setState({
    //     currentPageData,
    //   });
    //   console.log("this ia a s array data", this.props.rowData);
    // }
  };

  handelTab = (e) => {
    console.log("this is a log to check the tab on Change -> ", e);
    this.setState({
      cureentTab: e,
    });
  };

  handelOnEditClick = (id) => {
    const split = id.split(":");
    const singleData = this.state.rowData.find((data) => data.id === split[0]);
    this.props.edit(singleData);
  };

  handelOnDeleteClick = (id) => {
    const split = id.split(":");
    const singleData = this.state.rowData.find((data) => data.id === split[0]);
    this.setState({ open: split[0] });
  };

  closeBox = (id) => {
    if (id) {
      const split = id.split(":");
      const singleData = this.state.rowData.find(
        (data) => data.id === split[0]
      );
      this.props.remove(singleData);
    }
    this.setState({ open: false });
  };

  handelViewButton = (id) => {
    const split = id.split(":");
    const singleData = this.state.rowData.find((data) => data.id === split[0]);
    // this.props.onClick(singleData);
    if (singleData.office_assigne_name) {
      this.props.history.push({
        pathname: `/office/subpacket/${singleData._id}`,
        state: singleData,
      });
    } else if (singleData.factory_assigne_name) {
      this.props.history.push({
        pathname: `/factory/subpacket/${singleData._id}`,
        state: singleData,
      });
    } else {
      this.props.history.push({
        pathname: `/rough/subpacket/${singleData._id}`,
        state: singleData,
      });
    }
  };

  itemRangeText = (min, max, total) => {};

  itemText = (min, max) => {};

  onChange = (e) => {
    this.setState({
      currentPage: e.page,
    });
    this.props.pageSize(e.page);
  };

  pageRangeText = (current, total) => {};

  pageText = (page) => {};

  render() {
    return this.props.tabContent ? (
      <TabView
        tabContent={this.props.tabContent}
        handelModelTabChange={this.props.handelModelTabChange}
        tabSelected={this.props.tabSelected}
      />
    ) : (
      <div className="pagetop-wrapper">
        {console.log("this.propsthis.propsthis.props", this.props)}
        <DataTable
          rows={this.state.rowData}
          headers={this.state.headerData}
          overflowMenuOnHover={false}
          render={({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
          }) => (
            <TableContainer title={this.props.title}>
              <TableToolbar>
                <TableToolbarContent
                  className={`tollbar-content ${!this.state.rowData.length &&
                    "no-record-blur"}`}
                >
                  <TableToolbarSearch
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onChange={onInputChange}
                    className="search-box"
                  />
                  <TableToolbarMenu
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    className="setting-icon"
                  >
                    <TableToolbarAction
                      primaryFocus
                      onClick={() => alert("Alert 1")}
                    >
                      Action 1
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert("Alert 2")}>
                      Action 2
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert("Alert 3")}>
                      Action 3
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  {this.props.noButton ? (
                    ""
                  ) : (
                    <Button
                      tabIndex={
                        getBatchActionProps().shouldShowBatchActions ? -1 : 0
                      }
                      onClick={this.props.handelAddData}
                      size="small"
                      kind="primary"
                      className="add-data-button"
                    >
                      {this.state.cureentTab === 2
                        ? "Return Packet"
                        : this.props.button}
                      <Add24 />
                    </Button>
                  )}
                </TableToolbarContent>
              </TableToolbar>
              {rows.length ? (
                <div className="table-wrapper">
                  <Table useZebraStyles>
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader
                            {...getHeaderProps({ header })}
                            style={{ width: `${header.size}` }}
                          >
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <>
                          <TableRow
                            {...getRowProps({ row })}
                            className={
                              this.props.colour
                                ? `${
                                    row.cells.filter((data) =>
                                      data.id.includes("return_date")
                                    )[0]?.value
                                      ? "sucess-row"
                                      : "failed-row"
                                  }`
                                : this.state.open == row.id
                                ? "delete-row"
                                : ""
                            }
                          >
                            {row.cells.map(
                              (cell, i) => (
                                <TableCells
                                  handelOnEditClick={this.handelOnEditClick}
                                  handelOnDeleteClick={this.handelOnDeleteClick}
                                  handelViewButton={this.handelViewButton}
                                  header={cell}
                                  key={`cell${i}`}
                                />
                              )
                              // cell.info.header === "btn" ? (
                              //   <TableCell key={cell.id}>
                              //     <div className="action-wrapper">
                              //       {/* {console.log(
                              //         "this is a information of row",
                              //         row,
                              //         "sdaasdasdasdas",
                              //         cell
                              //       )} */}
                              //       <Edit20
                              //         className="edit-in-table"
                              //         onClick={() =>
                              //           this.handelOnEditClick(cell.id)
                              //         }
                              //       />
                              //       <div className="devider"></div>
                              //       <Delete20
                              //         className="delete-in-table"
                              //         onClick={() =>
                              //           this.handelOnDeleteClick(cell.id)
                              //         }
                              //       />
                              //     </div>
                              //   </TableCell>
                              // ) : cell.info.header === "id" ? (
                              //   <TableCell key={cell.id}>
                              //     <View20
                              //       className="view-in-table"
                              //       onClick={() => this.handelViewButton(cell.id)}
                              //     />
                              //   </TableCell>
                              // ) : (
                              //   // console.log("PageTopSection -> cell", cell)
                              //   <TableCell key={cell.id}>{cell.value}</TableCell>
                              // )
                            )}
                            <Tooltip
                              html={
                                <div>
                                  <strong className="content-tippy">
                                    Are Sure to Remove this Rough?
                                  </strong>
                                  <div className="button-box">
                                    <span
                                      className="green"
                                      onClick={() => {
                                        this.closeBox(row.id);
                                      }}
                                    >
                                      <strong>Yes </strong>
                                    </span>
                                    <span
                                      className="red"
                                      onClick={() => {
                                        this.closeBox();
                                      }}
                                    >
                                      <strong>No </strong>
                                    </span>
                                  </div>
                                </div>
                              }
                              animation="perspective"
                              placement="top"
                              trigger="click"
                              open={this.state.open == row.id}
                              theme="light"
                              interactive
                              // interactive={true}
                              // inertia={true}
                              arrow={false}
                              duration={[350, 200]}
                            ></Tooltip>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="no-record">No Record Found</p>
              )}
            </TableContainer>
          )}
        />
        <div
          className={`pagination-wrapper ${!this.state.rowData.length &&
            "no-record-blur"}`}
        >
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            page={this.props.totalData?.currentPage || 0}
            pageNumberText="Page Number"
            pageSize={10}
            pageSizes={[10]}
            totalItems={this.props.totalData?.totalCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(PageTopSection);
