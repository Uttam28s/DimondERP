import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import moment from "moment";

import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
import {connect} from "react-redux";
import {returnFactorySubPacket, getFactorySubList} from "../../Actions/Factory";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";
import ReactDataSheet from 'react-datasheet';
import {Button} from "carbon-components-react";
import "react-datasheet/lib/react-datasheet.css";

const validationSchema = Yup.object().shape({
  factoryReturnPacketId: Yup.string().required("*Packet id is required"),
  factoryReturnAssignName: Yup.string().required("*Assigne Name is required"),
 // factoryReturnprocessName: Yup.string().required("*Process Name is required"),
  factoryReturncarat: Yup.string().required("*carat is required"),
  factoryReturnpiece: Yup.string().required("*Piece is required"),
  factoryPacketReturnDate: Yup.string().required("*Date is required"),
});
class ReturnSubPacket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preDefinedData: "",
      preSelectedData: "",
      returndata: ""
    };
  }

  componentDidMount = () => {
    console.log('preSelectedData', this.props.preSelectedData, this.props.preDefinedData)
    if (this.props.preSelectedData) {
      this.setState({ preSelectedData: this.props.preSelectedData });
    }
    else if(this.props.preDefinedData){
      this.setState({ preDefinedData: this.props.preDefinedData });
    }
    else if(this.props.returndata){
      this.setState({ returndata: this.props.returndata });
    }
  }

  handelSubmit = (values, resetForm) => {
    resetForm()
    let data = {
      process_carat_id: values.factoryReturnPacketId.process_id,
      returnData: {
        return_carat: values.factoryReturncarat,
        return_peice: values.factoryReturnpiece,
        return_date: moment(values.factoryPacketReturnDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        return_size: values.factoryReturnSize,
        return_yeild: values.factoryReturnYeild,
        return_sarin_weight: values.factoryReturnProcessWeight
      },
      factoryId: values.factoryReturnPacketId.id


    }
    this.props.returnFactorySubPacket(data)

  };

  handelOnChange = (e) => {
    console.log("AddRoughModal -> handelOnChange -> e", e.target);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  getFactoryRoughList = (id) => {
    this.props.getFactoryList({roughId: id}).then((result) => {
      console.log('result', result)
      this.setState({
        subRoughList: result?.data?.map((data) => {
          return {id: data._id, label: data.factory_total_carat.toString(), remainingCarat: data.copyCarat || data.factory_total_carat.toString()}
        }) || [],
      })
    }).catch((err) => {});
  }
  clearState = () => {
    this.setState({subRoughList: []});
  }


  setFormData = (array, func, value) => {
    array.map((data, i) => {
      return func(data, value ? value[i] : "")
    })
  }


  render() {
    const {preSelectedData, preDefinedData, returndata} = this.props

    console.log("preSelectedData ==> editReturnPacket...",this.props.preSelectedData,this.props.preDefinedData)

    // const returnData = returndata?.[preSelectedData?.process_name].find((data) => data.process_name === preSelectedData?.process_name)
    // const selectReturnData = returnData?.returndata
    // console.log(selectReturnData,"selectReturnData ==> editReturnPacket...")

    const selectReturnData = preDefinedData?.data.find((data) => data.assign_carat === preSelectedData?.assign_carat)  
    console.log(selectReturnData,"selectReturnData ==> editReturnPacket...")

    return (
      <div style={{ marginBottom: "1%" }}>
        <Formik
          initialValues={{
            factoryIssueRoughId: selectReturnData?.main_carat || "",
            factoryRough: selectReturnData?.factory_carat || "", 
            factoryReturnPacketId: preSelectedData?.returndata?.return_carat || "",
            factoryReturnAssignName: preSelectedData?.assign_name || "",
            factoryReturnprocessName: preSelectedData?.process_name || "",
            factoryReturncarat: preSelectedData?.return_carat || "",
            factoryReturnpiece: preSelectedData?.returndata?.return_peice || "",
            factoryPacketReturnDate: (preSelectedData?.return_date && moment(preSelectedData?.return_date).format("DD/MM/YYYY")) || "",
            factoryReturnSize: preSelectedData?.returndata?.return_size || "",
            factoryReturnYeild: preSelectedData?.returndata?.return_yeild || "",
            factoryReturnProcessWeight: preSelectedData?.returndata?.return_sarin_weight || "",
            factoryReturnWeightlose: "",
            // factoryReturnProcessID: "",
            factoryStartInputValue: "",
            factoryEndInputValue: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            console.log(" > render -> values", values);
            this.handelSubmit(values, resetForm)
            // this.props.close();
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
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryIssueRoughId && errors.factoryIssueRoughId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryIssueRoughId"
                    selectedItem={selectReturnData?.main_carat ? {label: selectReturnData?.main_carat} : values.factoryIssueRoughId}
                    value={values.factoryIssueRoughId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-main-rough"
                    items={this.props.caratList || []}
                    label="Select main Rough"
                    light
                    onChange={(select) => {
                      setFieldValue("factoryIssueRoughId", select.selectedItem);
                      // setFieldValue("factoryRough", "")
                      // setFieldValue("factoryReturnPacketId", "")
                      // setFieldValue("factoryReturnProcessWeight", "")
                      this.setFormData(["factoryRough", "factoryReturnPacketId", "factoryReturnProcessWeight"], setFieldValue)
                      this.clearState()
                      console.log('select.selectedItem', select.selectedItem)
                      select.selectedItem?.id && this.getFactoryRoughList(select.selectedItem.id)
                    }}
                    titleText="Main Rough"
                    type="default"
                  />
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryRough && errors.factoryRough
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factory Rough"
                    selectedItem={ selectReturnData?.factory_carat ? {label: selectReturnData?.factory_carat} : values.factoryRough}
                    value={values.factoryRough}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-rough"
                    items={this.state.subRoughList || []}
                    label="Select factory Rough"
                    light
                    onChange={(select) => {
                      setFieldValue("factoryReturnPacketId", "")
                      setFieldValue("factoryRough", select.selectedItem)
                      this.setState({subPacketData: []})
                      select?.selectedItem?.id && this.props.getFactorySubList({factory_id: select.selectedItem.id}).then((res) => {
                        console.log("🚀 ~ file: ReturnPacket.js ~ line 201 ~ ReturnSubPacket ~ select?.selectedItem?.id&&this.props.getFactorySubList ~ data", res)
                        this.setState({
                          subPacketData: res.data.map((val) => {
                            if (val.occupy_by !== "false") {
                              return {
                                id: val._id.toString(),
                                label: val.last_carat.toString(),
                                processName: val.occupy_by,
                                assign_name: val.all_process.filter((v) => v.process_name == val.occupy_by)[0].assign_name,
                                process_id: val.all_process.filter((v) => v.process_name == val.occupy_by)[0].process_carat_id,
                                last_carat: val.last_carat
                              }
                            }
                          }).filter((val) => val !== undefined)
                        });
                      })

                    }
                    }
                    titleText="Rough Name"
                    type="default"
                  />
                  {touched.factoryRough && errors.factoryRough ? (
                    <div className="error-message">{errors.factoryRough}</div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  {console.log('val.last_carat.toString()', this.state.subPacketData)}
                  <DropDownSelection
                    className={
                      touched.factoryReturnPacketId &&
                      errors.factoryReturnPacketId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnPacketId"
                    selectedItem={ preSelectedData?.assign_carat ? {label: preSelectedData?.assign_carat} : values.factoryReturnPacketId }
                    value={values.factoryReturnPacketId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-retutn-packet-id"
                    items={this.state.subPacketData || []}
                    label="Select Packet id"
                    light
                    onChange={(select) =>
                    {


                      this.setFormData(
                        ["factoryReturnPacketId",
                          "factoryReturnprocessName",
                        "factoryReturnAssignName",
                          "factoryReturnProcessWeight"
                        ],
                        setFieldValue,
                        [
                          select.selectedItem,
                          select.selectedItem?.processName,
                          select.selectedItem?.assign_name,
                          select.selectedItem?.last_carat
                        ])

                    }
                    }
                    titleText="Packet id"
                    type="default"
                  />
                  {touched.factoryReturnPacketId &&
                  errors.factoryReturnPacketId ? (
                    <div className="error-message">
                      {errors.factoryReturnPacketId}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryReturnAssignName &&
                      errors.factoryReturnAssignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnAssignName"
                    selectedItem={ preSelectedData?.assign_name ? preSelectedData?.assign_name : values.factoryReturnAssignName}
                    value={values.factoryReturnAssignName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-retutn-assign-name"
                    items={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.",
                      "Option 5",
                      "Option 6",
                    ]}
                    label="Select Assign Name"
                    light
                    disabled={true}
                    // onChange={(select) =>
                    //   setFieldValue(
                    //     "factoryReturnAssignName",
                    //     select.selectedItem
                    //   )
                    // }
                    titleText="Assign Name"
                    type="default"
                  />
                  {touched.factoryReturnAssignName &&
                  errors.factoryReturnAssignName ? (
                    <div className="error-message">
                      {errors.factoryReturnAssignName}
                    </div>
                  ) : null}
                </div>

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
                      setFieldValue("factoryPacketReturnDate", formateDate);
                    }}
                    id="factory-packet-return-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Return packet Date"
                    className={
                      touched.factoryPacketReturnDate &&
                      errors.factoryPacketReturnDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="factory-return-packet-id"
                    name="factoryPacketReturnDate"
                    value={values.factoryPacketReturnDate}
                    onBlur={handleBlur}
                  />
                  {touched.factoryPacketReturnDate &&
                  errors.factoryPacketReturnDate ? (
                    <div className="error-message">
                      {errors.factoryPacketReturnDate}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryReturncarat && errors.factoryReturncarat
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryReturncarat"
                    value={values.factoryReturncarat}
                    id="factory-return-carat"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Carat :"
                    placeholder="enter carat here"
                    light={true}
                    onChange={(e) => {
                      if (Number(e.target.value) <= Number(values.factoryReturnPacketId?.label || preSelectedData?.assign_carat)) {
                        handleChange(e)

                      }
                    }}
                    onBlur={handleBlur}
                    required
                    type="number"
                  />
                  {touched.factoryReturncarat && errors.factoryReturncarat ? (
                    <div className="error-message">
                      {errors.factoryReturncarat}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryReturnpiece && errors.factoryReturnpiece
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryReturnpiece"
                    value={values.factoryReturnpiece}
                    id="factoryReturnpiece"
                    placeholder="enter pcs here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Piece :"
                    light={true}
                    onChange={(e) => {
                      handleChange(e)
                      let size = (e.target.value || 0) / (values.factoryReturncarat || 0)
                      let yeild = (size || 0) / (values.factoryReturncarat || 0)
                      setFieldValue("factoryReturnSize", size)
                      setFieldValue("factoryReturnYeild", yeild)
                    }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.factoryReturnpiece && errors.factoryReturnpiece ? (
                    <div className="error-message">
                      {errors.factoryReturnpiece}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"} style={{ marginTop: "2%"}}>
                  <h5 className="h5-form-label">
                    Total Weight lose :{" "}
                    {/* <span style={{color: "#E7301C"}}>
                      {(values.factoryReturncarat && ((values?.factoryReturncarat || values?.factoryReturnPacketId?.label) / values?.factoryReturnPacketId?.label)) || 0}%
                    </span> */}
                    <span style={{color: "#E7301C"}}>
                      {(preSelectedData?.return_carat || values.factoryReturncarat && ( ( (preSelectedData?.return_carat || values.factoryReturncarat) || selectReturnData?.return_carat ) / selectReturnData?.return_carat ) ) || 0}%
                    </span>
                  </h5>
                </div>
              
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  {console.log('values.factoryReturnPacketId', values.factoryReturnPacketId)}
                  <DropDownSelection
                    className={
                      touched.factoryReturnprocessName &&
                      errors.factoryReturnprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnprocessName"
                    selectedItem={ preSelectedData?.process_name ? preSelectedData?.process_name : values.factoryReturnprocessName}
                    value={values.factoryReturnprocessName}
                    direction="top"
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-return-process-name"
                    items={[values?.factoryReturnPacketId?.processName || ""] || []}
                    disabled={true}
                    label="Select Process name"
                    light
                    // onChange={(select) =>
                    //   setFieldValue(
                    //     "factoryReturnprocessName",
                    //     select.selectedItem
                    //   )
                    // }
                    titleText="Process Name"
                    type="default"
                  />
                  {touched.factoryReturnprocessName &&
                  errors.factoryReturnprocessName ? (
                    <div className="error-message">
                      {errors.factoryReturnprocessName}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryReturnSize && errors.factoryReturnSize
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryReturnSize"
                    value={values.factoryReturnSize}
                    id="factoryReturnSize"
                    placeholder=" size "
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Size :"
                    light={true}
                    disabled={true}

                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.factoryReturnSize && errors.factoryReturnSize ? (
                    <div className="error-message">
                      {errors.factoryReturnSize}
                    </div>
                  ) : null}
                </div>
              
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryReturnYeild && errors.factoryReturnYeild
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnYeild"
                    placeholder=" Yeild "

                    value={values.factoryReturnYeild}
                    invalidText="Please fill"
                    id="factoryReturnYeild"
                    label="yeild"
                    light
                    disabled={true}

                    labelText="Yeild :"
                    type="default"
                  />
                  {touched.factoryReturnYeild && errors.factoryReturnYeild ? (
                    <div className="error-message">
                      {errors.factoryReturnYeild}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  {console.log("🚀 ~ file: ReturnPacket.js ~ line 483 ~ ReturnSubPacket ~ render ~ values.factoryReturnprocessName", values)}
                  <TextField
                    className={
                      touched.factoryReturnProcessWeight &&
                        errors.factoryReturnProcessWeight
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryReturnProcessWeight"
                    value={values.factoryReturnProcessWeight}
                    id="factoryReturnProcessWeight"
                    placeholder={`${values.factoryReturnprocessName} weight`}
                    // invalid={false}
                    invalidText="Please fill"
                    labelText={`${values.factoryReturnprocessName} Weight:`}
                    disabled={true}
                    light={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.factoryReturnProcessWeight &&
                    errors.factoryReturnProcessWeight ? (
                    <div className="error-message">
                        {errors.factoryReturnProcessWeight}
                    </div>
                  ) : null}
                </div>

                {this.props.modelSheet &&
                  <>
                    <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-3"}>
                      <TextField
                        className={
                          touched.factoryStartInputValue && errors.factoryStartInputValue
                            ? "error"
                            : "bx--col"
                        }
                        name="factoryStartInputValue"
                        value={values.factoryStartInputValue}
                        id="fectory-factoryStartInputValue"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="From :"
                        placeholder="enter number here"
                        light={true}
                        onChange={(e) => {
                          if (Number(e.target.value) >= 1) {
                            setFieldValue("factoryStartInputValue", parseInt(e.target.value))
                            // this.setState({toggle: !this.state.toggle})
                          }
                        }}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() { }}
                        // required
                        type="number"
                      />
                      {touched.factoryStartInputValue && errors.factoryStartInputValue ? (
                        <div className="error-message">
                          {errors.factoryStartInputValue}
                        </div>
                      ) : null}
                    {console.log(values.factoryStartInputValue,"from value")}
                    </div>
                    <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-3"}>
                      <TextField
                        className={
                          touched.factoryEndInputValue && errors.factoryEndInputValue
                            ? "error"
                            : "bx--col"
                        }
                        name="factoryEndInputValue"
                        value={values.factoryEndInputValue}
                        id="fectory-factoryEndInputValue"
                        // invalid={false}
                        invalidText="Please fill"
                        labelText="To :"
                        placeholder="enter number here"
                        light={true}
                        onChange={(e) => {
                          if (Number(e.target.value) >= 0) {
                            setFieldValue("factoryEndInputValue", parseInt(e.target.value))
                            // this.setState({toggle: !this.state.toggle})
                          }
                        }}
                        onBlur={handleBlur}
                        // onClick={function noRefCheck() { }}
                        // required
                        type="number"
                      />
                      {touched.factoryEndInputValue && errors.factoryEndInputValue ? (
                        <div className="error-message">
                          {errors.factoryEndInputValue}
                        </div>
                      ) : null}
                      {console.log(typeof(values.factoryEndInputValue),values.factoryEndInputValue,"To value")}
                    </div>
                    <div className="bx--col-md-2">
                      <Button
                        size="small"
                        style={{ marginTop:"24px"}}
                        // onClick={this.props.openSheet}
                        onClick={() => {this.props.openSheet(values.factoryStartInputValue,values.factoryEndInputValue)}}
                        disabled={values.factoryEndInputValue <= values.factoryStartInputValue  ? true : false}
                      >
                        Manage DataSheet
                      </Button>
                    </div>
                  </>
                }

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
                    disabled={(values.factoryIssueRoughId 
                            && values.factoryRough
                            && values.factoryReturnPacketId 
                            && values.factoryPacketReturnDate
                            && values.factoryReturncarat 
                            && values.factoryReturnpiece ) ? isSubmitting : true
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(null, {returnFactorySubPacket, getFactorySubList})(ReturnSubPacket);
