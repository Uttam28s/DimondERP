import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
import moment from "moment";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";
import ReactDataSheet from 'react-datasheet';
import {Button} from "carbon-components-react";
import "react-datasheet/lib/react-datasheet.css";

const validationSchema = Yup.object().shape({
  factoryIssueRoughId: Yup.string().required("*Rough id is required"),
  factoryIssueAssignName: Yup.string().required("*Assigne Name is required"),
  factoryIssueprocessName: Yup.string().required("*Process Name is required"),
  factoryIssueCarat: Yup.string().required("*carat Name is required"),
  factoryIssuepcs: Yup.string().required("*Piece is required"),
  factoryPaketcreateDate: Yup.string().required("*Date is required"),
  factoryPaketsize: Yup.string().required("Packet Size is required"),
  factoryPaketYeild: Yup.string().required("Yeild  Size is required"),
  factoryPacketPurity: Yup.string().required("Purity  Size is required"),
  factorySubPacket: Yup.string().required("SubPacket  Size is required")
});
class CreateSubPacket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      toggle: false,
      preSelectedData: "",
      preDefinedData: "",
    };
  }

  componentDidMount() {
    // this.setState({
    //   items: this.props.caretList?.map((data) => {
    //     return { id: data._id, label: data.carat.toString() }
    //   })
    // })

    console.log('preSelectedData', this.props.preSelectedData,this.props.preDefinedData)
    if (this.props.preSelectedData) {
      this.setState({ preSelectedData: this.props.preSelectedData });
    }
    else if(this.props.preDefinedData) {
      this.setState({ preDefinedData: this.props.preDefinedData })
    }
  }
  componentDidUpdate(preProps) {
    // if (preProps.caretList.length !== this.props.caratList.length) {
    //   this.setState({ toggle: !this.state.toggle });
    // }
  }
  handelSubmit = async (values, resetForm) => {
    // console.log(e);
    resetForm()
    let data = {
      factory_id: values.factorySubPacket.id,
      process_name: values.factoryIssueprocessName,
      main_carat: Number(values.factoryIssueRoughId.label),
      assign_name: values.factoryIssueAssignName,
      factory_carat: Number(values.factorySubPacket.label),
      assign_carat: values.factoryIssueCarat,
      piece: values.factoryIssuepcs,
      purity: values.factoryPacketPurity,
      size: values.factoryPaketsize,
      yeild: values.factoryPaketYeild,
      assign_date: moment(values.factoryPaketcreateDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    }
    console.log("🚀 ~ file: CreateSubPacket.js ~ line 110 ~ CreateSubPacket ~ render ~ data", Number(values.factorySubPacket.label), values.factoryIssueCarat, data)

    await this.props.createFactoryPacket(data).then((result) => {
      console.log("🚀 ~ file: CreateSubPacket.js ~ line 116 ~ CreateSubPacket ~ awaitthis.props.createFactoryPacket ~ result", result)
      // this.props.close();

    }).catch((err) => {
      console.log(err)
    });

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
          return {
            id: data._id,
            label: data.factory_total_carat.toString(),
            remainingCarat: data.copyCarat == 0 ?
              "0" : (data.copyCarat || data.factory_total_carat.toString())
          }
        }) || [],
      })
    }).catch((err) => {});
  }


  clearState = () => {
    this.setState({subRoughList: []});
  }



  render() {
   // const {items, subRoughList} = this.state
   const{ preSelectedData, preDefinedData, Data } = this.props
   console.log(preDefinedData,"preDefinedData ==> CreateSubPAcket.js")

   const selectReturnData = preDefinedData?.data.find((data) => data.assign_carat === preSelectedData?.assign_carat)  
   console.log(selectReturnData,"selectReturnData ==> editReturnPacket...")

    return (
      <div style={{ marginBottom: "1%" }}>
        <Formik
          initialValues={{
            factoryIssueRoughId: selectReturnData?.main_carat || "",
            factoryPaketcreateDate: (preSelectedData?.assign_date && moment(preSelectedData?.assign_date).format("DD/MM/YYYY")) || "",
            factorySubPacket: selectReturnData?.factory_carat || "",
            factoryIssueAssignName: preSelectedData?.assign_name || "",
            factoryIssueprocessName: preSelectedData?.process_name || "",
            factoryIssueCarat: preSelectedData?.assign_carat || "",
            factoryIssuepcs: preSelectedData?.piece || "",
            factoryPacketPurity: preSelectedData?.purity || "",
            factoryPaketsize: ((preSelectedData?.piece) / (preSelectedData?.assign_carat || 0)) || "",
            factoryPaketYeild:( ((preSelectedData?.piece) / (preSelectedData?.assign_carat || 0)) / (preSelectedData?.assign_carat || 0) ) || "",
            factoryStartInputValue: "",
            factoryEndInputValue: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            this.handelSubmit(values, resetForm);
            // let data = {
            //   factory_id: values.factorySubPacket.id,
            //   process_name: values.factoryIssueprocessName,
            //   main_carat: Number(values.factoryIssueRoughId.label),
            //   assign_name: values.factoryIssueAssignName,
            //   factory_carat: Number(values.factorySubPacket.label),
            //   assign_carat: values.factoryIssueCarat,
            //   piece: values.factoryIssuepcs,
            //   purity: values.factoryPacketPurity,
            //   size: values.factoryPaketsize,
            //   yeild: values.factoryPaketYeild,
            //   assign_date: moment(values.factoryPaketcreateDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
            // }
            // console.log("🚀 ~ file: CreateSubPacket.js ~ line 110 ~ CreateSubPacket ~ render ~ data", Number(values.factorySubPacket.label), values.factoryIssueCarat, data)

            // await this.props.createFactoryPacket(data).then((result) => {
            //   console.log("🚀 ~ file: CreateSubPacket.js ~ line 116 ~ CreateSubPacket ~ awaitthis.props.createFactoryPacket ~ result", result)
            //   // this.props.close();

            // }).catch((err) => {
            //   console.log(err)
            // });

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
                    selectedItem={ selectReturnData?.main_carat ? {label: selectReturnData?.main_carat} : values.factoryIssueRoughId}
                    value={values.factoryIssueRoughId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-rough-id"
                    items={this.props.caratList || []}
                    label="Select Rough id"
                    light
                    disabled={preDefinedData?.main_carat ? true : false}
                    onChange={(select) => {
                      setFieldValue("factoryIssueRoughId", select.selectedItem);
                      setFieldValue("factorySubPacket", "")
                      this.clearState()
                      console.log('select.selectedItem', select.selectedItem)
                      select.selectedItem?.id && this.getFactoryRoughList(select.selectedItem.id)
                    }}
                    titleText="Rough"
                    type="default"
                  />
                  {console.log(values.factoryIssueRoughId,"values.factoryIssueRoughId ==> CreateSubPacket")}
                  {
                    touched.factoryIssueRoughId && errors.factoryIssueRoughId ? (
                      <div className="error-message">
                        {errors.factoryIssueRoughId}
                      </div>
                    ) : null
                  }
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
                      setFieldValue("factoryPaketcreateDate", formateDate);
                    }}
                    id="factory-packet-create-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
                    className={
                      touched.factoryPaketcreateDate &&
                        errors.factoryPaketcreateDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="factory-packet-id"
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factorySubPacket && errors.factorySubPacket
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factorySubPacket"
                    selectedItem={ selectReturnData?.factory_carat ? {label: selectReturnData?.factory_carat} : values.factorySubPacket }
                    value={values.factorySubPacket}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-name-office"
                    items={this.state.subRoughList || []}
                    label="Select Sub Packet"
                    light
                    disabled={preDefinedData?.factory_total_carat ? true : false}
                    onChange={(select) =>
                      setFieldValue("factorySubPacket", select.selectedItem)
                    }
                    titleText="Sub Packet"
                    type="default"
                  />
                  {console.log(values.factorySubPacket,"values.factorySubPacket ==> CreateSubPacket")}

                  {touched.factorySubPacket && errors.factorySubPacket ? (
                    <div className="error-message">{errors.factorySubPacket}</div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryIssueprocessName &&
                        errors.factoryIssueprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryIssueprocessName"
                    selectedItem={ preSelectedData?.process_name ? preSelectedData?.process_name : values.factoryIssueprocessName}
                    value={values.factoryIssueprocessName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="process-name-factory"
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
                        "factoryIssueprocessName",
                        select.selectedItem
                      )
                    }
                    titleText="Process Name"
                    type="default"
                  />
                  {console.log(values.factoryIssueprocessName,"values.factoryIssueprocessName ==> CreateSubPacket")}

                  {touched.factoryIssueprocessName &&
                    errors.factoryIssueprocessName ? (
                    <div className="error-message">
                      {errors.factoryIssueprocessName}
                    </div>
                  ) : null}
                </div>     

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <DropDownSelection
                    className={
                      touched.factoryIssueAssignName &&
                        errors.factoryIssueAssignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryIssueAssignName"
                    selectedItem={ preSelectedData?.assign_name ? preSelectedData?.assign_name : values.factoryIssueAssignName}
                    value={values.factoryIssueAssignName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="fatory-assign-name"
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
                        "factoryIssueAssignName",
                        select.selectedItem
                      )
                    }
                    titleText="Assignee Name"
                    type="default"
                  />
                  {console.log(values.factoryIssueAssignName,"values.factoryIssueAssignName ==> CreateSubPacket")}
                  {touched.factoryIssueAssignName &&
                    errors.factoryIssueAssignName ? (
                    <div className="error-message">
                      {errors.factoryIssueAssignName}
                    </div>
                  ) : null}
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryIssueCarat && errors.factoryIssueCarat
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryIssueCarat"
                    value={values.factoryIssueCarat}
                    id="factoryIssueCarat"
                    placeholder="enter Carat here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Carat :"
                    light={true}
                    onChange={(e) => {
                      if (Number(e.target.value) <= (values?.factorySubPacket?.remainingCarat || preDefinedData?.copyCarat) ){
                        handleChange(e)
                      }
                    }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {console.log(values.factoryIssueCarat,"values.factoryIssueCarat ==> CreateSubPacket")}
                  {touched.factoryIssueCarat && errors.factoryIssueCarat ? (
                    <div className="error-message">
                      {errors.factoryIssueCarat}
                    </div>
                  ) : null}
                </div>
              
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryIssuepcs && errors.factoryIssuepcs
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryIssuepcs"
                    value={values.factoryIssuepcs}
                    id="factoryIssuepcs"
                    placeholder="enter Pcs here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Piece :"
                    light={true}
                    onChange={(e) => {
                      setFieldValue("factoryIssuepcs", e.target.value)
                      let size = (e.target.value || 0) / (values.factoryIssueCarat || 0)
                      let yeild = (size || 0) / (values.factoryIssueCarat || 0)
                      setFieldValue("factoryPaketsize", size)
                      setFieldValue("factoryPaketYeild", yeild)

                      // handleChange(e)
                    }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {console.log(values.factoryIssuepcs,"values.factoryIssuepcs ==> CreateSubPacket")}
                  {touched.factoryIssuepcs && errors.factoryIssuepcs ? (
                    <div className="error-message">
                      {errors.factoryIssuepcs}
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
                    selectedItem={preSelectedData?.purity ? preSelectedData?.purity : values.factoryPacketPurity}
                    value={values.factoryPacketPurity}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="fatory-issue-purity"
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
                  {console.log(values.factoryPacketPurity,"values.factoryPacketPurity ==> CreateSubPacket")}

                  {touched.factoryPacketPurity && errors.factoryPacketPurity ? (
                    <div className="error-message">
                      {errors.factoryPacketPurity}
                    </div>
                  ) : null}
                </div>
              
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryPaketsize && errors.factoryPaketsize
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryPaketsize"
                    value={values.factoryPaketsize}
                    id="factoryPaketsize"
                    placeholder="enter Size here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Size :"
                    light={true}
                    disabled={true}

                    // onChange={() => {

                    //   setFieldValue("factoryPaketsize", (values.factoryIssuepcs || 0) / (values.factoryIssueCarat || 0))

                    // }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    // required
                    type="number"
                  />
                  {touched.factoryPaketsize && errors.factoryPaketsize ? (
                    <div className="error-message">
                      {errors.factoryPaketsize}
                    </div>
                  ) : null}
                </div>
                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"}>
                  <TextField
                    className={
                      touched.factoryPaketYeild && errors.factoryPaketYeild
                        ? "error"
                        : "bx--col"
                    }
                    name="factoryPaketYeild"

                    value={values.factoryPaketYeild}
                    id="factoryPaketYeild"
                    placeholder="enter Yeild here"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Yeild :"
                    light={true}
                    disabled={true}
                    // onChange={() => {
                    //   setFieldValue("factoryPaketYeild", (values.factoryPaketsize || 0) / (values.factoryIssueCarat || 0))
                    // }}  
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    // required
                    type="number"
                  />
                  {touched.factoryPaketYeild && errors.factoryPaketYeild ? (
                    <div className="error-message">
                      {errors.factoryPaketYeild}
                    </div>
                  ) : null}
                </div>

                {/* <div className="assign-headding-wrapper">
                  <h5 className="h5-form-label">
                    Packet Id : <span style={{ color: "#0F61FD" }}>#PID001</span>
                  </h5>
                  <h5 className="h5-form-label">
                    Total Carat : <span style={{color: "#0F61FD"}}>{this.props.totalFactoryCarat}</span>
                  </h5>
                  <h5 className="h5-form-label">
                    Remaining Carat :
                    <span style={{color: "#E7301C"}}>{values?.factorySubPacket?.remainingCarat || 0}</span>
                  </h5>
                </div> */}

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"} style={{ marginTop: "2%"}}>
                  <h5 className="h5-form-label">
                    Total Carat : <span style={{color: "#0F61FD"}}>{this.props.totalFactoryCarat}</span>
                  </h5>
                </div>

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"} style={{ marginTop: "2%"}}>
                  <h5 className="h5-form-label">
                    Packet Id : <span style={{ color: "#0F61FD" }}>#PID001</span>
                  </h5>
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
                          // if (Number(e.target.value) <= Number(this.state.remaining) && Number(e.target.value) >= 0) {
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

                <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-4"} style={{ marginTop: "2%"}}>
                  <h5 className="h5-form-label">
                    Remaining Carat : <span style={{color: "#E7301C"}}>{Data?.copyCarat ? (Data?.copyCarat) : (values?.factorySubPacket?.remainingCarat || 0)}</span>
                  </h5>
                </div>

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
                    disabled={ (values.factoryIssueRoughId 
                              && values.factoryPaketcreateDate 
                              && values.factorySubPacket 
                              && values.factoryIssueprocessName 
                              && values.factoryIssueAssignName 
                              && values.factoryIssueCarat 
                              && values.factoryIssuepcs 
                              && values.factoryPacketPurity) ? isSubmitting : true
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div >
    );
  }
}

export default CreateSubPacket;
