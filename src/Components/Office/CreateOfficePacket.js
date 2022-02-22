import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
import { connect } from "react-redux";
import { getRoughPrefrence } from "../../Actions/Rough";
import { getpacketSrNo } from "../../Actions/Office";
import moment from "moment";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  // officeIssueassigneName: Yup.string().required("*Assign Id is required"),
  // roughName: Yup.string().required("*Rough Name is required"),
  officeIssuecarat: Yup.string().required("*carat is required"),
  // officeIssuepiece: Yup.string().required("*Piece is required"),
  officeIssueprocessName: Yup.string().required("*Process Name is required"),
  officeIssueassigneName: Yup.string().required("*Assign Name is required"),
  officePaketcreateDate: Yup.string().required("*Date is required"),
  officeIssueRoughList: Yup.string().required("*Rough Id is required"),
  officeIssueOfficeList: Yup.string().required("*Select Office Id"),
});
class CreateOfficePacket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      officeIdList: [],
      officeItems: [],
      srno: 0,
      remaining: 0,
    };
  }

  handelSubmit = (value) => {
    const data = {
      office_id: value.officeIssueOfficeList.id,
      packet_status: value.officeIssueprocessName,
      return: false,
      manager_name: value.officeIssueassigneName,
      issueCarat: value.officeIssuecarat,
      assign_date: moment(value.officePaketcreateDate, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),
    };
    console.log("CreateOfficePacket -> handelSubmit -> data", data);
    this.props.close();
    this.props.handleCreateSubpacket(data);
  };

  handelChangeRough = (data) => {
    // console.log("CreateOfficePacket -> handelChangeRough -> data", data);
    // this.props.roughOnChange(data.id);
    this.props
      .getRoughPrefrence({ roughId: data === null ? 0 : data.id })
      .then((res) => {
        console.log("CreateOfficePacket -> handelChangeRough -> res", res);
        this.setState({
          officeIdList: res.commonGet.officeDetails,
        });
      })
      .catch((e) => console.log(e));
  };

  handleOfficeSrno = (data) => {
    const remaining = this.state.officeIdList.find(
      (value) => data.id === value._id
    );
    // this.props.roughOnChange(data.id);
    this.props
      .getpacketSrNo({ officeId: data === null ? 0 : data.id })
      .then((res) => {
        console.log("CreateOfficePacket -> handleOfficeSrno -> res", res);
        this.setState({
          srno: res.packetSrNo[0].packetNo,
          remaining: remaining.copyCarat,
        });
      })
      .catch((e) => console.log(e));
  };

  render() {
    let items = [];
    this.props.caratList.map((value) =>
      items.push({ id: value._id, label: value.carat.toString() })
    );
    let officeItem = [];
    this.state.officeIdList.map((value) =>
      officeItem.push({
        id: value._id,
        label: value.office_total_carat
          ? value.office_total_carat.toString()
          : "no Data",
      })
    );
    // console.log("SAdasassadasdas------------------------>", this.props.data);
    return (
      <div style={{ marginBottom: "15%" }}>
        <Formik
          initialValues={{
            officeIssueassigneName: "",
            // roughName: "",
            officeIssuecarat: "",
            // officeIssuepiece: "",
            officeIssueprocessName: "",
            // officeIssueassigneName: "",
            officePaketcreateDate: "",
            officeIssueRoughList: "",
            officeIssueOfficeList: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            console.log("AddRoughModal -> render -> values", values);
            this.handelSubmit(values);

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
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeIssueRoughList &&
                      errors.officeIssueRoughList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueRoughList"
                    selectedItem={values.officeIssueRoughList}
                    value={values.officeIssueRoughList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="office-rough-list-issue"
                    items={items}
                    label="Select Rough"
                    light
                    onChange={(select) => {
                      setFieldValue(
                        "officeIssueRoughList",
                        select.selectedItem
                      );
                      this.handelChangeRough(select.selectedItem);
                      // this.props.roughOnChange(
                      //   select.selectedItem ? select.selectedItem.id : 0
                      // );
                      // this.props.selectedId(select.selectedItem.id);
                      // this.handelSelectedId(
                      //   select.selectedItem ? select.selectedItem.id : 0
                      // );
                    }}
                    titleText="Rough"
                    type="default"
                  />
                  {touched.officeIssueRoughList &&
                  errors.officeIssueRoughList ? (
                    <div className="error-message">
                      {errors.officeIssueRoughList}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeIssueOfficeList &&
                      errors.officeIssueOfficeList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueOfficeList"
                    selectedItem={values.officeIssueOfficeList}
                    value={values.officeIssueOfficeList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-buyer-name"
                    items={officeItem}
                    label="Select Office Packet"
                    light
                    onChange={(select) => {
                      setFieldValue(
                        "officeIssueOfficeList",
                        select.selectedItem
                      );
                      this.handleOfficeSrno(select.selectedItem);
                      // this.props.selectedId(select.selectedItem.id);
                      // this.handelSelectedId(
                      //   select.selectedItem ? select.selectedItem.id : 0
                      // );
                    }}
                    titleText="Office Packet"
                    type="default"
                  />
                  {touched.officeIssueOfficeList &&
                  errors.officeIssueOfficeList ? (
                    <div className="error-message">
                      {errors.officeIssueOfficeList}
                    </div>
                  ) : null}
                </div>
                <h5 className="h5-form-label">
                  Packet No :{" "}
                  <span style={{ color: "#0F61FD" }}>{this.state.srno}</span>
                </h5>
              </div>
              <div className="bx--row top-margin-model-input">
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

                      setFieldValue("officePaketcreateDate", formateDate);
                    }}
                    id="office-packet-create-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
                    className={
                      touched.officePaketcreateDate &&
                      errors.officePaketcreateDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="office-packet-id"
                    name="officePaketcreateDate"
                    value={values.officePaketcreateDate}
                    onBlur={handleBlur}
                  />
                  {touched.officePaketcreateDate &&
                  errors.officePaketcreateDate ? (
                    <div className="error-message">
                      {errors.officePaketcreateDate}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeIssueassigneName &&
                      errors.officeIssueassigneName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueassigneName"
                    selectedItem={values.officeIssueassigneName}
                    value={values.officeIssueassigneName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-assignee-id"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Select Assign id"
                    light
                    onChange={(select) =>
                      setFieldValue(
                        "officeIssueassigneName",
                        select.selectedItem
                      )
                    }
                    titleText="Assign id"
                    type="default"
                  />
                  {touched.officeIssueassigneName &&
                  errors.officeIssueassigneName ? (
                    <div className="error-message">
                      {errors.officeIssueassigneName}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
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
                {/* <div className="bx--col-md-3"></div> */}
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.officeIssuecarat && errors.officeIssuecarat
                        ? "error"
                        : "bx--col"
                    }
                    name="officeIssuecarat"
                    value={values.officeIssuecarat}
                    id="office-packet-carat"
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
                  {touched.officeIssuecarat && errors.officeIssuecarat ? (
                    <div className="error-message">
                      {errors.officeIssuecarat}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeIssueprocessName &&
                      errors.officeIssueprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueprocessName"
                    selectedItem={values.officeIssueprocessName}
                    value={values.officeIssueprocessName}
                    direction="top"
                    // itemToString={(item) => (item ? item.text : "")}
                    id="process-name-office"
                    items={["sawing", "chapka"]}
                    label="Select Process name"
                    light
                    onChange={(select) =>
                      setFieldValue(
                        "officeIssueprocessName",
                        select.selectedItem
                      )
                    }
                    titleText="Process Name"
                    type="default"
                  />
                  {touched.officeIssueprocessName &&
                  errors.officeIssueprocessName ? (
                    <div className="error-message">
                      {errors.officeIssueprocessName}
                    </div>
                  ) : null}
                  {/* <TextField
                    className={
                      touched.officeIssuepiece && errors.officeIssuepiece
                        ? "error"
                        : "bx--col"
                    }
                    name="officeIssuepiece"
                    value={values.officeIssuepiece}
                    id="office-packet-officeIssuepiece"
                    placeholder="enter Piece here"
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
                  {touched.officeIssuepiece && errors.officeIssuepiece ? (
                    <div className="error-message">
                      {errors.officeIssuepiece}
                    </div>
                  ) : null} */}
                </div>
                <p style={{ display: "grid" }}>
                  Available Carat :{" "}
                  <span style={{ color: "#DA1E28" }}>
                    {this.state.remaining}
                  </span>
                </p>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3"></div>
                <div className="bx--col-md-3">
                  {/* <DropDownSelection
                    className={
                      touched.officeIssueassigneName && errors.officeIssueassigneName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueassigneName"
                    selectedItem={values.officeIssueassigneName}
                    value={values.officeIssueassigneName}
                    direction="top"
                    // itemToString={(item) => (item ? item.text : "")}
                    id="employee-name-office"
                    items={[
                      "Nmat1",
                      "Vinod2",
                      "Yash3",
                      "Loremipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Pachi5",
                      "bhuro6",
                    ]}
                    label="Select Assigne name"
                    light
                    onChange={(select) =>
                      setFieldValue("officeIssueassigneName", select.selectedItem)
                    }
                    titleText="Assigne Name"
                    type="default"
                  />
                  {touched.officeIssueassigneName && errors.officeIssueassigneName ? (
                    <div className="error-message">{errors.officeIssueassigneName}</div>
                  ) : null} */}
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
const mapStateToProps = (state) => ({ ...state.Test });

export default connect(mapStateToProps, { getRoughPrefrence, getpacketSrNo })(
  CreateOfficePacket
);
