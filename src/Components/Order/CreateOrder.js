import React, { Component } from "react";
import { Form, ContentSwitcher, Switch } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  // officeIssueassigneName: Yup.string().required("*Assign Id is required"),
  // roughName: Yup.string().required("*Rough Name is required"),
  orderBuyerName: Yup.string().required("*Buyer name is required"),
  ordereDalalaName: Yup.string().required("*Dalal name is required"),
  orderCarat: Yup.string().required("*Carat is required"),
  orderAmount: Yup.string().required("*Amount is required"),
  orderSellingDate: Yup.string().required("*Selling Date is required"),
  orderPaymentDays: Yup.string().required("*Payment days is required"),
  orderAmountPayed: Yup.string().required("*Payed Amount is required"),
  orderCreateDate: Yup.string().required("*Date is required"),
});
class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handelSubmit = (e) => {
    console.log(e);
  };

  handelOnChange = (e) => {
    console.log("AddRoughModal -> handelOnChange -> e", e.target);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div style={{ marginBottom: "15%" }}>
        <Formik
          initialValues={{
            orderBuyerName: "",
            ordereDalalaName: "",
            orderCarat: "",
            orderAmount: "",
            orderSellingDate: "",
            orderPaymentDays: "",
            orderAmountPayed: "",
            orderCreateDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            console.log("AddRoughModal -> render -> values", values);
            this.props.close();
            // Simulate submitting to database, shows us values submitted, resets form
            // setTimeout(() => {
            //   // alert(JSON.stringify(values, null, 2));
            //   resetForm();
            //   setSubmitting(false);
            // }, 500);
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
              {/* <h5 className="h5-form-label">
                Packet Id : <span style={{ color: "#0F61FD" }}>#PID001</span>
              </h5> */}
              <div className="h5-form-label">
                <ContentSwitcher onChange={console.log}>
                  <Switch name={"rough"} text="Rough Order" />
                  <Switch name={"sorting"} text="Sorting Selling" />
                  <Switch name={"polish"} text="Polish Selling" />
                </ContentSwitcher>
              </div>
              <div className="bx--row">
                <div className="bx--col-md-3">
                  <DateSelection
                    dateFormat="d/m/Y"
                    datePickerType="single"
                    onChange={(date) => {
                      const basicDate = new Date(date);
                      const formateDate =
                        basicDate.getDate() +
                        "/" +
                        (basicDate.getMonth() + 1) +
                        "/" +
                        basicDate.getFullYear();
                      setFieldValue("orderCreateDate", formateDate);
                    }}
                    id="order-create-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Order Date"
                    className={
                      touched.orderCreateDate && errors.orderCreateDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="order-packet-id"
                    name="orderCreateDate"
                    value={values.orderCreateDate}
                    onBlur={handleBlur}
                  />
                  {touched.orderCreateDate && errors.orderCreateDate ? (
                    <div className="error-message">
                      {errors.orderCreateDate}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DateSelection
                    dateFormat="d/m/Y"
                    datePickerType="single"
                    onChange={(date) => {
                      const basicDate = new Date(date);
                      const formateDate =
                        basicDate.getDate() +
                        "/" +
                        (basicDate.getMonth() + 1) +
                        "/" +
                        basicDate.getFullYear();
                      setFieldValue("orderSellingDate", formateDate);
                    }}
                    id="order-part-create-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Billing Date"
                    className={
                      touched.orderSellingDate && errors.orderSellingDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="order-part-packet-id"
                    name="orderSellingDate"
                    value={values.orderSellingDate}
                    onBlur={handleBlur}
                  />
                  {touched.orderSellingDate && errors.orderSellingDate ? (
                    <div className="error-message">
                      {errors.orderSellingDate}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.orderBuyerName && errors.orderBuyerName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="orderBuyerName"
                    selectedItem={values.orderBuyerName}
                    value={values.orderBuyerName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-buyer-name"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Buyer Name"
                    light
                    onChange={(select) =>
                      setFieldValue("orderBuyerName", select.selectedItem)
                    }
                    titleText="Buyer Name"
                    type="default"
                  />
                  {touched.orderBuyerName && errors.orderBuyerName ? (
                    <div className="error-message">{errors.orderBuyerName}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.ordereDalalaName && errors.ordereDalalaName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="ordereDalalaName"
                    selectedItem={values.ordereDalalaName}
                    value={values.ordereDalalaName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-dalal-name"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Dalal Name"
                    light
                    onChange={(select) =>
                      setFieldValue("ordereDalalaName", select.selectedItem)
                    }
                    titleText="Dalal Name"
                    type="default"
                  />
                  {touched.ordereDalalaName && errors.ordereDalalaName ? (
                    <div className="error-message">
                      {errors.ordereDalalaName}
                    </div>
                  ) : null}
                </div>
                {/* <div className="bx--col-md-3"></div> */}
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.orderCarat && errors.orderCarat
                        ? "error"
                        : "bx--col"
                    }
                    name="orderCarat"
                    value={values.orderCarat}
                    id="order-packet-carat"
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
                  {touched.orderCarat && errors.orderCarat ? (
                    <div className="error-message">{errors.orderCarat}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.orderAmount && errors.orderAmount
                        ? "error"
                        : "bx--col"
                    }
                    name="orderAmount"
                    value={values.orderAmount}
                    id="orderAmount"
                    placeholder="enter rate here"
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
                  {touched.orderAmount && errors.orderAmount ? (
                    <div className="error-message">{errors.orderAmount}</div>
                  ) : null}
                </div>
                <p style={{ display: "grid" }}>
                  Total Amount : <span style={{ color: "#DA1E28" }}>00.00</span>
                </p>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.orderPaymentDays && errors.orderPaymentDays
                        ? "error"
                        : "bx--col"
                    }
                    name="orderPaymentDays"
                    value={values.orderPaymentDays}
                    id="orderPaymentDays"
                    placeholder="enter payment Days here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="payment Days :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.orderPaymentDays && errors.orderPaymentDays ? (
                    <div className="error-message">
                      {errors.orderPaymentDays}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.orderAmountPayed && errors.orderAmountPayed
                        ? "error"
                        : "bx--col"
                    }
                    name="orderAmountPayed"
                    value={values.orderAmountPayed}
                    id="orderAmountPayed"
                    placeholder="enter payed amount here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Payed Amount:"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.orderAmountPayed && errors.orderAmountPayed ? (
                    <div className="error-message">
                      {errors.orderAmountPayed}
                    </div>
                  ) : null}
                </div>
                <p style={{ display: "grid" }}>
                  Remaining Amount :{" "}
                  <span style={{ color: "#DA1E28" }}>00.00</span>
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

export default CreateOrder;
