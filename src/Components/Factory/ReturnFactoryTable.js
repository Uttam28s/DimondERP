import React, { Component } from "react";
// import { Delete20 } from "@carbon/icons-react";

class ReturnFactoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      Sarin,
      SarinPrice,
      Tiching,
      TichingPrice,
      FourP,
      FourPPrice,
      Table,
      TablePrice,
      Polish,
      PolishPrice,
      
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
            <td>Sarin</td>
            <td>
              <input
                name="Sarin"
                value={Sarin}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="SarinPrice"
                value={SarinPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{Sarin * SarinPrice}</p>
            </td>
          </tr>
          <tr>
            <td>Tiching</td>
            <td>
              <input
                name="Tiching"
                value={Tiching}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="TichingPrice"
                value={TichingPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{Tiching * TichingPrice}</p>
            </td>
          </tr>
          <tr>
            <td>4P</td>
            <td>
              <input
                name="FourP"
                value={FourP}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="FourPPrice"
                value={FourPPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{FourP * FourPPrice}</p>
            </td>
          </tr>
          <tr>
            <td>Table</td>
            <td>
              <input
                name="Table"
                value={Table}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="TablePrice"
                value={TablePrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{Table * TablePrice}</p>
            </td>
          </tr>
    
          <tr>
            <td>Polish</td>
            <td>
              <input
                name="Polish"
                value={Polish}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <input
                name="PolishPrice"
                value={PolishPrice}
                onChange={this.props.handelOnChange}
                type="number"
                placeholder="0"
                className="sorting-table-input"
              />
            </td>
            <td>
              <p className="sorting-table-input">{Polish * PolishPrice}</p>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ReturnFactoryTable;
