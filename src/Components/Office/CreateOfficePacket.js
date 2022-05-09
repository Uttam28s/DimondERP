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
import {getpacketSrNo} from "../../Actions/Office";
import moment from "moment";
import {toFixed4} from "../Common/helperFun";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";
import ReactDataSheet from 'react-datasheet';
import {Button} from "carbon-components-react";
import "react-datasheet/lib/react-datasheet.css";

const validationSchema = Yup.object().shape({
  // officeIssueassigneName: Yup.string().required("*Assign Id is required"),
  // roughName: Yup.string().required("*Rough Name is required"),
  officeIssuecarat: Yup.string().required("*carat is required"),
  // officeIssuepiece: Yup.string().required("*Piece is required"),
  officeIssueprocessName: Yup.string().required("*Process Name is required"),
  officeIssueassigneName: Yup.string().required("*Assign Name is required"),
  assigneName: Yup.string(),
  officePaketcreateDate: Yup.string().required("*Date is required"),
  officeIssueRoughList: Yup.string().required("*Rough Id is required"),
  officeIssueOfficeList: Yup.string().required("*Select Office Id"),
});
class CreateOfficePacket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      srno: 0,
      remaining: 0,
      toggle: false,
      officeItems: [],
      officeIdList: [],
      preDefinedData: "",
      preSelectedData: "",
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
    const {preSelectedData} = this.props

    const data = {
      office_id: value.officeIssueOfficeList.id,
      packet_status: value.officeIssueprocessName,
      return: false,
      manager_name: value.officeIssueassigneName,
      issueCarat: (value.officeIssuecarat) - (preSelectedData?.issueCarat || 0),
      assign_date: moment(value.officePaketcreateDate, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),
    };
    console.log("CreateOfficePacket -> handelSubmit -> data", data);
    // this.props.close();
    this.props.handleCreateSubpacket(data);
    if (preSelectedData) {
      this.props.editOfficeSubPacket()
    } else {
      this.props.handleCreateSubpacket(data);
    }
  };

  handelChangeRough = (data) => {
    // console.log("CreateOfficePacket -> handelChangeRough -> data", data);
    // this.props.roughOnChange(data.id);
    this.props
      .getRoughPrefrence({roughId: data === null ? 0 : data.id})
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
      (value) => data?.id === value?._id
    );
    // this.props.roughOnChange(data.id);
    this.props
      .getpacketSrNo({officeId: data === null ? 0 : data.id})
      .then((res) => {
        //  console.log('this.props.caratList', res)

        this.setState({
          srno: res.packetSrNo.packetNo,
          remaining: remaining.copyCarat,
          assigneName: res.packetSrNo.office_assigne_name
        });
      })
      .catch((e) => console.log(e));
  };

  clearState = () => {
    this.setState({
      toggle: !this.state.toggle,
      remaining: 0,
      assigneName: "",
      srno: ""
    })
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
        assigneName: value.office_assigne_name
      })
    );
    // console.log("SAdasassadasdas------------------------>", this.state.officeIdList);
    return (
      <div style={{marginBottom: "1%"}}>
        <Formik
          initialValues={{
            officeIssueRoughList: preDefinedData?.carat || "" ,
            officeIssueOfficeList: preDefinedData?.office_total_carat || "" ,
            officeIssueassigneName: (preSelectedData?.chapka_manager_name || preSelectedData?.sawing_manager_name) || "",
            officeIssueprocessName: preSelectedData?.type || "",
            officeIssuecarat: (preSelectedData?.chapka_issueCarat || preSelectedData?.sawing_issueCarat) || "",
            officeStartInputValue: "",
            officeEndInputValue: "",
            officePaketcreateDate: ((preSelectedData?.chapka_assign_date || preSelectedData?.sawing_assign_date) && moment(preSelectedData?.chapka_assign_date || preSelectedData?.sawing_assign_date).format("DD/MM/YYYY")) || "",
            // roughName: "",
            // officeIssuepiece: "",
            // officeIssueassigneName: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            //console.log("AddRoughModal -> render -> values", values);
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
            <div className={this.props.modelSheet === true ? "modelComponent" : ""}>
            <Form onSubmit={handleSubmit}>
              <div className="bx--row">
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeIssueRoughList &&
                        errors.officeIssueRoughList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueRoughList"
                    selectedItem={ preDefinedData?.carat ? {label:preDefinedData?.carat} : values.officeIssueRoughList }
                    value={values.officeIssueRoughList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="office-rough-list-issue"
                    items={ items }
                    label="Select Rough"
                    disabled={preDefinedData?.carat ? true : false}
                    // light
                    onChange={(select) => {
                      setFieldValue("officeIssueRoughList", select.selectedItem);
                      setFieldValue("officeIssueOfficeList", "");
                      setFieldValue("officeIssuecarat", "")
                      this.clearState()
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeIssueOfficeList &&
                        errors.officeIssueOfficeList
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueOfficeList"
                    selectedItem={ preDefinedData?.office_total_carat ? {label: preDefinedData?.office_total_carat} : values.officeIssueOfficeList }
                    value={values.officeIssueOfficeList}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-buyer-name"
                    items={officeItem}
                    label="Select Office Packet"
                    disabled={preDefinedData?.office_total_carat ? true : false}
                    light
                    onChange={(select) => {
                      setFieldValue("officeIssueOfficeList", select.selectedItem || "");
                      setFieldValue("officeIssuecarat", "")
                      // setFieldValue("assigneName", select.selectedItem.office_assigne_name)
                      select.selectedItem && this.handleOfficeSrno(select.selectedItem);
                      this.clearState()


                      // this.props.selectedId(select.selectedItem?.id);
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeIssueassigneName &&
                        errors.officeIssueassigneName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueassigneName"
                    selectedItem={ preSelectedData?.chapka_manager_name ? preSelectedData?.chapka_manager_name : values.officeIssueassigneName }
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
                        select.selectedItem || ""
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.officeIssueprocessName &&
                        errors.officeIssueprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeIssueprocessName"
                    selectedItem={ preSelectedData?.type ? preSelectedData?.type : values.officeIssueprocessName}
                    value={values.officeIssueprocessName}
                    direction="down"
                    // itemToString={(item) => (item ? item.text : "")}
                    id="process-name-office"
                    items={["sawing", "chapka"]}
                    label="Select Process name"
                    light
                    onChange={(select) =>
                      setFieldValue(
                        "officeIssueprocessName",
                        select.selectedItem || ""
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
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
                    onChange={(e) => {
                      if (Number(e.target.value) <= Number(this.state.remaining) && Number(e.target.value) >= 0) {
                        setFieldValue("officeIssuecarat", e.target.value)
                        this.setState({toggle: !this.state.toggle})
                      }
                    }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() { }}
                    required
                    type="number"
                  />
                  {touched.officeIssuecarat && errors.officeIssuecarat ? (
                    <div className="error-message">
                      {errors.officeIssuecarat}
                    </div>
                  ) : null}
                </div>

                {this.props.modelSheet &&
                  <>
                    <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-3"}>
                      <TextField
                        className={
                          touched.officeStartInputValue && errors.officeStartInputValue
                            ? "error"
                            : "bx--col"
                        }
                        name="officeStartInputValue"
                        value={values.officeStartInputValue}
                        id="office-officeStartInputValue"
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
                        // required
                        type="number"
                      />
                      {touched.officeStartInputValue && errors.officeStartInputValue ? (
                        <div className="error-message">
                          {errors.officeStartInputValue}
                        </div>
                      ) : null}
                    </div>
                    <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-3"}>
                      <TextField
                        className={
                          touched.officeEndInputValue && errors.officeEndInputValue
                            ? "error"
                            : "bx--col"
                        }
                        name="officeEndInputValue"
                        value={values.officeEndInputValue}
                        id="office-officeEndInputValue"
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
                        // required
                        type="number"
                      />
                      {touched.officeEndInputValue && errors.officeEndInputValue ? (
                        <div className="error-message">
                          {errors.officeEndInputValue}
                        </div>
                      ) : null}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <p className="h5-form-label">
                    Packet No :{" "} <br/>
                    <span style={{color: "#0F61FD"}}>{preDefinedData?.packetNo || this.state.srno}</span>
                  </p>
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <p className="h5-form-label">
                    Assignee Name :{" "} <br/>
                    {console.log('this.state', this.state)}
                    <span style={{color: "#0F61FD"}}>{preDefinedData?.office_assigne_name || this.state.assigneName}</span>
                  </p>
                </div>
                
                {/* <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}> */}
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
                {/* </div> */}
                {/* <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}></div> */}
            
                <div className={this.props.modelSheet ? "bx--col-md-1" : "bx--col-md-4"}>
                  <p style={{display: "grid"}}>
                    Remaining Carat :{" "}
                    <span style={{color: "#DA1E28"}}>
                      { this.state.remaining - values?.officeIssuecarat || 0 }
                    </span>
                  </p>
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-1" : "bx--col-md-4"}>
                  <p style={{display: "grid"}}>
                    Available Carat :{" "}
                    <span style={{color: "#DA1E28"}}>
                      {preDefinedData?.copyCarat || (this.state.remaining || 0)}
                    </span>
                  </p>
                </div>
              
                {/* <div className="bx--row top-margin-model-input"> */}
                  {/* <div className="bx--col-md-3"></div> */}
                  {/* <div className="bx--col-md-3"> */}
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
                  {/* </div> */}
                {/* </div> */}

                <div className={this.props.modelSheet ? "dataSheetStyle" : ""}>    
                  <div className='sheet-Container' style={{ marginLeft:"16px",marginBottom:"5%"}}>
                    {console.log(this.props.data,"row data in model - createOfficePacket")}

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

export default connect(mapStateToProps, {getRoughPrefrence, getpacketSrNo})(
  CreateOfficePacket
);