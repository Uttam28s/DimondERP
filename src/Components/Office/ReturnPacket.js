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
import { getpacketSrNo, getOfficeSubList } from "../../Actions/Office";
import moment from "moment";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  officeReturnpacketId: Yup.string().required("*Packet Id is required"),
  // roughName: Yup.string().required("*Rough Name is required"),
  // officeReturncarat: Yup.string().required("*carat is required"),
  // officeReturnpiece: Yup.string().required("*Piece is required"),
  // officeReturnprocessName: Yup.string().required("*Process Name is required"),
  officeReturnDate: Yup.string().required("*Date is required"),
  officeReturnRoughList: Yup.string().required("*Rough Id is required"),
  officeReturnOfficeList: Yup.string().required("*Select Office Id"),
});
class ReturnOfficePacket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      officeIdList: [],
      officeItems: [],
      packetId: [],
      packetdetail: {},
      packetCarat: "",
      packetType: "",
      officeSelected: "",
    };
  }

  handelSubmit = (value) => {
    const data = {
      packet_id: value.officeReturnpacketId.id,
      office_id: value.officeReturnOfficeList.id,
      packet_status: value.officeReturnprocessName || this.state.packetType,
      return: true,
      returnCarat: value.officeReturncarat || this.state.packetCarat,
      returnDate: moment(value.officeReturnDate, "DD-MM-YYYY").format(
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
        // const officeSelected =
        //   res.commonGet.officeDetails[res.commonGet.officeDetails.length - 1]
        //     .office_total_carat;
        this.setState({
          officeIdList: res.commonGet.officeDetails,
          // officeSelected: officeSelected.toString(),
        });
      })
      .catch((e) => console.log(e));
  };

  handleOfficeSrno = (data) => {
    // this.props.roughOnChange(data.id);
    this.props
      .getpacketSrNo({ officeId: data === null ? 0 : data.id, srno: true })
      .then((res) => {
        console.log("CreateOfficePacket -> handleOfficeSrno -> res", res);
        this.setState({
          packetId: res.packetSrNo,
        });
      })
      .catch((e) => console.log(e));
  };

  handlePacketDetails = (data) => {
    console.log("ReturnOfficePacket -> handlePacketDetails -> data", data);
    this.props
      .getOfficeSubList({ packetId: data === null ? 0 : data.id })
      .then((res) => {
        console.log("ReturnOfficePacket -> handlePacketDetails -> res", res);
        this.setState({
          packetCarat:
            res.packetdetail.chapka_issueCarat ||
            res.packetdetail.sawing_issueCarat,
          packetType: res.packetdetail.type,
        });
      })
      .catch((e) => console.log(e));
  };

  // handelOnChange = (e) => {
  //   console.log("AddRoughModal -> handelOnChange -> e", e.target);
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

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
    let srnoList = [];
    this.state.packetId.map((value) =>
      srnoList.push({ id: value._id, label: value.srno.toString() })
    );
    return (
      <div style={{ marginBottom: "15%" }}>
        <Formik
          initialValues={{
            officeReturnpacketId: "",
            // roughName: "",
            officeReturncarat: this.state.packetCarat,
            // officeReturnpiece: "",
            officeReturnprocessName: this.state.packetType,
            officeReturnDate: "",
            officeReturnRoughList: "",
            officeReturnOfficeList: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            console.log("AddRoughModal -> render -> values", values);
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
              {/* <h5 className="h5-form-label">
                Packet Id : <span style={{ color: "#0F61FD" }}>#PID001</span>
              </h5> */}
              <div className="bx--row">
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeReturnRoughList &&
                      errors.officeReturnRoughList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnRoughList"
                    selectedItem={values.officeReturnRoughList}
                    value={values.officeReturnRoughList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="office-rough-list-issue"
                    items={items}
                    label="Select Rough"
                    light
                    onChange={(select) => {
                      setFieldValue(
                        "officeReturnRoughList",
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
                  {touched.officeReturnRoughList &&
                  errors.officeReturnRoughList ? (
                    <div className="error-message">
                      {errors.officeReturnRoughList}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeReturnOfficeList &&
                      errors.officeReturnOfficeList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnOfficeList"
                    selectedItem={
                      values.officeReturnOfficeList || this.state.officeSelected
                    }
                    value={values.officeReturnOfficeList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-buyer-name"
                    items={officeItem}
                    label="Select Office Packet"
                    light
                    onChange={(select) => {
                      setFieldValue(
                        "officeReturnOfficeList",
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
                  {touched.officeReturnOfficeList &&
                  errors.officeReturnOfficeList ? (
                    <div className="error-message">
                      {errors.officeReturnOfficeList}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeReturnpacketId &&
                      errors.officeReturnpacketId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnpacketId"
                    selectedItem={values.officeReturnpacketId}
                    value={values.officeReturnpacketId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="return-packet-id"
                    items={srnoList}
                    label="Select Packet id"
                    light
                    onChange={(select) => {
                      setFieldValue(
                        "officeReturnpacketId",
                        select.selectedItem
                      );
                      this.handlePacketDetails(select.selectedItem);
                    }}
                    titleText="Packet id"
                    type="default"
                  />
                  {touched.officeReturnpacketId &&
                  errors.officeReturnpacketId ? (
                    <div className="error-message">
                      {errors.officeReturnpacketId}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <TextField
                    className={
                      touched.officeReturncarat && errors.officeReturncarat
                        ? "error"
                        : "bx--col"
                    }
                    name="officeReturncarat"
                    value={values.officeReturncarat || this.state.packetCarat}
                    id="return-office-packet-carat"
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
                  {touched.officeReturncarat && errors.officeReturncarat ? (
                    <div className="error-message">
                      {errors.officeReturncarat}
                    </div>
                  ) : null}
                </div>

                <p style={{ display: "grid" }}>
                  Wight lose : <span style={{ color: "#DA1E28" }}>00.00</span>
                </p>
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
                      setFieldValue("officeReturnDate", formateDate);
                    }}
                    id="retutn-office-packet-create-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
                    className={
                      touched.officeReturnDate && errors.officeReturnDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="return-office-packet-id"
                    name="officeReturnDate"
                    value={values.officeReturnDate}
                    onBlur={handleBlur}
                  />
                  {touched.officeReturnDate && errors.officeReturnDate ? (
                    <div className="error-message">
                      {errors.officeReturnDate}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-3">
                  <DropDownSelection
                    className={
                      touched.officeReturnprocessName &&
                      errors.officeReturnprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnprocessName"
                    selectedItem={
                      values.officeReturnprocessName || this.state.packetType
                    }
                    value={values.officeReturnprocessName}
                    direction="top"
                    // itemToString={(item) => (item ? item.text : "")}
                    id="return-process-name-office"
                    items={["sawing", "chapka"]}
                    label="Select Process name"
                    light
                    onChange={(select) =>
                      setFieldValue(
                        "officeReturnprocessName",
                        select.selectedItem
                      )
                    }
                    titleText="Process Name"
                    type="default"
                  />
                  {touched.officeReturnprocessName &&
                  errors.officeReturnprocessName ? (
                    <div className="error-message">
                      {errors.officeReturnprocessName}
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

const mapStateToProps = (state) => ({ ...state.Test });
export default connect(mapStateToProps, {
  getRoughPrefrence,
  getpacketSrNo,
  getOfficeSubList,
})(ReturnOfficePacket);
