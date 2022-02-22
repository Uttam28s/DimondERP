import React, { Component } from "react";
// import { Delete20 } from "@carbon/icons-react";

class SortigTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // console.log("SortigTable -> constructor -> props", this.props);
    return (
      <div className="sorting-table-wrapper">
        <table>
          <tr className="sorting-table-header">
            <th>Type</th>
            <th>Carat</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>Chocki</td>
            <td>
              <input
                name="chockiCarat"
                value={this.props.value.chockiCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="chockiPrice"
                value={this.props.value.chockiPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">
                {(
                  this.props.value.chockiCarat * this.props.value.chockiPrice
                ).toFixed(2)}
              </p>
            </td>
          </tr>
          <tr>
            <td>Markis</td>
            <td>
              <input
                name="markisCarat"
                value={this.props.value.markisCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="markisPrice"
                value={this.props.value.markisPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">
                {(
                  this.props.value.markisCarat * this.props.value.markisPrice
                ).toFixed(2)}
              </p>
            </td>
          </tr>
          <tr>
            <td>Gol</td>
            <td>
              <input
                name="golCarat"
                value={this.props.value.golCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="golPrice"
                value={this.props.value.golPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">
                {(
                  this.props.value.golCarat * this.props.value.golPrice
                ).toFixed(2)}
              </p>
            </td>
          </tr>
          <tr>
            <td>Crystal</td>
            <td>
              <input
                name="crystalCarat"
                value={this.props.value.crystalCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="crystalPrice"
                value={this.props.value.crystalPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">
                {(
                  this.props.value.crystalCarat * this.props.value.crystalPrice
                ).toFixed(2)}
              </p>
            </td>
          </tr>
          <tr>
            <td>Out</td>
            <td>
              <input
                name="outCarat"
                value={this.props.value.outCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="outPrice"
                value={this.props.value.outPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">
                {(
                  this.props.value.outCarat * this.props.value.outPrice
                ).toFixed(2)}
              </p>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default SortigTable;
