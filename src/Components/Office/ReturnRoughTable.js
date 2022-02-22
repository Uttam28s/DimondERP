import React, { Component } from "react";
// import { Delete20 } from "@carbon/icons-react";

class ReturnRoughTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      fiveCarat,
      fivePrice,
      chockiCarat,
      chockiPrice,
      singleCarat,
      singlePrice,
      nofourCarat,
      nofourPrice,
      laserCarat,
      ghatCarat,
      makeableCarat,
      laserPrice,
      ghatPrice,
      makeablePrice,
      outCarat,
      outPrice,
    } = this.props.value;
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
            <td>-5</td>
            <td>
              <input
                name="fiveCarat"
                value={fiveCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="fivePrice"
                value={fivePrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{fiveCarat * fivePrice}</p>
            </td>
          </tr>
          <tr>
            <td>Chocki</td>
            <td>
              <input
                name="chockiCarat"
                value={chockiCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="chockiPrice"
                value={chockiPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{chockiCarat * chockiPrice}</p>
            </td>
          </tr>
          <tr>
            <td>Single</td>
            <td>
              <input
                name="singleCarat"
                value={singleCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="singlePrice"
                value={singlePrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{singleCarat * singlePrice}</p>
            </td>
          </tr>
          <tr>
            <td>No. 4</td>
            <td>
              <input
                name="nofourCarat"
                value={nofourCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="nofourPrice"
                value={nofourPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{nofourCarat * nofourPrice}</p>
            </td>
          </tr>
          <tr>
            <td>Out</td>
            <td>
              <input
                name="outCarat"
                value={outCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="outPrice"
                value={outPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{outCarat * outPrice}</p>
            </td>
          </tr>
          <tr>
            <td>Laser</td>
            <td>
              <input
                name="laserCarat"
                value={laserCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="laserPrice"
                value={laserPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{laserCarat * laserPrice}</p>
            </td>
          </tr>
          <tr>
            <td>Ghat</td>
            <td>
              <input
                name="ghatCarat"
                value={ghatCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="ghatPrice"
                value={ghatPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{ghatCarat * ghatPrice}</p>
            </td>
          </tr>
          <tr>
            <td>Makeable</td>
            <td>
              <input
                name="makeableCarat"
                value={makeableCarat}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="makeablePrice"
                value={makeablePrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">
                {makeableCarat * makeablePrice}
              </p>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ReturnRoughTable;
