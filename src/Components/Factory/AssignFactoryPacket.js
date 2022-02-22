import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  factoryAssignRoughId: Yup.string().required("*Rough id is required"),
  factoryAssignPacketId: Yup.string().required("*Packet id is required"),
  factoryAssignAssignName: Yup.string().required("*Assigne Name is required"),
  factoryAssignprocessName: Yup.string().required("*Process Name is required"),
  factoryAssignCarat: Yup.string().required("*carat Name is required"),
  factoryAssignpcs: Yup.string().required("*Piece is required"),
  factoryPaketcreateDate: Yup.string().required("*Date is required"),
});
class AssignSubPacket extends Component {
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
            factoryAssignRoughId: "",
            factoryAssignPacketId: "",
            factoryAssignAssignName: "",
            factoryAssignprocessName: "",
            factoryAssignCarat: "",
            factoryAssignpcs: "",
            factoryPaketcreateDate: "",
            factoryPacketPurity: "",
            assignFactroryPacketSize: "",
            assignFactroryPacketYeild: "",
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
              <div className="assign-headding-wrapper">
                <h5 className="h5-form-label">
                  Packet Id : <span style={{ color: "#0F61FD" }}>#PID001</span>
                </h5>
                <h5 className="h5-form-label">
                  Total Carat : <span style={{ color: "#0F61FD" }}>650.00</span>
                </h5>
                <h5 className="h5-form-label">
                  Remaining Carat :{" "}
                  <span style={{ color: "#E7301C" }}>#AID001</span>
                </h5>
              </div>
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
                      setFieldValue("factoryPaketcreateDate", formateDate);
                    }}
                    id="factory-packet-Assign-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
                    className={
                      touched.factoryPaketcreateDate &&
                      errors.factoryPaketcreateDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="factory-assign-packet-id"
                    name="factoryPaketcreateDate"
                    value={values.factoryPaketcreateDate}
                    onBlur={handleBlur}
                  />
                  {touched.factoryPaketcreateDate &&
                  errors.factoryPaketcreateDate ? (
                    <div className="error-message">
                      {errors.factoryPaketcreateDate}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.factoryAssignRoughId &&
                      errors.factoryAssignRoughId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryAssignRoughId"
                    selectedItem={values.factoryAssignRoughId}
                    value={values.factoryAssignRoughId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-assign-rough-id"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Select Rough id"
                    light
                    onChange={(select) =>
                      setFieldValue("factoryAssignRoughId", select.selectedItem)
                    }
                    titleText="Rough Id"
                    type="default"
                  />
                  {touched.factoryAssignRoughId &&
                  errors.factoryAssignRoughId ? (
                    <div className="error-message">
                      {errors.factoryAssignRoughId}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  {/* <DropDownSelection
                    className={
                      touched.roughName && errors.roughName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="roughName"
                    selectedItem={values.roughName}
                    value={values.roughName}
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
                    label="Select Rough name"
                    light
                    onChange={(select) =>
                      setFieldValue("roughName", select.selectedItem)
                    }
                    titleText="Rough Name"
                    type="default"
                  />
                  {touched.roughName && errors.roughName ? (
                    <div className="error-message">{errors.roughName}</div>
                  ) : null} */}
                </div>
                {/* <div className="bx--col-md-4"></div> */}
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.factoryAssignPacketId &&
                      errors.factoryAssignPacketId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryAssignPacketId"
                    selectedItem={values.factoryAssignPacketId}
                    value={values.factoryAssignPacketId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-assignee-packet-id"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Select Packet id"
                    light
                    onChange={(select) =>
                      setFieldValue(
                        "factoryAssignPacketId",
                        select.selectedItem
                      )
                    }
                    titleText="Packet id"
                    type="default"
                  />
                  {touched.factoryAssignPacketId &&
                  errors.factoryAssignPacketId ? (
                    <div className="error-message">
                      {errors.factoryAssignPacketId}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.factoryAssignprocessName &&
                      errors.factoryAssignprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryAssignprocessName"
                    selectedItem={values.factoryAssignprocessName}
                    value={values.factoryAssignprocessName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="process-assign-name-factory"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Select Process name"
                    light
                    onChange={(select) =>
                      setFieldValue(
                        "factoryAssignprocessName",
                        select.selectedItem
                      )
                    }
                    titleText="Process Name"
                    type="default"
                  />
                  {touched.factoryAssignprocessName &&
                  errors.factoryAssignprocessName ? (
                    <div className="error-message">
                      {errors.factoryAssignprocessName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.factoryAssignAssignName &&
                      errors.factoryAssignAssignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryAssignAssignName"
                    selectedItem={values.factoryAssignAssignName}
                    value={values.factoryAssignAssignName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="fatory-assign-assign-name"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Select Assignee name"
                    light
                    onChange={(select) =>
                      setFieldValue(
                        "factoryAssignAssignName",
                        select.selectedItem
                      )
                    }
                    titleText="Assignee Name"
                    type="default"
                  />
                  {touched.factoryAssignAssignName &&
                  errors.factoryAssignAssignName ? (
                    <div className="error-message">
                      {errors.factoryAssignAssignName}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.factoryAssignCarat && errors.factoryAssignCarat
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryAssignCarat"
                    value={values.factoryAssignCarat}
                    id="factoryAssignCarat"
                    placeholder="enter Carat here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Carat :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.factoryAssignCarat && errors.factoryAssignCarat ? (
                    <div className="error-message">
                      {errors.factoryAssignCarat}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.factoryAssignpcs && errors.factoryAssignpcs
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryAssignpcs"
                    value={values.factoryAssignpcs}
                    id="factoryAssignpcs"
                    placeholder="enter Pcs here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Piece :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.factoryAssignpcs && errors.factoryAssignpcs ? (
                    <div className="error-message">
                      {errors.factoryAssignpcs}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.factoryPacketPurity && errors.factoryPacketPurity
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryPacketPurity"
                    selectedItem={values.factoryPacketPurity}
                    value={values.factoryPacketPurity}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="fatory-Assign-purity"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Select Purity"
                    light
                    onChange={(select) =>
                      setFieldValue("factoryPacketPurity", select.selectedItem)
                    }
                    titleText="Purity"
                    type="default"
                  />
                  {touched.factoryPacketPurity && errors.factoryPacketPurity ? (
                    <div className="error-message">
                      {errors.factoryPacketPurity}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.assignFactroryPacketSize &&
                      errors.assignFactroryPacketSize
                        ? "error"
                        : "bx--col"
                    }
                    name="assignFactroryPacketSize"
                    value={values.assignFactroryPacketSize}
                    id="assignFactroryPacketSize"
                    placeholder="enter Size here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Size :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    // required
                    type="number"
                  />
                  {touched.assignFactroryPacketSize &&
                  errors.assignFactroryPacketSize ? (
                    <div className="error-message">
                      {errors.assignFactroryPacketSize}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.assignFactroryPacketYeild &&
                      errors.assignFactroryPacketYeild
                        ? "error"
                        : "bx--col"
                    }
                    name="assignFactroryPacketYeild"
                    value={values.assignFactroryPacketYeild}
                    id="assignFactroryPacketYeild"
                    placeholder="enter Yeild here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Yeild :"
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    // required
                    type="number"
                  />
                  {touched.assignFactroryPacketYeild &&
                  errors.assignFactroryPacketYeild ? (
                    <div className="error-message">
                      {errors.assignFactroryPacketYeild}
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

export default AssignSubPacket;
