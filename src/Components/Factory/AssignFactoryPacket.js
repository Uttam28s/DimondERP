import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
import {getFactoryList, getFactorySubList, createFactoryPacket} from "../../Actions/Factory";
import {
  connect
} from "react-redux";
import moment from "moment";
// import { Tab } from "carbon-components-react";
import {select} from "async";
// import TabView from "../Common/Tabs";
import ReactDataSheet from 'react-datasheet';
import {Button} from "carbon-components-react";
import "react-datasheet/lib/react-datasheet.css";

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
    this.state = {
      preSelectedData: "",
      preDefinedData: "",
    };
  }

  componentDidMount() {
    console.log('preSelectedData', this.props.preSelectedData,this.props.preDefinedData)
    if (this.props.preSelectedData) {
      this.setState({ preSelectedData: this.props.preSelectedData });
    }
    else if(this.props.preDefinedData){
      this.setState({ preDefinedData: this.props.preDefinedData });
    }
  }

  handelSubmit = async (values, resetForm) => {
    resetForm()
    let data = {
      factory_id: values.factorySubPacketAssignRoughId.id,
      process_name: values.factoryAssignprocessName,
      main_carat: Number(values.factoryAssignRoughId.label),
      assign_name: values.factoryAssignAssignName,
      factory_carat: Number(values.factoryAssignPacketId.label),
      assign_carat: values.factoryAssignCarat,
      piece: values.factoryAssignpcs,
      purity: values.factoryPacketPurity,
      size: values.assignFactroryPacketSize,
      yeild: values.assignFactroryPacketYeild,
      assign_date: moment(values.factoryPaketcreateDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      status: "update"
    }
    await this.props.createFactoryPacket(data).then((result) => {
    }).catch((err) => {
    });
  };

  handelOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };



  getFactoryRoughList = (id) => {
    this.props.getFactoryList({roughId: id}).then((result) => {
      this.setState({
        subRoughList: result?.data?.map((data) => {
          return {id: data._id, label: data.factory_total_carat.toString()}
        }) || []
      })
    }).catch((err) => {});
  }

  render() {
    const {preSelectedData, preDefinedData} = this.props

    const selectReturnData = preDefinedData?.data.find((data) => data.assign_carat === preSelectedData?.assign_carat)  
    console.log(selectReturnData,"selectReturnData ==> editReturnPacket...")

    return (
      <div style={{ marginBottom: "1%" }}>
        <Formik
          initialValues={{
            factoryAssignRoughId: selectReturnData?.main_carat || "",
            factoryAssignPacketId: selectReturnData?.factory_carat || "",
            factorySubPacketAssignRoughId: preSelectedData?.assign_carat || "",
            factoryAssignprocessName: preSelectedData?.process_name || "",
            factoryAssignAssignName: preSelectedData?.assign_name || "",
            factoryPacketPurity: preSelectedData?.purity || "",
            factoryAssignpcs: preSelectedData?.piece || "",
            assignFactroryPacketYeild: (preSelectedData?.piece) / (preSelectedData?.assign_carat) || "",
            factoryAssignCarat: preSelectedData?.assign_carat || "",
            assignFactroryPacketSize:( (preSelectedData?.piece) / (preSelectedData?.assign_carat) ) / (preSelectedData?.assign_carat) || "",
            factoryPaketcreateDate: (preSelectedData?.assign_date && moment(preSelectedData?.assign_date).format("DD/MM/YYYY")) || "",
            factoryStartInputValue: "",
            factoryEndInputValue: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
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
                    name="factoryAssignRoughId"
                    selectedItem={ selectReturnData?.main_carat ? {label: selectReturnData?.main_carat} : values.factoryAssignRoughId}
                    value={values.factoryAssignRoughId}
                    titleText="Rough Id"
                    type="default"
                    id="factory-assign-rough-id"
                    items={this.props.caratList}
                    label="Select Rough id"
                    disabled={selectReturnData?.main_carat ? true : false}
                    light
                    // itemToString={(item) => (item ? item.text : "")}
                    onChange={(select) => {
                      setFieldValue("factoryAssignRoughId", select.selectedItem);
                      select.selectedItem?.id && this.getFactoryRoughList(select.selectedItem.id)
                    }}
                    className={
                      touched.factoryAssignRoughId &&
                        errors.factoryAssignRoughId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                  />
                  {touched.factoryAssignRoughId &&
                    errors.factoryAssignRoughId ? (
                    <div className="error-message">
                      {errors.factoryAssignRoughId}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    name="factoryAssignPacketId"
                    selectedItem={ selectReturnData?.factory_carat ? {label: selectReturnData?.factory_carat} : values.factoryAssignPacketId}
                    value={values.factoryAssignPacketId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-assignee-packet-id"
                    items={this.state.subRoughList || []}
                    label="Select Packet id"
                    light
                    disabled={selectReturnData?.factory_carat ? true : false}
                    titleText="Packet id"
                    type="default"
                    onChange={(select) =>
                    {
                      setFieldValue(
                        "factoryAssignPacketId",
                        select.selectedItem
                      )
                      select?.selectedItem?.id && this.props.getFactorySubList({factory_id: select.selectedItem.id}).then((res) => {
                        this.setState({
                          subPacketData: res.data.map((val) => {
                            if (val.occupy_by == "false") {
                              console.log("🚀 ~ file: ReturnPacket.js ~ line 201 ~ ReturnSubPacket ~ select?.selectedItem?.id&&this.props.getFactorySubList ~ data", val)
                              return {
                                id: val._id.toString(),
                                label: val.last_carat.toString(),
                                processName: val.occupy_by,
                               // assign_name: val.all_process.filter((v) => v.process_name == val.occupy_by)[0].assign_name,
                             //   process_id: val.all_process.filter((v) => v.process_name == val.occupy_by)[0].process_carat_id,
                              }
                            }
                          }).filter((val) => val !== undefined)
                        });
                        console.log(res,"factoryAssignPacketId...")
                      })
                    }}
                    className={
                      touched.factoryAssignPacketId &&
                        errors.factoryAssignPacketId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                  />
                  {touched.factoryAssignPacketId &&
                    errors.factoryAssignPacketId ? (
                    <div className="error-message">
                      {errors.factoryAssignPacketId}
                    </div>
                  ) : null}

                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factorySubPacketAssignRoughId &&
                        errors.factorySubPacketAssignRoughId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryAssignRoughId"
                    selectedItem={preSelectedData?.assign_carat ? {label: preSelectedData?.assign_carat} : values.factorySubPacketAssignRoughId}
                    value={values.factorySubPacketAssignRoughId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-assign-rough-id"
                    items={this.state.subPacketData || []}
                    label="Select Sub Packet"
                    light
                    disabled={preSelectedData?.assign_carat ? true : false}
                    onChange={(select) => {
                      setFieldValue("factorySubPacketAssignRoughId", select.selectedItem);
                      setFieldValue("factoryAssignCarat", select.selectedItem?.label)

                    }
                    }
                    titleText="Sub Packet"
                    type="default"
                  />
                  {console.log(values.factorySubPacketAssignRoughId,"values.factorySubPacketAssignRoughId ==> AssignFactoryPacket")}
                  {touched.factorySubPacketAssignRoughId &&
                    errors.factorySubPacketAssignRoughId ? (
                    <div className="error-message">
                      {errors.factorySubPacketAssignRoughId}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryAssignprocessName &&
                        errors.factoryAssignprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryAssignprocessName"
                    selectedItem={preSelectedData?.process_name ? preSelectedData?.process_name : values.factoryAssignprocessName}
                    value={values.factoryAssignprocessName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="process-assign-name-factory"
                    items={[
                      "Sarin",
                      "Tiching",
                      "4P",
                      "Table",
                      "Polish"
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryAssignAssignName &&
                        errors.factoryAssignAssignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryAssignAssignName"
                    selectedItem={ preSelectedData?.assign_name ? preSelectedData?.assign_name : values.factoryAssignAssignName}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryPacketPurity && errors.factoryPacketPurity
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryPacketPurity"
                    selectedItem={ preSelectedData?.purity ?  preSelectedData?.purity : values.factoryPacketPurity}
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
                    disabled={preSelectedData?.purity ? true : false}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
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
                    disabled={preSelectedData?.piece ? true : false}
                    light={true}
                    onChange={(e) => {
                      handleChange(e)
                      let size = (e.target.value || 0) / (values.factoryAssignCarat || 0) 
                      let yeild = (size || 0) / (values.factoryAssignCarat || 0)
                      setFieldValue("assignFactroryPacketSize", size)
                      setFieldValue("assignFactroryPacketYeild", yeild)
                    }}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"} style={{ marginTop: "2%"}}>
                  <h5 className="h5-form-label">
                    Packet Id : <span style={{ color: "#0F61FD" }}>#PID001</span>
                  </h5>
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
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
                    disabled={true}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
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
                    disabled={true}
                    light={true}
                    // onChange={(e) => {
                    //   if (Number(e.target.value) <= values.factorySubPacketAssignRoughId.label) {
                    //     handleChange(e)
                    //   }
                    // }}
                    // disabled={true}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
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
                    disabled={true}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"} style={{ marginTop: "2%"}}>
                  <h5 className="h5-form-label">
                    Total Carat : <span style={{ color: "#0F61FD" }}>650.00</span>
                  </h5>
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DateSelection
                    dateFormat="d/m/Y"
                    datePickerType="single"
                    id="factory-packet-Assign-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
                    dateid="factory-assign-packet-id"
                    name="factoryPaketcreateDate"
                    value={values.factoryPaketcreateDate}
                    onBlur={handleBlur}
                    onChange={(date) => {
                      const basicDate = new Date(date);
                      const formateDate = basicDate.getDate() + "/" +
                        (basicDate.getMonth() + 1) + "/" + basicDate.getFullYear();
                      setFieldValue("factoryPaketcreateDate", formateDate);
                    }}
                    className={
                      touched.factoryPaketcreateDate &&
                        errors.factoryPaketcreateDate
                        ? "error"
                        : "bx--col"
                    }
                  />
                  {touched.factoryPaketcreateDate &&
                    errors.factoryPaketcreateDate ? (
                    <div className="error-message">
                      {errors.factoryPaketcreateDate}
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <h5 className="h5-form-label">
                    Remaining Carat :{" "}
                    <span style={{ color: "#E7301C" }}>#AID001</span>
                  </h5>
                </div>

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
                    disabled={(values.factoryAssignRoughId 
                            && values.factoryAssignPacketId 
                            && values.factorySubPacketAssignRoughId 
                            && values.factorySubPacketAssignRoughId 
                            && values.factoryAssignprocessName 
                            && values.factoryAssignAssignName 
                            && values.factoryPacketPurity 
                            && values.factoryPaketcreateDate ) ? isSubmitting : true
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

export default connect(null, {getFactoryList, getFactorySubList, createFactoryPacket})(AssignSubPacket);
