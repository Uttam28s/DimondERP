import React, { Component } from "react";
import { Button, Search, Tag } from "carbon-components-react";
import { Add24 } from "@carbon/icons-react";

class SellerDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handelOnSerch = (value) => {
    console.log("SellerDetailsPage -> handelOnSerch -> value", value);
  };

  render() {
    return (
      <div>
        <div className="seller-detail-page-wrapper">
          <h3>{this.props.title}</h3>
          <div className="seller-functionality-wrapper">
            <div className="seller-functionality">
              <Search
                light
                className="seller-page-serch"
                closeButtonLabelText="Clear search input"
                id="search-seller"
                onChange={this.handelOnSerch}
                placeHolderText="Search"
                size="lg"
                type="text"
              />
              <Button
                onClick={this.props.handelAddData}
                size="small"
                kind="primary"
                className="add-data-button"
              >
                {this.props.button}
                <Add24 />
              </Button>
            </div>
          </div>
        </div>
        <div className="seller-detail-wrapper">
          <div className="seller-card-wrapper">
            <div className="seller-card-first-section-wrapper">
              <div className="manage-view">
                <p className="heading">Jone A.</p>
                <span className="title-of-data">+91 8154831233</span>
              </div>
              <div className="manage-view">
                <Tag type="warm-gray" title="Clear Filter">
                  {" "}
                  India{" "}
                </Tag>
                <span className="title-of-data">June 9, 2001</span>
              </div>
            </div>
            <div className="seller-card-second-section-wrapper">
              <div className="manage-view">
                <span className="title-of-data">Total Exchange</span>
                <p className="heading">
                  9,35,500 <span>800 crt</span>
                </p>
              </div>
            </div>
            <div className="seller-card-thired-section-wrapper">
              <div className="total-payment-wrapper">
                <span className="title-of-data">Current Process</span>
                <p className="heading">9,35,500</p>
              </div>
              <div className="center-percentage">
                <h1>8%</h1>
              </div>
              <div className="last-div-wrapper">
                <div className="amount-details">
                  <span>Payed</span>
                  <p className="payed-amount">20,000</p>
                </div>
                <div className="amount-details">
                  <span>Unpayed</span>
                  <p className="unpayed-amount">80,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seller-card-wrapper">
            <div className="seller-card-first-section-wrapper">
              <div className="manage-view">
                <p className="heading">Jone A.</p>
                <span className="title-of-data">+91 8154831233</span>
              </div>
              <div className="manage-view">
                <Tag type="warm-gray" title="Clear Filter">
                  {" "}
                  India{" "}
                </Tag>
                <span className="title-of-data">June 9, 2001</span>
              </div>
            </div>
            <div className="seller-card-second-section-wrapper">
              <div className="manage-view">
                <span className="title-of-data">Total Exchange</span>
                <p className="heading">
                  9,35,500 <span>800 crt</span>
                </p>
              </div>
            </div>
            <div className="seller-card-thired-section-wrapper">
              <div className="total-payment-wrapper">
                <span className="title-of-data">Current Process</span>
                <p className="heading">9,35,500</p>
              </div>
              <div className="center-percentage">
                <h1>8%</h1>
              </div>
              <div className="last-div-wrapper">
                <div className="amount-details">
                  <span>Payed</span>
                  <p className="payed-amount">20,000</p>
                </div>
                <div className="amount-details">
                  <span>Unpayed</span>
                  <p className="unpayed-amount">80,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seller-card-wrapper">
            <div className="seller-card-first-section-wrapper">
              <div className="manage-view">
                <p className="heading">Jone A.</p>
                <span className="title-of-data">+91 8154831233</span>
              </div>
              <div className="manage-view">
                <Tag type="warm-gray" title="Clear Filter">
                  {" "}
                  India{" "}
                </Tag>
                <span className="title-of-data">June 9, 2001</span>
              </div>
            </div>
            <div className="seller-card-second-section-wrapper">
              <div className="manage-view">
                <span className="title-of-data">Total Exchange</span>
                <p className="heading">
                  9,35,500 <span>800 crt</span>
                </p>
              </div>
            </div>
            <div className="seller-card-thired-section-wrapper">
              <div className="total-payment-wrapper">
                <span className="title-of-data">Current Process</span>
                <p className="heading">9,35,500</p>
              </div>
              <div className="center-percentage">
                <h1>8%</h1>
              </div>
              <div className="last-div-wrapper">
                <div className="amount-details">
                  <span>Payed</span>
                  <p className="payed-amount">20,000</p>
                </div>
                <div className="amount-details">
                  <span>Unpayed</span>
                  <p className="unpayed-amount">80,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seller-card-wrapper">
            <div className="seller-card-first-section-wrapper">
              <div className="manage-view">
                <p className="heading">Jone A.</p>
                <span className="title-of-data">+91 8154831233</span>
              </div>
              <div className="manage-view">
                <Tag type="warm-gray" title="Clear Filter">
                  {" "}
                  India{" "}
                </Tag>
                <span className="title-of-data">June 9, 2001</span>
              </div>
            </div>
            <div className="seller-card-second-section-wrapper">
              <div className="manage-view">
                <span className="title-of-data">Total Exchange</span>
                <p className="heading">
                  9,35,500 <span>800 crt</span>
                </p>
              </div>
            </div>
            <div className="seller-card-thired-section-wrapper">
              <div className="total-payment-wrapper">
                <span className="title-of-data">Current Process</span>
                <p className="heading">9,35,500</p>
              </div>
              <div className="center-percentage">
                <h1>8%</h1>
              </div>
              <div className="last-div-wrapper">
                <div className="amount-details">
                  <span>Payed</span>
                  <p className="payed-amount">20,000</p>
                </div>
                <div className="amount-details">
                  <span>Unpayed</span>
                  <p className="unpayed-amount">80,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seller-card-wrapper">
            <div className="seller-card-first-section-wrapper">
              <div className="manage-view">
                <p className="heading">Jone A.</p>
                <span className="title-of-data">+91 8154831233</span>
              </div>
              <div className="manage-view">
                <Tag type="warm-gray" title="Clear Filter">
                  {" "}
                  India{" "}
                </Tag>
                <span className="title-of-data">June 9, 2001</span>
              </div>
            </div>
            <div className="seller-card-second-section-wrapper">
              <div className="manage-view">
                <span className="title-of-data">Total Exchange</span>
                <p className="heading">
                  9,35,500 <span>800 crt</span>
                </p>
              </div>
            </div>
            <div className="seller-card-thired-section-wrapper">
              <div className="total-payment-wrapper">
                <span className="title-of-data">Current Process</span>
                <p className="heading">9,35,500</p>
              </div>
              <div className="center-percentage">
                <h1>8%</h1>
              </div>
              <div className="last-div-wrapper">
                <div className="amount-details">
                  <span>Payed</span>
                  <p className="payed-amount">20,000</p>
                </div>
                <div className="amount-details">
                  <span>Unpayed</span>
                  <p className="unpayed-amount">80,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seller-card-wrapper">
            <div className="seller-card-first-section-wrapper">
              <div className="manage-view">
                <p className="heading">Jone A.</p>
                <span className="title-of-data">+91 8154831233</span>
              </div>
              <div className="manage-view">
                <Tag type="warm-gray" title="Clear Filter">
                  {" "}
                  India{" "}
                </Tag>
                <span className="title-of-data">June 9, 2001</span>
              </div>
            </div>
            <div className="seller-card-second-section-wrapper">
              <div className="manage-view">
                <span className="title-of-data">Total Exchange</span>
                <p className="heading">
                  9,35,500 <span>800 crt</span>
                </p>
              </div>
            </div>
            <div className="seller-card-thired-section-wrapper">
              <div className="total-payment-wrapper">
                <span className="title-of-data">Current Process</span>
                <p className="heading">9,35,500</p>
              </div>
              <div className="center-percentage">
                <h1>8%</h1>
              </div>
              <div className="last-div-wrapper">
                <div className="amount-details">
                  <span>Payed</span>
                  <p className="payed-amount">20,000</p>
                </div>
                <div className="amount-details">
                  <span>Unpayed</span>
                  <p className="unpayed-amount">80,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SellerDetailsPage;
