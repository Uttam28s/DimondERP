import React, { Component } from "react";

export default class Tableindex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: [
        {
          title: "taarIKa",
          dataIndex: "date",
          key: "10",
          width: 180,
          className: "income-table-td-height table-font-english",
          // render: (text, record) => (
          //   <div className="  english-font-input">
          //     {moment(text).format("DD-MM-YYYY")}
          //   </div>)
        },
        { key: "1", dataIndex: "id", title: "id", width: "10%" },
        { key: "2", dataIndex: "name", title: "Name" },
        { key: "3", dataIndex: "amount", title: "amount", width: "20%" },
        { key: "4", dataIndex: "name", title: "Name" },
        { key: "5", dataIndex: "amount", title: "amount", width: "20%" },
        { key: "6", dataIndex: "name", title: "Name" },
        { key: "7", dataIndex: "amount", title: "amount", width: "20%" },
        { key: "8", dataIndex: "name", title: "Name" },
        { key: "9", dataIndex: "amount", title: "amount", width: "20%" },
      ],
      data: [
        {
          id: "1",
          name: "Chuni",
          amount: 20,
        },
        {
          id: "2",
          name: "rayta",
          amount: 20,
        },
      ],
    };
  }

  // componentDidMount() {

  // }

  // componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

  // componentWillUnmount() {

  // }

  render() {
    return (
      <div className="costome-table-div">
        <table className="custome-table-wrapper">
          <thead>
            <tr>
              {this.state.column.map((res) => (
                <th style={{ width: `${res.width || "unset"}` }}>
                  {res.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.column.map((res, id) => (
              // console.log("Tableindex -> render -> res", res)
              <tr>
                {this.state.data.map((row) => {
                  console.log(
                    "Tableindex -> render -> row",
                    row,
                    "sadasd",
                    res
                  );
                  return (
                    // {
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        step="1"
                        min="1"
                        value={row[res.dataIndex]}
                      />
                    </td>
                    // }
                    //   <td>
                    //     <input
                    //       type="text"
                    //       className="form-control"
                    //       value={row.name}
                    //     />
                    //   </td>
                    //   <td>
                    //     <input
                    //       type="text"
                    //       className="form-control"
                    //       placeholder="6.00"
                    //       value={row.amount}
                    //     />
                    //   </td>
                    // </tr>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
