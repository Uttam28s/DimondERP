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
    // console.log("PageTopSection -> handelViewButton -> id", id);
    const split = id.split(":");
    // console.log("PageTopSection -> handelViewButton -> split", split);
    const singleData = this.state.rowData.find((data) => data.id === split[0]);
    console.log("edit button press", singleData);
  };

  handelOnDeleteClick = (id) => {
    // console.log("PageTopSection -> handelViewButton -> id", id);
    const split = id.split(":");
    // console.log("PageTopSection -> handelViewButton -> split", split);
    const singleData = this.state.rowData.find((data) => data.id === split[0]);
    console.log("delete button press", singleData);
  };

  handelViewButton = (id) => {
    console.log("PageTopSection -> handelViewButton -> id", id);
    const split = id.split(":");
    // console.log("PageTopSection -> handelViewButton -> split", split);
    const singleData = this.state.rowData.find((data) => data.id === split[0]);
    console.log("View button press", singleData);
    this.props.onClick(singleData);
  };

  itemRangeText = (min, max, total) => {
    console.log("min", min, "max", max, "ottal", total);
    // this.setState({
    //   currentPage: min,
    // });
  };

  itemText = (min, max) => {
    console.log("itemText ->", "min", min, "max", max);
  };

  onChange = (e) => {
    console.log("PageTopSection -> onChansadasdage -> e", e);
    this.setState({
      currentPage: e.page,
    });
    this.props.pageSize(e.page);
  };

  pageRangeText = (current, total) => {
    console.log(
      "pageRangeText->itemText ->",
      "current",
      current,
      "total",
      total
    );
  };

  pageText = (page) => {
    console.log("PageTopSection -> pageText -> page", page);
  };

  render() {
    return (
      <div className="pagetop-wrapper">
        <DataTable
          rows={this.state.rowData}
          headers={this.state.headerData}
          // size="short"
          // isSortable
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
                {/* <TableBatchAction {...getBatchActionProps()}>
            <TableBatchAction
              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
              renderIcon={Delete}
              onClick={()=>console.log('clicked')}>
              Delete
            </TableBatchAction>
            <TableBatchAction
              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
              renderIcon={Save}
              onClick={()=>console.log('clicked')}>
              Save
            </TableBatchAction>
            <TableBatchAction
              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
              renderIcon={Download}
              onClick={()=>console.log('clicked')}>
              Download
            </TableBatchAction>
          </TableBatchAction> */}

                <TableToolbarContent className="tollbar-content">
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
              <div className="table-wrapper">
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableSelectAll {...getSelectionProps()} /> */}
                      {headers.map((header) => (
                        // console.log("PageTopSection -> header", header)
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
                        <TableRow {...getRowProps({ row })}>
                          {row.cells.map(
                            (cell) => (
                              <TableCells
                                handelOnEditClick={this.handelOnEditClick}
                                handelOnDeleteClick={this.handelOnDeleteClick}
                                handelViewButton={this.handelViewButton}
                                header={cell}
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
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
          )}
        />
        <div className="pagination-wrapper">
          {console.log(
            "this is  a log for a apagination ---->",
            this.state.currentPage
          )}

          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            page={this.props.totalData.currentPage}
            pageNumberText="Page Number"
            pageSize={10}
            pageSizes={[10]}
            totalItems={this.props.totalData.totalCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default PageTopSection;
