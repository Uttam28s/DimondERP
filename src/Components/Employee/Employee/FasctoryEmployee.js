import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../../Common/CommonComponents";
import { Add32 } from "@carbon/icons-react";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  employeeFieldArea: Yup.string().required("*Rough id is required"),
  employeePosition: Yup.string().required("*Assigne Name is required"),
  employeeName: Yup.string().required("*Process Name is required"),
  employeePhoneno: Yup.string().required("*carat Name is required"),
  salaryType: Yup.string().required("*Piece is required"),
});
class FasctoryEmployee extends Component {
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
            employeeFieldArea: "",
            employeePosition: "",
            employeeName: "",
            employeePhoneno: "",
            salaryType: "",
            employeeAddDate: "",
            salaryAmount: "",
            employeePatlaRate: "",
            employeeJadaRate: "",
            aadharcardNo: "",
            employeepanNo: "",
            employeebankName: "",
            employeeaccountNo: "",
            employeeAddress: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            console.log("AddEmployee -> render -> values", values);
            this.props.close();
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
                      setFieldValue("employeeAddDate", formateDate);
                    }}
                    id="employee-add-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
                    className={
                      touched.employeeAddDate && errors.employeeAddDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="employee-add-id"
                    name="employeeAddDate"
                    value={values.employeeAddDate}
                    onBlur={handleBlur}
                  />
                  {touched.employeeAddDate && errors.employeeAddDate ? (
                    <div className="error-message">
                      {errors.employeeAddDate}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.employeeFieldArea && errors.employeeFieldArea
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="employeeFieldArea"
                    selectedItem={values.employeeFieldArea}
                    value={values.employeeFieldArea}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-assignee-id"
                    items={["Factory", "Office"]}
                    label="Select Area Fileld"
                    light
                    onChange={(select) =>
                      setFieldValue("employeeFieldArea", select.selectedItem)
                    }
                    titleText="Area Fileld"
                    type="default"
                  />
                  {touched.employeeFieldArea && errors.employeeFieldArea ? (
                    <div className="error-message">
                      {errors.employeeFieldArea}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.employeeName && errors.employeeName
                        ? "error"
                        : "bx--col"
                    }
                    name="employeeName"
                    value={values.employeeName}
                    id="employeeName"
                    placeholder="Enter Name here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Name :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="text"
                  />
                  {touched.employeeName && errors.employeeName ? (
                    <div className="error-message">{errors.employeeName}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.employeePosition && errors.employeePosition
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="employeePosition"
                    selectedItem={values.employeePosition}
                    value={values.employeePosition}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-name-office"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Positions"
                    light
                    onChange={(select) =>
                      setFieldValue("employeePosition", select.selectedItem)
                    }
                    titleText="Positions"
                    type="default"
                  />
                  {touched.employeePosition && errors.employeePosition ? (
                    <div className="error-message">
                      {errors.employeePosition}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-1">
                  <Add32 />
                </div>
                {/* <div className="bx--col-md-4"></div> */}
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.employeePhoneno && errors.employeePhoneno
                        ? "error"
                        : "bx--col"
                    }
                    name="employeePhoneno"
                    value={values.employeePhoneno}
                    id="employeePhoneno"
                    placeholder="Enter Name here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Name :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.employeePhoneno && errors.employeePhoneno ? (
                    <div className="error-message">
                      {errors.employeePhoneno}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.employeeAddress && errors.employeeAddress
                        ? "error"
                        : "bx--col"
                    }
                    name="employeeAddress"
                    value={values.employeeAddress}
                    id="employeeAddress"
                    placeholder="Enter Address here"
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
                  {touched.employeeAddress && errors.employeeAddress ? (
                    <div className="error-message">
                      {errors.employeeAddress}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-2">
                  <DropDownSelection
                    className={
                      touched.salaryType && errors.salaryType
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="salaryType"
                    selectedItem={values.salaryType}
                    value={values.salaryType}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="salary-type"
                    items={["Fixed", "Static"]}
                    label="Select Salary Type"
                    light
                    onChange={(select) =>
                      setFieldValue("salaryType", select.selectedItem)
                    }
                    titleText="Salary Type"
                    type="default"
                  />
                  {touched.salaryType && errors.salaryType ? (
                    <div className="error-message">{errors.salaryType}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-2">
                  <TextField
                    className={
                      touched.salaryAmount && errors.salaryAmount
                        ? "error"
                        : "bx--col"
                    }
                    name="salaryAmount"
                    value={values.salaryAmount}
                    id="salaryAmount"
                    placeholder="Enter Salary Amount"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Amount :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.salaryAmount && errors.salaryAmount ? (
                    <div className="error-message">{errors.salaryAmount}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-2">
                  <TextField
                    className={
                      touched.employeePatlaRate && errors.employeePatlaRate
                        ? "error"
                        : "bx--col"
                    }
                    name="employeePatlaRate"
                    value={values.employeePatlaRate}
                    id="employeePatlaRate"
                    placeholder="Enter patla rate"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Patla[Rate] :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.employeePatlaRate && errors.employeePatlaRate ? (
                    <div className="error-message">
                      {errors.employeePatlaRate}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-2">
                  <TextField
                    className={
                      touched.employeeJadaRate && errors.employeeJadaRate
                        ? "error"
                        : "bx--col"
                    }
                    name="employeeJadaRate"
                    value={values.employeeJadaRate}
                    id="employeeJadaRate"
                    placeholder="Enter Jada rate"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Jada[Rate] :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.employeeJadaRate && errors.employeeJadaRate ? (
                    <div className="error-message">
                      {errors.employeeJadaRate}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.aadharcardNo && errors.aadharcardNo
                        ? "error"
                        : "bx--col"
                    }
                    name="aadharcardNo"
                    value={values.aadharcardNo}
                    id="aadharcardNo"
                    placeholder="Enter Aadharcard No"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="AadharCard no:"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.aadharcardNo && errors.aadharcardNo ? (
                    <div className="error-message">{errors.aadharcardNo}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.employeepanNo && errors.employeepanNo
                        ? "error"
                        : "bx--col"
                    }
                    name="employeepanNo"
                    value={values.employeepanNo}
                    id="employeepanNo"
                    placeholder="enter Pan no here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Pan No :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.employeepanNo && errors.employeepanNo ? (
                    <div className="error-message">{errors.employeepanNo}</div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.employeebankName && errors.employeebankName
                        ? "error"
                        : "bx--col"
                    }
                    name="employeebankName"
                    value={values.employeebankName}
                    id="employeebankName"
                    placeholder="enter bank name here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Bank name :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="text"
                  />
                  {touched.employeebankName && errors.employeebankName ? (
                    <div className="error-message">
                      {errors.employeebankName}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.employeeaccountNo && errors.employeeaccountNo
                        ? "error"
                        : "bx--col"
                    }
                    name="employeeaccountNo"
                    value={values.employeeaccountNo}
                    id="employeeaccountNo"
                    placeholder="enter bank account no"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Account no :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    // required
                    type="number"
                  />
                  {touched.employeeaccountNo && errors.employeeaccountNo ? (
                    <div className="error-message">
                      {errors.employeeaccountNo}
                    </div>
                  ) : null}
                </div>
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

export default FasctoryEmployee;
