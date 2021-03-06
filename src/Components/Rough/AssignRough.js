import React, { Component } from "react";
import { Form, Dropdown } from "carbon-components-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField, {
  DateSelection,
  DropDownSelection,
} from "../Common/CommonComponents";
import moment from "moment";
import {getUnusedView} from "../../Actions/Office";
import {textChangeRangeIsUnchanged} from "typescript";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

const validationSchema = Yup.object().shape({
  sortinRoughId: Yup.string().required("*Select Rough Id"),
  workPlace: Yup.string().required("*Work place is required"),
  assignName: Yup.string().required("*Assign Name is required"),
  carat: Yup.number().required("*carat is required"),
  assignRoughDate: Yup.string().required("*date is required"),
});
class AssignRough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableCaret: 0,
      remainingCarat: 0
    };
  }

  handelSubmit = (e) => {
  };

  handleChange = (e) => {
  };

  getRoughData = async (select, workName) => {
    await this.props.getUnusedList(select.id).then((data) => {
      console.log("🚀 ~ file: AssignRough.js ~ line 40 ~ AssignRough ~ awaitthis.props.getUnusedList ~ data", data)

      this.setState({
        availableCaret: workName == "Office" ? (Number(data?.data?.copyCarat == undefined ? select.label : data?.data.copyCarat)) : Number(data.data?.mackable) || 0,
        remainingCarat: workName == "Office" ? (Number(data?.data?.copyCarat == undefined ? select.label : data?.data.copyCarat)) : Number(data.data?.mackable) || 0
      })
    })
  }
  render() {
    const {availableCaret, remainingCarat} = this.state
    let items = [];
    this.props.caratList.map((value) =>
      items.push({ id: value._id, label: value.carat.toString() })
    );
    return (
      <div style={{ marginBottom: "15%" }}>
        <Formik
          initialValues={{
            sortinRoughId: "",
            workPlace: "",
            assignName: "",
            carat: "",
            assignRoughDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            const data = {
              rough_id: values.sortinRoughId.id,
              assign_date: moment(values.assignRoughDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
            };
            const officeData = {
              ...data,
              office_assigne_name: values.assignName,
              office_total_carat: values.carat,
            }
            const factoryData = {
              ...data,
              factory_assigne_name: values.assignName,
              factory_total_carat: values.carat,

            }

            values.workPlace === "Office" && this.props.handelAssignOffice(officeData);
            values.workPlace === "Factory" && this.props.handelAssignFactory(factoryData);
            this.props.close();
            setTimeout(() => {
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
              <div className="bx--row">
                <div className="bx--col-md-4">
                  <div className="rough-id-dropdown-wrapper">
                    <DropDownSelection
                      className={
                        touched.sortinRoughId && errors.sortinRoughId
                          ? "error"
                          : "bx--col dropdown-padding"
                      }
                      name="sortinRoughId"
                      selectedItem={values.sortinRoughId}
                      value={values.sortinRoughId}
                      // itemToString={(item) => (item ? item.text : "")}
                      id="order-buyer-name"
                      items={items}
                      label="Select Rough"
                      light
                      onChange={(select) => {
                        setFieldValue("sortinRoughId", select.selectedItem);
                        setFieldValue("carat", "")
                        setFieldValue("workPlace", "")
                        this.setState({availableCaret: 0, remainingCarat: 0})

                        // this.props.selectedId(select.selectedItem.id);
                      }}
                      titleText="Rough"
                      type="default"
                    />
                    {touched.sortinRoughId && errors.sortinRoughId ? (
                      <div className="error-message">
                        {errors.sortinRoughId}
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* <h5 className="h5-form-label">
                  Assign Id : <span style={{ color: "#0F61FD" }}>#AID001</span>
                </h5> */}
                <div className="bx--col-md-4">
                  <div className="assign-rough-date-wrapper">
                    <DateSelection
                      dateFormat="d/m/y"
                      datePickerType="single"
                      onChange={(date) => {
                        const basicDate = new Date(date);
                        const formateDate =
                          basicDate.getDate() +
                          "/" +
                          (basicDate.getMonth() + 1) +
                          "/" +
                          basicDate.getFullYear();
                        setFieldValue("assignRoughDate", formateDate);
                      }}
                      id="rough-purchase-date"
                      placeholder="dd/mm/yyyy"
                      labelText="Date"
                      className={
                        touched.assignRoughDate && errors.assignRoughDate
                          ? "error"
                          : "bx--col"
                      }
                      dateid="rough-purchas-date"
                      name="assignRoughDate"
                      value={values.assignRoughDate}
                      onBlur={handleBlur}
                    />
                    {touched.assignRoughDate && errors.assignRoughDate ? (
                      <div className="error-message">
                        {errors.assignRoughDate}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <Dropdown
                    ariaLabel="Dropdown"
                    className={
                      touched.workPlace && errors.workPlace
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="workPlace"
                    direction="bottom"
                    selectedItem={values.workPlace}
                    value={values.workPlace}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-workplace"
                    items={["Office", "Factory"]}
                    label="Select work place"
                    light
                    onChange={
                      (select) => {
                        setFieldValue("workPlace", select.selectedItem)
                        select.selectedItem && this.getRoughData(values.sortinRoughId, select.selectedItem)

                        // console.log('111111111111', select.selectedItem)

                      }
                      // setFieldValue("workPlace", select.selectedItem.text)
                      // console.log("AssignRough -> select", select)
                    }
                    titleText="Work Place"
                    type="default"
                  />
                  {touched.workPlace && errors.workPlace ? (
                    <div className="error-message">{errors.workPlace}</div>
                  ) : null}
                </div>
                <div className="bx--col-md-4">
                  <Dropdown
                    ariaLabel="Dropdown"
                    className={
                      touched.assignName && errors.assignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="assignName"
                    direction="bottom"
                    selectedItem={values.assignName}
                    value={values.assignName}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-assignee-name"
                    items={[
                      "RameshBhai",
                      "Test2",
                      "Test3",
                      "SureshBhai",
                      "Test 5",
                      "Test 6",
                    ]}
                    label="Select employee name"
                    light
                    onChange={(select) =>
                      setFieldValue("assignName", select.selectedItem)
                    }
                    titleText="Assign to Person"
                    type="default"
                  />
                  {touched.assignName && errors.assignName ? (
                    <div className="error-message">{errors.assignName}</div>
                  ) : null}
                </div>
                {/* <div className="bx--col-md-3"></div> */}
              </div>
              <div className="bx--row top-margin-model-input">
                <div className="bx--col-md-4">
                  <TextField
                    className={
                      touched.carat && errors.carat && !this.state.carat ? "error" : "bx--col"
                    }
                    name="carat"
                    value={values.carat}
                    id="rough-assign-carat"
                    // invalid={false}
                    invalidText="Please fill"
                    labelText="Carat :"
                    placeholder="enter carat here"
                    light={true}
                    onChange={(e) => {
                      if (Number(e.target.value) <= this.state.availableCaret) {
                        this.setState({
                          remainingCarat: Number(this.state.availableCaret) - (Number(e.target.value))
                        })
                        return (handleChange(e))
                      }
                    }}
                    onBlur={handleBlur}
                    // onClick={function noRefCheck() {}}
                    required
                    type="number"
                  />
                  {touched.carat && errors.carat && !this.state.carat ? (
                    <div className="error-message">{errors.carat}</div>
                  ) : null}
                </div>

                <div className="bx--col-md-4">
                  {/*               
                <div className="bx--col-md-3"> */}
                  <p style={{ marginTop: "6%" }}>
                    Remaining Carat :{" "}
                    <span style={{color: "#FF3D00"}}>{remainingCarat?.toFixed(4) || 0}</span>
                  </p>
                  <p style={{marginTop: "6%"}}>
                    Available Carat :{" "}
                    <span style={{color: "#FF3D00"}}>{availableCaret?.toFixed(4)}</span>
                  </p>
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
                  className="bx--btn bx--btn--primary "
                  type="submit"
                  disabled={this.state.availableCaret ? isSubmitting : true}
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

export default AssignRough;
