import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
import SellerDetailsPage from "../../Common/SellerDetailsPage";
import SellerModal from "../../Common/SellerModal";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, { DateSelection } from "../../Common/CommonComponents";

const validationSchema = Yup.object().shape({
  buyerConnectionDate: Yup.string().required("*Connection Date is required"),
  buyerName: Yup.string().required("*Name is required"),
  buyerLocation: Yup.string().required("*Add selere location is required"),
  buyerAddress: Yup.string().required("*Address is required"),
  buyerPhoneno: Yup.string()
    .required("*Phone no is required")
    .length(10, "Add Correct Number"),
  buyerCompanyName: Yup.string().required("*Company name no is required"),
});
class BuyerIndex extends Component {
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
          button="Add Buyer"
          title="Buyer"
          handelAddData={this.handelAddDataModal}
        />
        <SellerModal
          modalName="Add new Buyer"
          open={this.state.model}
          close={this.closeModal}
        >
          <div style={{ marginBottom: "8%" }}>
            <Formik
              initialValues={{
                buyerConnectionDate: "",
                buyerName: "",
                buyerLocation: "India",
                buyerAddress: "",
                buyerPhoneno: "",
                buyerCompanyName: "",
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
                          setFieldValue("buyerConnectionDate", formateDate);
                        }}
                        id="buyer-connection-date"
                        placeholder="dd/mm/yyyy"
                        labelText="Connection Date"
                        className={
                          touched.buyerConnectionDate &&
                          errors.buyerConnectionDate
                            ? "error"
                            : "bx--col"
                        }
                        dateid="buyer-connection-id"
                        name="buyerConnectionDate"
                        value={values.buyerConnectionDate}
                        onBlur={handleBlur}
                      />
                      {touched.buyerConnectionDate &&
                      errors.buyerConnectionDate ? (
                        <div className="error-message">
                          {errors.buyerConnectionDate}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.buyerName && errors.buyerName
                            ? "error"
                            : "bx--col"
                        }
                        name="buyerName"
                        value={values.buyerName}
                        id="buyer-name"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Buyer Name :"
                        placeholder="Enter buyer name here"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="text"
                      />
                      {touched.buyerName && errors.buyerName ? (
                        <div className="error-message">{errors.buyerName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="bx--row top-margin-model-input">
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.buyerLocation && errors.buyerLocation
                            ? "error"
                            : "bx--col"
                        }
                        name="buyerLocation"
                        value={values.buyerLocation}
                        id="buyer-location"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Buyer Loction :"
                        placeholder="Enter location here"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="text"
                      />
                      {touched.buyerLocation && errors.buyerLocation ? (
                        <div className="error-message">
                          {errors.buyerLocation}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.buyerAddress && errors.buyerAddress
                            ? "error"
                            : "bx--col"
                        }
                        name="buyerAddress"
                        value={values.buyerAddress}
                        id="buyer-Address"
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
                      {touched.buyerAddress && errors.buyerAddress ? (
                        <div className="error-message">
                          {errors.buyerAddress}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="bx--row top-margin-model-input">
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.buyerPhoneno && errors.buyerPhoneno
                            ? "error"
                            : "bx--col"
                        }
                        name="buyerPhoneno"
                        value={values.buyerPhoneno}
                        id="buyer-phoneNO"
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
                      {touched.buyerPhoneno && errors.buyerPhoneno ? (
                        <div className="error-message">
                          {errors.buyerPhoneno}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.buyerCompanyName && errors.buyerCompanyName
                            ? "error"
                            : "bx--col"
                        }
                        name="buyerCompanyName"
                        value={values.buyerCompanyName}
                        id="buyer-company-name"
                        placeholder="Enter compnay name here"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Comapny Name :"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="text"
                      />
                      {touched.buyerCompanyName && errors.buyerCompanyName ? (
                        <div className="error-message">
                          {errors.buyerCompanyName}
                        </div>
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

export default BuyerIndex;
