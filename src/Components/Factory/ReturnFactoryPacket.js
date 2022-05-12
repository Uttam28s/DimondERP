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
import {returnFactorySubPacket, getFactorySubList,returnFactoryPacket} from "../../Actions/Factory";
import ReturnFactoryTable from "./ReturnFactoryTable";
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
      packetId: values.factoryReturnPacketId.id,
      factoryId:values.factoryPacket.id
      
    }
    console.log('valuesvaluesvaluesvalues', values)
  //  this.props.returnFactorySubPacket(data)

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
                <h6 className="h5-form-label">
                  Assign Date :{" "}
                  <span style={{ color: "#0F61FD" }}>20/03/2020</span>
                </h6>
                <h6 className="h5-form-label">
                  Assign Carat : <span style={{ color: "#0F61FD" }}>650.00</span>
                </h6>
                <h6 className="h5-form-label">
                  Remaining Carat :{" "}
                  <span style={{ color: "#E7301C" }}>#A01</span>
                </h6>
                <h6 className="h5-form-label">
                    Total Weight lose :{" "}
                    <span style={{color: "#E7301C"}}>{}%</span>
                  </h6>
              </div>
              <div className="bx--row">
                <div className="bx--col-md-2">
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





                <div className="bx--col-md-2">


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
                      // setFieldValue("factoryPacket", "")
                      // setFieldValue("factoryReturnPacketId", "")
                      // setFieldValue("factoryReturnProcessWeight", "")
                      this.setFormData(["factoryPacket", "factoryReturnPacketId", "factoryReturnProcessWeight"], setFieldValue)
                      this.clearState()
                      console.log('select.selectedItem', select.selectedItem)
                      select.selectedItem?.id && this.getFactoryRoughList(select.selectedItem.id)
                    }}
                    titleText="Rough"
                    type="default"
                  />



                </div>

                <div className="bx--col-md-2">
                  <DropDownSelection
                    className={
                      touched.factoryPacket && errors.factoryPacket
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryPacket"
                    selectedItem={values.factoryPacket}
                    value={values.factoryPacket}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="rough-name-office"
                    items={this.state.subRoughList || []}
                    label="Select Rough name"
                    light
                    onChange={(select) => {
                      setFieldValue("factoryReturnPacketId", "")
                      setFieldValue("factoryPacket", select.selectedItem)
                      this.setState({subPacketData: []})
                      select?.selectedItem?.id && this.props.getFactorySubList({factory_id: select.selectedItem.id,returnCheck:true}).then((res) => {
                        console.log("ReturnSubPacket ~ select?.selectedItem?.id&&this.props.getFactorySubList ~ data", res)
                        if(res.returnFlag){
                             this.setState({ packetEroor: true,returnPacket:res.data[0]  });
                        }else{
                          this.setState({ packetEroor: false  });

                        }
                      })
                    }
                    }
                    titleText="Rough Name"
                    type="default"
                  />
                  {touched.factoryPacket && errors.factoryPacket ? (
                    <div className="error-message">{errors.factoryPacket}</div>
                  ) : null}
                  {this.state.packetEroor==false && <div className="error-message">*This Packet is occupied by process</div>}
                </div>

                {/* <div className="bx--col-md-4">
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
                </div> */}
                <div className="bx--col-md-2">
                  <DropDownSelection
                    className={
                      touched.factoryReturnAssignName &&
                      errors.factoryReturnAssignName
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="factoryReturnAssignName"
                    selectedItem={this.state.returnPacket?.factory_assigne_name}
                    value={this.state.returnPacket?.factory_assigne_name}
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

            
              {/* <div className="bx--row top-margin-model-input">
                
                </div> */}
                <div className="bx--col-md-8">
                  <ReturnFactoryTable value={{fice:""}}/>
                </div>
                
              </div>
              <div className="assign-headding-wrapper">
                <h5 className="h5-form-label">
                  Total Sorting Carat :{" "}
                  <span style={{color: "#DA1E28"}}>
                    {this.state.sumOfCarat || 0}
                  </span>
                </h5>
                <h5 className="h5-form-label">
                  Total Amount :{" "}
                  <span style={{color: "#0D9F37"}}>
                    {this.state.sumOfAmount} /-
                  </span>
                </h5>
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
                {console.log('isSubmitting', isSubmitting)}
                <button
                  tabindex="0"
                  className="bx--btn bx--btn--primary"
                  type="submit"
                  disabled={!this.state.packetEroor || isSubmitting}
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

export default connect(null, {returnFactorySubPacket, getFactorySubList,returnFactoryPacket})(ReturnSubPacket);
