import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
import SellerDetailsPage from "../../Common/SellerDetailsPage";
import SellerModal from "../../Common/SellerModal";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, { DateSelection } from "../../Common/CommonComponents";

const validationSchema = Yup.object().shape({
  brokerConnectionDate: Yup.string().required("*Connection Date is required"),
  brokerName: Yup.string().required("*Name is required"),
  brokerLocation: Yup.string().required("*Add selere location is required"),
  brokerAddress: Yup.string().required("*Address is required"),
  brokerPhoneno: Yup.string()
    .required("*Phone no is required")
    .length(10, "Add Correct Number"),
  brokerage: Yup.string().required("*Company name no is required"),
});
class BrokerIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: false,
    };
  }

  closeModal = () => {
    console.log("log in a close modal");
    this.setState({
      model: false,
    });
  };

  handelAddDataModal = () => {
    this.setState({
      model: true,
    });
  };

  render() {
    return (
      <Sidebar table="no">
        <SellerDetailsPage
          button="Add Broker"
          title="Broker"
          handelAddData={this.handelAddDataModal}
        />
        <SellerModal
          modalName="Add new Broker"
          open={this.state.model}
          close={this.closeModal}
        >
          <div style={{ marginBottom: "8%" }}>
            <Formik
              initialValues={{
                brokerConnectionDate: "",
                brokerName: "",
                brokerLocation: "India",
                brokerAddress: "",
                brokerPhoneno: "",
                brokerage: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                // When button submits form and form is in the process of submitting, submit button is disabled
                setSubmitting(true);
                console.log("Add selere -> render -> values", values);
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
                  <div className="bx--row">
                    <div className="bx--col-md-4">
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
                          setFieldValue("brokerConnectionDate", formateDate);
                        }}
                        id="broker-connection-date"
                        placeholder="dd/mm/yyyy"
                        labelText="Connection Date"
                        className={
                          touched.brokerConnectionDate &&
                          errors.brokerConnectionDate
                            ? "error"
                            : "bx--col"
                        }
                        dateid="broker-connection-id"
                        name="brokerConnectionDate"
                        value={values.brokerConnectionDate}
                        onBlur={handleBlur}
                      />
                      {touched.brokerConnectionDate &&
                      errors.brokerConnectionDate ? (
                        <div className="error-message">
                          {errors.brokerConnectionDate}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.brokerName && errors.brokerName
                            ? "error"
                            : "bx--col"
                        }
                        name="brokerName"
                        value={values.brokerName}
                        id="broker-name"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Broker Name :"
                        placeholder="Enter broker name here"
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
                  </div>
                  <div className="bx--row top-margin-model-input">
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.brokerLocation && errors.brokerLocation
                            ? "error"
                            : "bx--col"
                        }
                        name="brokerLocation"
                        value={values.brokerLocation}
                        id="broker-location"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Broker Loction :"
                        placeholder="Enter location here"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="text"
                      />
                      {touched.brokerLocation && errors.brokerLocation ? (
                        <div className="error-message">
                          {errors.brokerLocation}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.brokerAddress && errors.brokerAddress
                            ? "error"
                            : "bx--col"
                        }
                        name="brokerAddress"
                        value={values.brokerAddress}
                        id="broker-Address"
                        placeholder="Enter address here"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Address :"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="text"
                      />
                      {touched.brokerAddress && errors.brokerAddress ? (
                        <div className="error-message">
                          {errors.brokerAddress}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="bx--row top-margin-model-input">
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.brokerPhoneno && errors.brokerPhoneno
                            ? "error"
                            : "bx--col"
                        }
                        name="brokerPhoneno"
                        value={values.brokerPhoneno}
                        id="broker-phoneNO"
                        placeholder="Enter phone no here"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Mobile No :"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="number"
                      />
                      {touched.brokerPhoneno && errors.brokerPhoneno ? (
                        <div className="error-message">
                          {errors.brokerPhoneno}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.brokerage && errors.brokerage
                            ? "error"
                            : "bx--col"
                        }
                        name="brokerage"
                        value={values.brokerage}
                        id="broker-company-name"
                        placeholder="Enter brkerage in %"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Brokerage :"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="number"
                      />
                      {touched.brokerage && errors.brokerage ? (
                        <div className="error-message">{errors.brokerage}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="bx--modal-footer modal-custome-footer">
                    <button
                      tabindex="0"
                      className="bx--btn bx--btn--secondary"
                      type="button"
                      onClick={this.closeModal}
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
        </SellerModal>
      </Sidebar>
    );
  }
}

export default BrokerIndex;
