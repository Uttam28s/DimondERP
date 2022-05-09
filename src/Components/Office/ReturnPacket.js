import React, {Component} from "react";
import {Form} from "carbon-components-react";
import {Formik} from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
import {connect} from "react-redux";
import {getRoughPrefrence} from "../../Actions/Rough";
import {getpacketSrNo, getOfficeSubList} from "../../Actions/Office";
import moment from "moment";
import {ThisSideUp16} from "@carbon/icons-react";
import {toFixed4} from "../Common/helperFun";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";
import ReactDataSheet from 'react-datasheet';
import {Button} from "carbon-components-react";
import "react-datasheet/lib/react-datasheet.css";

const validationSchema = Yup.object().shape({
  officeReturnpacketId: Yup.string().required("*Packet Id is required"),
  // roughName: Yup.string().required("*Rough Name is required"),
  officeReturncarat: Yup.string().required("*carat is required"),
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
      toggle: false,
      preSelectedData: "",
      preDefinedData: "",
    };
  }

  componentDidMount = () => {
    console.log('preSelectedData', this.props.preSelectedData,this.props.preDefinedData)
    if (this.props.preSelectedData) {
      this.setState({ preSelectedData: this.props.preSelectedData });
    }
    else if (this.props.preDefinedData){
      this.setState({ preDefinedData: this.props.preDefinedData });
    }
  }

  handelSubmit = (value) => {
    const data = {
      packet_id: value.officeReturnpacketId.id,
      office_id: value.officeReturnOfficeList.id,
      weightLoss: value.weightLoss,
      packet_status: this.state.packetType,
      return: true,
      returnCarat: value.officeReturncarat || this.state.packetCarat,
      returnDate: moment(value.officeReturnDate, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),
    };
    console.log("CreateOfficePacket -> handelSubmit -> data", data);
    // this.props.close();
    this.props.handleCreateSubpacket(data);
  };

  handelChangeRough = (data) => {
    // console.log("CreateOfficePacket -> handelChangeRough -> data", data);
    // this.props.roughOnChange(data.id);
    this.props
      .getRoughPrefrence({roughId: data === null ? 0 : data.id})
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
      .getpacketSrNo({officeId: data === null ? 0 : data.id, srno: true})
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
      .getOfficeSubList({packetId: data === null ? 0 : data.id})
      .then((res) => {
          // console.log("ReturnOfficePacket -> handlePacketDetails -> res", res.packetdetail.packet_name);
        this.setState({
          packetCarat:
            res.packetdetail.chapka_issueCarat ||
            res.packetdetail.sawing_issueCarat,
          packetType: res.packetdetail.type,
        });
      })
      .catch((e) => console.log(e));
  };

  clearField = (func, data) => {
    data.map((val) => {func(val, "")})
    this.setState({packetCarat: ""})
  }

  render() {
    const {preSelectedData, preDefinedData} = this.props

    let items = [];
    this.props.caratList.map((value) =>
      items.push({id: value._id, label: value.carat.toString()})
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
      srnoList.push({id: value._id, label: value.srno.toString()})
    );
    return (
      <div style={{marginBottom: "1%"}}>
        <Formik
          initialValues={{
            officeStartInputValue: "",
            officeEndInputValue: "",
            officeReturnpacketId: preSelectedData?.srno || "",
            // roughName: "",
            officeReturncarat: (preSelectedData?.chapka_return_carat || preSelectedData?.sawing_return_carat) || this.state.packetCarat,
            // officeReturnpiece: "",
            officeReturnprocessName: preSelectedData?.type || this.state.packetType,
            officeReturnDate: ((preSelectedData?.chapka_return_date || preSelectedData?.sawing_return_date) && moment(preSelectedData?.chapka_return_date || preSelectedData?.sawing_return_date).format("DD/MM/YYYY")) || "",
            officeReturnRoughList: preDefinedData?.carat || "",
            officeReturnOfficeList: preDefinedData?.office_total_carat || "" ,
            weightLoss: "",
            carat: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, resetForm}) => {
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
            <div className={this.props.modelSheet === true ? "modelComponent" : ""}>
            <Form onSubmit={handleSubmit}>
              <div className="bx--row">
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeReturnRoughList &&
                        errors.officeReturnRoughList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnRoughList"
                    selectedItem={ preDefinedData?.carat ? { label: preDefinedData?.carat} : values.officeReturnRoughList}
                    value={values.officeReturnRoughList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="office-rough-list-issue"
                    items={items}
                    label="Select Rough"
                    disabled={preDefinedData?.carat ? true : false}
                    light
                    onChange={(select) => {
                      this.clearField(setFieldValue, ["officeReturnOfficeList", "officeReturnpacketId", "officeReturncarat"])
                      setFieldValue("officeReturnRoughList", select.selectedItem || "");
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeReturnOfficeList &&
                        errors.officeReturnOfficeList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnOfficeList"
                    selectedItem={
                      // values.officeReturnOfficeList || this.state.officeSelected
                      preDefinedData?.office_total_carat ? { label: preDefinedData?.office_total_carat } : values.officeReturnOfficeList
                    }
                    value={values.officeReturnOfficeList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-buyer-name"
                    items={officeItem}
                    label="Select Office Packet"
                    disabled={preDefinedData?.office_total_carat ? true : false}
                    light
                    onChange={(select) => {
                      setFieldValue("officeReturnOfficeList", select.selectedItem || "");
                      this.clearField(setFieldValue, ["officeReturnpacketId", "officeReturncarat"])
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
              
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeReturnpacketId &&
                        errors.officeReturnpacketId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnpacketId"
                    selectedItem={ preSelectedData?.srno ? {label:preSelectedData?.srno} : values.officeReturnpacketId}
                    value={values.officeReturnpacketId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="return-packet-id"
                    items={srnoList}
                    label="Select Packet id"
                    disabled={preSelectedData?.srno ? true : false}
                    light
                    onChange={(select) => {
                      setFieldValue("officeReturnpacketId", select.selectedItem || "");
                      this.clearField(setFieldValue, ["officeReturncarat"])
                      this.handlePacketDetails(select.selectedItem);
                    }}
                    titleText="Packet id"
                    type="default"
                  />
                  {console.log(values.officeReturnpacketId,"values.officeReturnpacketId")}
                  {touched.officeReturnpacketId &&
                    errors.officeReturnpacketId ? (
                    <div className="error-message">
                      {errors.officeReturnpacketId}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeReturnprocessName &&
                        errors.officeReturnprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnprocessName"
                    selectedItem={
                      (preSelectedData?.type ? preSelectedData?.type : (values.officeReturnprocessName || this.state.packetType))
                    }
                    value={values.officeReturnprocessName}
                    direction="top"
                    // itemToString={(item) => (item ? item.text : "")}
                    id="return-process-name-office"
                    items={[this.state.packetType]}
                    disabled={true}
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
                  {console.log(this.state.packetType,"packetType--====>")}
                  {touched.officeReturnprocessName &&
                    errors.officeReturnprocessName ? (
                    <div className="error-message">
                      {errors.officeReturnprocessName}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.officeReturncarat && errors.officeReturncarat
                        ? "error"
                        : "bx--col"
                    }
                    name="officeReturncarat"
                    value={values.officeReturncarat}
                    id="return-office-packet-carat"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Return Carat :"
                    placeholder="enter carat here"
                    light={true}
                    onChange={(e) => {
                      if (Number(e.target.value) <= Number(this.state.packetCarat) && Number(e.target.value) >= 0) {
                        handleChange(e)
                        this.setState({toggle: !this.state.toggle})
                      }
                    }}
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

                {this.props.modelSheet &&
                  <>
                    <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                      <TextField
                        className={
                          touched.officeStartInputValue && errors.officeStartInputValue
                            ? "error"
                            : "bx--col"
                        }
                        name="officeStartInputValue"
                        value={values.officeStartInputValue}
                        id="office-packet-officeStartInputValue"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="From :"
                        placeholder="enter number here"
                        light={true}
                        onChange={(e) => {
                          if (Number(e.target.value) >= 1) {
                            setFieldValue("officeStartInputValue", parseInt(e.target.value))
                            // this.setState({toggle: !this.state.toggle})
                          }
                        }}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() { }}
                        type="number"
                      />
                      {touched.officeStartInputValue && errors.officeStartInputValue ? (
                        <div className="error-message">
                          {errors.officeStartInputValue}
                        </div>
                      ) : null}
                    {console.log(values.officeStartInputValue,"from value")}
                    </div>

                    <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                      <TextField
                        className={
                          touched.officeEndInputValue && errors.officeEndInputValue
                            ? "error"
                            : "bx--col"
                        }
                        name="officeEndInputValue"
                        value={values.officeEndInputValue}
                        id="office-packet-officeEndInputValue"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="To :"
                        placeholder="enter number here"
                        light={true}
                        onChange={(e) => {
                          if (Number(e.target.value) >= 0) {
                            setFieldValue("officeEndInputValue", parseInt(e.target.value))
                            // this.setState({toggle: !this.state.toggle})
                          }
                        }}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() { }}
                        type="number"
                      />
                      {touched.officeEndInputValue && errors.officeEndInputValue ? (
                        <div className="error-message">
                          {errors.officeEndInputValue}
                        </div>
                      ) : null}
                      {console.log(values.officeEndInputValue,"To value")}
                    </div>

                    <div className="bx--col-md-2">
                      <Button
                        size="small"
                        style={{ marginTop:"24px"}}
                        // onClick={this.props.openSheet}
                        onClick={() => {this.props.openSheet(values.officeStartInputValue,values.officeEndInputValue)}}
                        disabled={values.officeEndInputValue <= values.officeStartInputValue  ? true : false}
                      >
                        Manage DataSheet
                      </Button>
                    </div>
                  </>
                }

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
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
                    labelText="Return rough Date"
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
             
                <p style={{display: "grid"}} className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  Packet Carat
                  <span style={{color: "#DA1E28"}}>
                    {( (preSelectedData?.chapka_issueCarat || preSelectedData?.sawing_issueCarat) || 0) || (this.state.packetCarat || 0)}
                    {/* {this.state.packetCarat || 0} */}
                  </span>
                </p>
                <p style={{display: "grid"}} className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  Wight lose
                  <span style={{color: "#DA1E28"}}>
                    {/* {toFixed4(((( (preSelectedData.chapka_issueCarat || 0) || (this.state?.packetCarat || 0) ) - (values?.officeReturncarat || 0)) / ( (preSelectedData.chapka_issueCarat || 1) || (this.state.packetCarat || 1) )) * 100) || 0}% */}
                    {toFixed4((( (this.state?.packetCarat || 0)  - (values?.officeReturncarat || 0)) / (this.state.packetCarat || 1) ) * 100) || 0}%
                  </span>
                </p>
               
                <div className={this.props.modelSheet ? "dataSheetStyle" : ""}>
                  <div className='sheet-Container' style={{ marginLeft:"16px",marginBottom:"5%"}}>
                    {this.props.modelSheet &&
                      <ReactDataSheet
                        // data={this.props.isActive === true ? this.props.update_grid : this.props.data}
                        data={this.props.data}
                        valueRenderer={this.props.valueRenderer}
                        onContextMenu={this.props.onContextMenu}
                        onCellsChanged={this.props.onCellsChanged}
                      />
                    } 
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
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({...state});
export default connect(null, {
  getRoughPrefrence,
  getpacketSrNo,
  getOfficeSubList,
})(ReturnOfficePacket);