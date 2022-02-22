import React, { Component } from "react";
import Sidebar from "../../Common/Sidebar";
import SellerDetailsPage from "../../Common/SellerDetailsPage";
import SellerModal from "../../Common/SellerModal";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, { DateSelection } from "../../Common/CommonComponents";

const validationSchema = Yup.object().shape({
  sellerConnectionDate: Yup.string().required("*Connection Date is required"),
  sellerName: Yup.string().required("*Name is required"),
  sellerLocation: Yup.string().required("*Add selere location is required"),
  sellerAddress: Yup.string().required("*Address is required"),
  sellerPhoneno: Yup.string()
    .required("*Phone no is required")
    .length(10, "Add Correct Number"),
  sellerCompanyName: Yup.string().required("*Company name no is required"),
});
class SellerIndex extends Component {
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
          button="Add Saller"
          title="Saller"
          handelAddData={this.handelAddDataModal}
        />
        <SellerModal
          modalName="Add new seller"
          open={this.state.model}
          close={this.closeModal}
        >
          <div style={{ marginBottom: "8%" }}>
            <Formik
              initialValues={{
                sellerConnectionDate: "",
                sellerName: "",
                sellerLocation: "India",
                sellerAddress: "",
                sellerPhoneno: "",
                sellerCompanyName: "",
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
                          setFieldValue("sellerConnectionDate", formateDate);
                        }}
                        id="seller-connection-date"
                        placeholder="dd/mm/yyyy"
                        labelText="Connection Date"
                        className={
                          touched.sellerConnectionDate &&
                          errors.sellerConnectionDate
                            ? "error"
                            : "bx--col"
                        }
                        dateid="seller-connection-id"
                        name="sellerConnectionDate"
                        value={values.sellerConnectionDate}
                        onBlur={handleBlur}
                      />
                      {touched.sellerConnectionDate &&
                      errors.sellerConnectionDate ? (
                        <div className="error-message">
                          {errors.sellerConnectionDate}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.sellerName && errors.sellerName
                            ? "error"
                            : "bx--col"
                        }
                        name="sellerName"
                        value={values.sellerName}
                        id="seller-name"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Seller Name :"
                        placeholder="Enter seller name here"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="text"
                      />
                      {touched.sellerName && errors.sellerName ? (
                        <div className="error-message">{errors.sellerName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="bx--row top-margin-model-input">
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.sellerLocation && errors.sellerLocation
                            ? "error"
                            : "bx--col"
                        }
                        name="sellerLocation"
                        value={values.sellerLocation}
                        id="seller-location"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="Seller Loction :"
                        placeholder="Enter location here"
                        light={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() {}}
                        required
                        type="text"
                      />
                      {touched.sellerLocation && errors.sellerLocation ? (
                        <div className="error-message">
                          {errors.sellerLocation}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.sellerAddress && errors.sellerAddress
                            ? "error"
                            : "bx--col"
                        }
                        name="sellerAddress"
                        value={values.sellerAddress}
                        id="seller-Address"
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
                      {touched.sellerAddress && errors.sellerAddress ? (
                        <div className="error-message">
                          {errors.sellerAddress}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="bx--row top-margin-model-input">
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.sellerPhoneno && errors.sellerPhoneno
                            ? "error"
                            : "bx--col"
                        }
                        name="sellerPhoneno"
                        value={values.sellerPhoneno}
                        id="seller-phoneNO"
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
                      {touched.sellerPhoneno && errors.sellerPhoneno ? (
                        <div className="error-message">
                          {errors.sellerPhoneno}
                        </div>
                      ) : null}
                    </div>
                    <div className="bx--col-md-4">
                      <TextField
                        className={
                          touched.sellerCompanyName && errors.sellerCompanyName
                            ? "error"
                            : "bx--col"
                        }
                        name="sellerCompanyName"
                        value={values.sellerCompanyName}
                        id="seller-company-name"
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
                      {touched.sellerCompanyName && errors.sellerCompanyName ? (
                        <div className="error-message">
                          {errors.sellerCompanyName}
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

export default SellerIndex;
