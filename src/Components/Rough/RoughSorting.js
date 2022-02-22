import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
// import TextField from "../Common/CommonComponents";
import SortigTable from "./SortigTable";
import moment from "moment";
import { DropDownSelection } from "../Common/CommonComponents";
import { connect } from "react-redux";
import { getSortingData } from "../../Actions/Rough";
// import { sumObjValuses } from "../../js/Helper";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  sortinRoughId: Yup.string().required("*Select Rough Id"),
  // assignName: Yup.string().required("*Assign Name is required"),
  // carat: Yup.string().required("*carat is required"),
  // rate: Yup.string().required("*rate is required"),
  // piece: Yup.string().required("*piece is required"),
});
class RoughSorting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortingData: {
        chockiCarat: 0,
        chockiPrice: 0,
        markisCarat: 0,
        markisPrice: 0,
        crystalCarat: 0,
        crystalPrice: 0,
        golCarat: 0,
        golPrice: 0,
        outCarat: 0,
        outPrice: 0,
        chockiTotal: 0,
      },
      sumOfCarat: 0,
      sumOfAmount: 0,
      sortData: [],
    };
  }

  componentDidMount = () => {
    // if (this.props.sortingData.length > 0) {
    // this.setState({
    //   sortingData: {
    //     chockiCarat: 0,
    //     chockiPrice: 0,
    //     markisCarat: 0,
    //     markisPrice: 0,
    //     crystalCarat: 0,
    //     crystalPrice: 0,
    //     golCarat: 0,
    //     golPrice: 0,
    //     outCarat: 0,
    //     outPrice: 0,
    //   },
    // });
    // }
  };

  handelSubmit = (e) => {
    // console.log(e);
    const {
      chockiCarat,
      chockiPrice,
      markisCarat,
      markisPrice,
      crystalCarat,
      crystalPrice,
      golCarat,
      golPrice,
      outCarat,
      outPrice,
    } = this.state.sortingData;
    const data = {
      rough_id: e.sortinRoughId.id,
      chocki: {
        chocki_carat: chockiCarat,
        chocki_price: chockiPrice,
        chocki_total: parseInt(chockiPrice * chockiCarat),
      },
      out: {
        out_carat: outCarat,
        out_price: outPrice,
        out_total: parseInt(outCarat * outPrice),
      },
      markis: {
        markis_carat: markisCarat,
        markis_price: markisPrice,
        markis_total: parseInt(markisCarat * markisPrice),
      },
      gol: {
        gol_carat: golCarat,
        gol_price: golPrice,
        gol_total: parseInt(golCarat * golPrice),
      },
      crystal: {
        crystal_carat: crystalCarat,
        crystal_price: crystalPrice,
        crystal_total: parseInt(crystalCarat * crystalPrice),
      },
      total_sorting_carat: this.state.sumOfCarat,
      total_sorting_amount: this.state.sumOfAmount,
    };
    // console.log("RoughSorting -> handelSubmit -> data", data);
    this.props.handelAddSorting(data);
  };

  handelOnChange = (e) => {
    this.setState(
      {
        sortingData: {
          ...this.state.sortingData,
          [e.target.name]: parseFloat(e.target.value),
        },
      },
      () => {
        const chockiTotal =
          this.state.sortingData.chockiCarat *
          this.state.sortingData.chockiPrice;
        const markisTotal =
          this.state.sortingData.markisCarat *
          this.state.sortingData.markisPrice;
        const crystalTotal =
          this.state.sortingData.crystalCarat *
          this.state.sortingData.crystalPrice;
        const golTotal =
          this.state.sortingData.golCarat * this.state.sortingData.golPrice;
        const outTotal =
          this.state.sortingData.outCarat * this.state.sortingData.outPrice;
        this.setState({
          sumOfCarat:
            this.state.sortingData.chockiCarat +
            this.state.sortingData.markisCarat +
            this.state.sortingData.crystalCarat +
            this.state.sortingData.golCarat +
            this.state.sortingData.outCarat,
          sumOfAmount:
            chockiTotal + markisTotal + crystalTotal + golTotal + outTotal,
        });
      }
    );
  };

  handelData = () => {};

  handelSelectedId = (id) => {
    this.props
      .getSortingData({ id })
      .then((res) => this.setState({ sortData: res.data }))
      .catch((e) => console.log(e));
  };

  render() {
    let items = [];
    this.props.caratList.map((value) =>
      items.push({ id: value._id, label: value.carat.toString() })
    );
    // console.log(
    //   "RoughSorting -> render -> items",
    //   this.state.sortingData.chockiTotal
    // );
    return (
      <div style={{ marginBottom: "5%" }}>
        <Formik
          initialValues={{
            sortinRoughId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            console.log("AddRoughModal -> render -> values", values);
            this.props.close();
            this.handelSubmit(values);

            // Simulate submitting to database, shows us values submitted, resets form
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="assign-headding-wrapper">
                <div className="rough-id-dropdown-wrapper">
                  <DropDownSelection
                    className={
                      touched.sortinRoughId && errors.sortinRoughId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="sortinRoughId"
                    selectedItem={values.sortinRoughId}
                    value={values.sortinRoughId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-buyer-name"
                    items={items}
                    label="Select Rough"
                    light
                    onChange={(select) => {
                      setFieldValue("sortinRoughId", select.selectedItem);
                      // this.props.selectedId(select.selectedItem.id);
                      this.handelSelectedId(
                        select.selectedItem ? select.selectedItem.id : 0
                      );
                    }}
                    titleText="Rough"
                    type="default"
                  />
                  {touched.sortinRoughId && errors.sortinRoughId ? (
                    <div className="error-message">{errors.sortinRoughId}</div>
                  ) : null}
                </div>
                <h5 className="h5-form-label">
                  Date :{" "}
                  <span style={{ color: "#0F61FD" }}>
                    {moment().format("DD/MM/YYYY")}
                  </span>
                </h5>
                <h5 className="h5-form-label">
                  Total Carat : <span style={{ color: "#0F61FD" }}>650.00</span>
                </h5>
              </div>

              <div>
                <SortigTable
                  handelOnChange={this.handelOnChange}
                  value={this.state.sortingData}
                />
              </div>
              <div className="assign-headding-wrapper">
                <h5 className="h5-form-label">
                  Total Sorting Carat :{" "}
                  <span style={{ color: "#DA1E28" }}>
                    {this.state.sumOfCarat}
                  </span>
                </h5>
                <h5 className="h5-form-label">
                  Total Amount :{" "}
                  <span style={{ color: "#0D9F37" }}>
                    {this.state.sumOfAmount} /-
                  </span>
                </h5>
              </div>
              <div className="assign-headding-wrapper">
                <h5 className="h5-form-label">
                  Carat Remaining :{" "}
                  <span style={{ color: "#8A3FFC" }}>45.06</span>
                </h5>
                <h5 className="h5-form-label">
                  Remaining Carat Price :{" "}
                  <span style={{ color: "#8A3FFC" }}>30,000 /-</span>
                </h5>
              </div>
              <div className="bx--modal-footer modal-custome-footer">
                <button
                  tabindex="0"
                  className="bx--btn bx--btn--secondary"
                  type="button"
                  onClick={this.props.close}
                >
                  Close
                </button>
                <button
                  tabindex="0"
                  className="bx--btn bx--btn--primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = ({ ...state }) => {};

export default connect(mapStateToProps, { getSortingData })(RoughSorting);
