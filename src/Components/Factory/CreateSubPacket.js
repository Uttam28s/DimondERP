import React, { Component } from "react";
import { Form } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
import {result} from "lodash";
import {date} from "joi";
import moment from "moment";
import {endsWith} from "lodash";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

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
  roughName: Yup.string().required("RoughName  Size is required")
});
class CreateSubPacket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      toggle: false
    };
  }

  componentDidMount() {
    // this.setState({
    //   items: this.props.caretList?.map((data) => {
    //     return { id: data._id, label: data.carat.toString() }
    //   })
    // })
  }
  componentDidUpdate(preProps) {
    // if (preProps.caretList.length !== this.props.caratList.length) {
    //   this.setState({ toggle: !this.state.toggle });
    // }
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


  getFactoryRoughList = (id) => {
    this.props.getFactoryList({roughId: id}).then((result) => {
      console.log('result', result)
      this.setState({
        subRoughList: result?.data?.map((data) => {
          return {id: data._id, label: data.factory_total_carat.toString(), remainingCarat: data.copyCarat == 0 ? "0" : (data.copyCarat || data.factory_total_carat.toString())}
        }) || [],
      })
    }).catch((err) => {});
  }


  clearState = () => {
    this.setState({subRoughList: []});
  }



  render() {
    const {items, subRoughList} = this.state
    return (
      <div style={{ marginBottom: "15%" }}>
        <Formik
          initialValues={{
            factoryIssueRoughId: "",
            factoryIssueAssignName: "",
            factoryIssueprocessName: "",
            factoryIssueCarat: "",
            factoryIssuepcs: "",
            factoryPaketcreateDate: "",
            factoryPacketPurity: "",
            factoryPaketsize: "",
            factoryPaketYeild: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            this.props.close();
            let data = {
              factory_id: values.roughName.id,
              process_name: values.factoryIssueprocessName,
              main_carat: Number(values.factoryIssueRoughId.label),
              assign_name: values.factoryIssueAssignName,
              factory_carat: Number(values.roughName.label),
              assign_carat: values.factoryIssueCarat,
              piece: values.factoryIssuepcs,
              purity: values.factoryPacketPurity,
              size: values.factoryPaketsize,
              yeild: values.factoryPaketYeild,
              assign_date: moment(values.factoryPaketcreateDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
            }
            console.log("???? ~ file: CreateSubPacket.js ~ line 110 ~ CreateSubPacket ~ render ~ data", Number(values.roughName.label), values.factoryIssueCarat, data)

            // this.props.createFactoryPacket(data).then((result) => {

            // }).catch((err) => {

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
              <div className="assign-headding-wrapper">
                <h5 className="h5-form-label">
                  Packet Id : <span style={{ color: "#0F61FD" }}>#PID001</span>
                </h5>
                <h5 className="h5-form-label">
                  Total Carat : <span style={{color: "#0F61FD"}}>{this.props.totalFactoryCarat}</span>
                </h5>
                <h5 className="h5-form-label">
                  Remaining Carat :
                  <span style={{color: "#E7301C"}}>{values?.roughName?.remainingCarat || 0}</span>
                </h5>
              </div>
              <div className="bx--row">
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
                  {
                    touched.factoryIssueRoughId && errors.factoryIssueRoughId ? (
                      <div className="error-message">
                        {errors.factoryIssueRoughId}
                      </div>
                    ) : null
                  }
                </div>
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

              </div>
              <div className="bx--row top-margin-model-input">



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
                    onChange={(select) =>
                      setFieldValue("roughName", select.selectedItem)
                    }
                    titleText="Rough Name"
                    type="default"
                  />
                  {touched.roughName && errors.roughName ? (
                    <div className="error-message">{errors.roughName}</div>
                  ) : null}
                </div>

                <div className="bx--col-md-4">

                  <DropDownSelection
                    className={
                      touched.factoryIssueprocessName &&
                        errors.factoryIssueprocessName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryIssueprocessName"
                    selectedItem={values.factoryIssueprocessName}
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
                  {touched.factoryIssueprocessName &&
                    errors.factoryIssueprocessName ? (
                    <div className="error-message">
                      {errors.factoryIssueprocessName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bx--row top-margin-model-input">

                <div className="bx--col-md-4">
                  <DropDownSelection
                    className={
                      touched.factoryIssueAssignName &&
                        errors.factoryIssueAssignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryIssueAssignName"
                    selectedItem={values.factoryIssueAssignName}
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
                  {touched.factoryIssueAssignName &&
                    errors.factoryIssueAssignName ? (
                    <div className="error-message">
                      {errors.factoryIssueAssignName}
                    </div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
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
                      if (Number(e.target.value) <= values?.roughName?.remainingCarat) {
                        handleChange(e)
                      }
                    }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.factoryIssueCarat && errors.factoryIssueCarat ? (
                    <div className="error-message">
                      {errors.factoryIssueCarat}
                    </div>
                  ) : null}
                </div>

              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
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
                  {touched.factoryIssuepcs && errors.factoryIssuepcs ? (
                    <div className="error-message">
                      {errors.factoryIssuepcs}
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
                <div className="bx--col-md-4">
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
      </div >
    );
  }
}

export default CreateSubPacket;
