import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
} from "carbon-components-react";
import TableCells from "../TableCell";

export default class TabTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {}

  // componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

  // componentWillUnmount() {

  // }

  // Prototype methods, Bind in Constructor (ES2015)
  // handleEvent() {}

  // Class Properties (Stage 3 Proposal)
  // handler = () => { this.setState() }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableSelectAll {...getSelectionProps()} /> */}
            {this.props.headers.map((header) => (
              // console.log("PageTopSection -> header", header)
              <TableHeader
                {...this.props.getHeaderProps({ header })}
                style={{ width: `${header.size}` }}
              >
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.rows.map((row) => (
            <>
              <TableRow {...this.props.getRowProps({ row })}>
                {row.cells.map(
                  (cell) => (
                    <TableCells
                      handelOnEditClick={this.props.handelOnEditClick}
                      handelOnDeleteClick={this.props.handelOnDeleteClick}
                      handelViewButton={this.props.handelViewButton}
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
    );
  }
}
