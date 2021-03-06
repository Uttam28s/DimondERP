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

    this.state = {};
  }

  handelSubmit = (values) => {
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
  render() {
    return (
      <div style={{ marginBottom: "15%" }}>
        <Formik
          initialValues={{
            factoryReturnPacketId: "",
            factoryReturnAssignName: "",
            factoryReturnprocessName: "",
            factoryReturncarat: "",
            factoryReturnpiece: "",
            factoryPacketReturnDate: "",
            factoryReturnSize: "",
            factoryReturnYeild: "",
            factoryReturnProcessWeight: "",
            factoryReturnWeightlose: "",
        //    factoryReturnProcessID: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            console.log(" > render -> values", values);
            this.handelSubmit(values)
            this.props.close();
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
              <div className="assign-headding-wrapper">
                <h5 className="h5-form-label">
                  Assign Date :{" "}
                  <span style={{ color: "#0F61FD" }}>20/03/2020</span>
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
                      setFieldValue("factoryPacketReturnDate", formateDate);
                    }}
                    id="factory-packet-return-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
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





                <div className="bx--col-md-4">


                  <DropDownSelection
                    className={
                      touched.factoryIssueRoughId && errors.factoryIssueRoughId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryIssueRoughId"
                    selectedItem={values.factoryIssueRoughId}
                    value={values.factoryIssueRoughId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-rough-id"
                    items={this.props.caratList || []}
                    label="Select Rough id"
                    light
                    onChange={(select) => {
                      setFieldValue("factoryIssueRoughId", select.selectedItem);
                      setFieldValue("roughName", "")
                      this.clearState()
                      console.log('select.selectedItem', select.selectedItem)
                      select.selectedItem?.id && this.getFactoryRoughList(select.selectedItem.id)
                    }}
                    titleText="Rough"
                    type="default"
                  />



                </div>

                <div className="bx--col-md-4">
                  <DropDownSelection
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
                    items={this.state.subRoughList || []}
                    label="Select Rough name"
                    light
                    onChange={(select) => {
                      setFieldValue("roughName", select.selectedItem)
                      select?.selectedItem?.id && this.props.getFactorySubList({factory_id: select.selectedItem.id}).then((res) => {
                        console.log("???? ~ file: ReturnPacket.js ~ line 201 ~ ReturnSubPacket ~ select?.selectedItem?.id&&this.props.getFactorySubList ~ data", res)
                        this.setState({
                          subPacketData: res.data.map((val) => {
                            if (val.occupy_by !== "false") {
                              return {
                                id: val._id.toString(),
                                label: val.last_carat.toString(),
                                processName: val.occupy_by,
                                assign_name: val.all_process.filter((v) => v.process_name == val.occupy_by)[0].assign_name,
                                process_id: val.all_process.filter((v) => v.process_name == val.occupy_by)[0].process_carat_id,
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
                  {touched.roughName && errors.roughName ? (
                    <div className="error-message">{errors.roughName}</div>
                  ) : null}
                </div>

                <div className="bx--col-md-4">
                  {console.log('val.last_carat.toString()', this.state.subPacketData)}
                  <DropDownSelection
                    className={
                      touched.factoryReturnPacketId &&
                      errors.factoryReturnPacketId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnPacketId"
                    selectedItem={values.factoryReturnPacketId}
                    value={values.factoryReturnPacketId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="factory-retutn-packet-id"
                    items={this.state.subPacketData || []}
                    label="Select Packet id"
                    light
                    onChange={(select) =>
                    {
                      setFieldValue(
                        "factoryReturnPacketId",
                        select.selectedItem)
                      setFieldValue(
                        "factoryReturnprocessName",
                        select.selectedItem.processName);
                      setFieldValue(
                        "factoryReturnAssignName",
                        select.selectedItem.assign_name);

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
                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.factoryReturnAssignName &&
                      errors.factoryReturnAssignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnAssignName"
                    selectedItem={values.factoryReturnAssignName}
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
                {/* <div className="bx--col-md-3"></div> */}
                <div className="bx--col-md-4" style={{ marginTop: "4.5%" }}>
                  <h5 className="h5-form-label">
                    Total Weight lose :{" "}
                    <span style={{color: "#E7301C"}}>{values.factoryReturncarat && ((values?.factoryReturncarat || values?.factoryReturnPacketId?.label) / values?.factoryReturnPacketId?.label) || 0}%</span>
                  </h5>
                </div>
              </div>

              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
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
                      if (Number(e.target.value) <= Number(values.factoryReturnPacketId?.label)) {
                        handleChange(e)

                      }
                    }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.factoryReturncarat && errors.factoryReturncarat ? (
                    <div className="error-message">
                      {errors.factoryReturncarat}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
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
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  {console.log('values.factoryReturnPacketId', values.factoryReturnPacketId)}
                  <DropDownSelection
                    className={
                      touched.factoryReturnprocessName &&
                      errors.factoryReturnprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnprocessName"
                    selectedItem={values.factoryReturnprocessName}
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
                <div className="bx--col-md-4">
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
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
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
                <div className="bx--col-md-4">
                  {console.log("???? ~ file: ReturnPacket.js ~ line 483 ~ ReturnSubPacket ~ render ~ values.factoryReturnprocessName", values)}
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

export default connect(null, {returnFactorySubPacket, getFactorySubList})(ReturnSubPacket);
