import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, { DateSelection } from "../Common/CommonComponents";
// import { connect } from "react-redux";
// import { addRough } from "../../Actions/Rough";
import moment from "moment";
// import { dateConversion } from "../Common/Helper";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  sallerName: Yup.string().required("*saller Name is required"),
  brokerName: Yup.string().required("*broker Name is required"),
  carat: Yup.string().required("*carat is required"),
  rate: Yup.string().required("*rate is required"),
  purchaseDate: Yup.string().required("*purchas date is required"),
  paymentDays: Yup.string().required("*payment days is required"),
});
class AddRoughModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handelSubmit = (e) => {
    console.log("AddRoughModal -> render -> values", e.purchaseDate);
    const data = {
      carat: e.carat,
      days: e.paymentDays,
      date: moment(e.purchaseDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      sellername: e.sallerName,
      brokername: e.brokerName,
      rate: e.rate,
      lastdate: moment(e.purchaseDate, "DD-MM-YYYY")
        .add(e.paymentDays, "days")
        .format("YYYY-MM-DD"),
      officecarat: 0,
      factorycarat: 0,
    };
    console.log(
      "AddRoughModal -> handelSubmit -> data",
      moment(e.purchaseDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    this.props.handelAddRough(data);
  };

  handelOnChange = (e) => {
    // console.log("AddRoughModal -> handelOnChange -> e", e.target);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div style={{ marginBottom: "15%" }}>
        <Formik
          initialValues={{
            sallerName: "",
            brokerName: "",
            carat: "",
            rate: "",
            purchaseDate: "",
            paymentDays: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);

            // console.log("AddRoughModal -> render -> values", values);
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
              <h5 className="h5-form-label">
                Rough Id : <span style={{ color: "#0F61FD" }}>#RID001</span>
              </h5>
              <div className="bx--row">
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.sallerName && errors.sallerName
                        ? "error"
                        : "bx--col"
                    }
                    value={values.sallerName}
                    name="sallerName"
                    id="seller-name"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Saller Name :"
                    placeholder="type Saller name here"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="text"
                  />
                  {touched.sallerName && errors.sallerName ? (
                    <div className="error-message">{errors.sallerName}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.brokerName && errors.brokerName
                        ? "error"
                        : "bx--col"
                    }
                    name="brokerName"
                    value={values.brokerName}
                    id="broker-name"
                    placeholder="Type Broker Name here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Broker Name :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="text"
                  />
                  {touched.brokerName && errors.brokerName ? (
                    <div className="error-message">{errors.brokerName}</div>
                  ) : null}
                </div>
                {/* <div className="bx--col-md-3"></div> */}
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.carat && errors.carat ? "error" : "bx--col"
                    }
                    name="carat"
                    value={values.carat}
                    id="rough-carat"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Carat :"
                    placeholder="enter carat here"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.carat && errors.carat ? (
                    <div className="error-message">{errors.carat}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.rate && errors.rate ? "error" : "bx--col"
                    }
                    name="rate"
                    value={values.rate}
                    id="rough-rate"
                    placeholder="enter amount here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Rate :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.rate && errors.rate ? (
                    <div className="error-message">{errors.rate}</div>
                  ) : null}
                </div>
                <p style={{ display: "grid" }}>
                  Total Amount :{" "}
                  <span style={{ color: "#0D9F37" }}>
                    {(values.carat * values.rate).toFixed(2)}/-
                  </span>
                </p>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3">
                  <DateSelection
                    dateFormat="d/m/y"
                    datePickerType="single"
                    onChange={(date) => {
                      const basicDate = new Date(date);
                      const formateDate =
                        basicDate.getDate() +
                        "/" +
                        (basicDate.getMonth() + 1) +
                        "/" +
                        basicDate.getFullYear();
                      setFieldValue("purchaseDate", formateDate);
                    }}
                    id="rough-purchase-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Purchase Date"
                    className={
                      touched.purchaseDate && errors.purchaseDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="rough-purchas-date"
                    name="purchaseDate"
                    value={values.purchaseDate}
                    onBlur={handleBlur}
                  />
                  {touched.purchaseDate && errors.purchaseDate ? (
                    <div className="error-message">{errors.purchaseDate}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.paymentDays && errors.paymentDays
                        ? "error"
                        : "bx--col"
                    }
                    name="paymentDays"
                    value={values.paymentDays}
                    id="rough-payment-days"
                    placeholder="Enter total payment days"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Payment Days :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.paymentDays && errors.paymentDays ? (
                    <div className="error-message">{errors.paymentDays}</div>
                  ) : null}
                </div>
                {/* <div className="bx--col-md-2"> */}
                <p style={{ display: "grid" }}>
                  Due Date :{" "}
                  <span style={{ color: "#DA1E28" }}>
                    {values.purchaseDate !== ""
                      ? moment(values.purchaseDate, "DD-MM-YYYY")
                          .add(values.paymentDays, "days")
                          .format("DD-MM-YYYY")
                      : "0000-00-00"}
                  </span>
                </p>
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

export default AddRoughModal;
