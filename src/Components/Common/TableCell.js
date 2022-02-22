import { Delete20, Edit20, View20 } from "@carbon/icons-react";
import { TableCell } from "carbon-components-react";
import React, { Component } from "react";
import moment from "moment";

export default class TableCells extends Component {
  render() {
    const cell = this.props.header;
    switch (cell.info.header) {
      case "btn":
        return (
          <TableCell key={cell.id}>
            <div className="action-wrapper">
              <Edit20
                className="edit-in-table"
                onClick={() => this.props.handelOnEditClick(cell.id)}
              />
              <div className="devider"></div>
              <Delete20
                className="delete-in-table"
                onClick={() => this.props.handelOnDeleteClick(cell.id)}
              />
            </div>
          </TableCell>
        );
      case "id":
        return (
          <TableCell key={cell.id}>
            <View20
              className="view-in-table"
              onClick={() => this.props.handelViewButton(cell.id)}
            />
          </TableCell>
        );
      case "date":
      case "lastdate":
      case "assign_date":
      case "sawing_assign_date":
      case "chapka_assign_date":
      case "sawing_return_date":
      case "chapka_return_date":
        return (
          <TableCell key={cell.id}>
            {moment(cell.value).format("DD-MM-YYYY")}
          </TableCell>
        );
      // case this.props.type:
      //   return (
      //     <TableCell key={cell.id}>
      //       <div className="action-wrapper">
      //         <Edit20
      //           className="edit-in-table"
      //           onClick={() => this.handelOnEditClick(cell.id)}
      //         />
      //         <div className="devider"></div>
      //         <Delete20
      //           className="delete-in-table"
      //           onClick={() => this.handelOnDeleteClick(cell.id)}
      //         />
      //       </div>
      //     </TableCell>
      //   );

      default:
        return <TableCell key={cell.id}>{cell.value}</TableCell>;
    }
  }
}
