import React, {Component} from "react";
import {Form} from "carbon-components-react";
import {Formik} from "formik";
import * as Yup from "yup";
// import TextField from "../Common/CommonComponents";
// import { sumObjValuses } from "../../js/Helper";
import ReturnRoughTable from "./ReturnRoughTable";
import {DateSelection, DropDownSelection} from "../Common/CommonComponents";
import {connect} from "react-redux";
import {getRoughPrefrence} from "../../Actions/Rough";
import {returnOfficePacket} from "../../Actions/Office";
import {getOfficeSubList} from "../../Actions/Office";
import moment from "moment";
import {toFixed4} from "../Common/helperFun";
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";
import ReactDataSheet from 'react-datasheet';
import {Button} from "carbon-components-react";
import "react-datasheet/lib/react-datasheet.css";
import TextField from "../Common/CommonComponents";
import { withRouter } from "react-router";

const validationSchema = Yup.object().shape({
  officeReturnCaratId: Yup.string().required("*Select Rough"),
  officeReturnOfficeId: Yup.string().required("*Select Office packet"),
  officePacketReturnDate: Yup.string().required("*Select Return Date"),
  // rate: Yup.string().required("*rate is required"),
  // piece: Yup.string().required("*piece is required"),
});
class ReturnOfficeRough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      officeRetunrData: {
        fiveCarat: null,
        fivePrice: null,
        chockiCarat: null,
        chockiPrice: null,
        singleCarat: null,
        singlePrice: null,
        nofourCarat: null,
        nofourPrice: null,
        laserCarat: null,
        ghatCarat: null,
        makeableCarat: null,
        laserPrice: null,
        ghatPrice: null,
        makeablePrice: null,
        outCarat: null,
        outPrice: null,
      },
      sumOfSorting: 0,
      sumOfCarat: 0,
      sumOfAmount: 0,
      officeIdList: [],
      preSelectedData: "",
    };
  }

  componentDidMount = () => {
    if (this.props.preSelectedData) {
      this.setState({ preSelectedData: this.props.preSelectedData });
    }
  }

  handelSubmit = (value) => {
    console.log('Returnvalue', value, this.state)
    // this.props.close();
    let state = this.state

    console.log('data', value.officePacketReturnDate)



    let data = {
      rough_id: value.officeReturnOfficeId.id,
      office_id: value.officeReturnCaratId.id,
      mackable: state.officeRetunrData.makeableCarat || 0,
      // mackable:officeRetunrData.makeableCarat,
      // total_sorting_carat:officeRetunrData.sumOfCarat-officeRetunrData.makeableCarat,
      sortingData: state.officeRetunrData,
      sumOfSortingCarat: state.sumOfSortingCarat,
      createDate: moment(value.officePacketReturnDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    }


    // this.props.returnOfficePacket(data).then((data) => {
    // }).catch((e) => {
    //   console.log('e', e)
    // })

    this.props.handelReturnOffice(data)
  };

  handelOnChange = (e) => {
    const {
      fiveCarat,
      fivePrice,
      chockiCarat,
      chockiPrice,
      singleCarat,
      singlePrice,
      nofourCarat,
      nofourPrice,
      laserCarat,
      ghatCarat,
      makeableCarat,
      laserPrice,
      ghatPrice,
      makeablePrice,
      outCarat,
      outPrice,
    } = this.state.officeRetunrData;

    this.setState(
      {
        officeRetunrData: {
          ...this.state.officeRetunrData,
          [e.target.name]: Number(parseFloat(e.target.value)) || null,
        },
      },
      () => {
        let sum = this.state.officeRetunrData.fiveCarat +
          this.state.officeRetunrData.chockiCarat +
          this.state.officeRetunrData.singleCarat +
          this.state.officeRetunrData.nofourCarat +
          this.state.officeRetunrData.laserCarat +
          this.state.officeRetunrData.ghatCarat +
          this.state.officeRetunrData.makeableCarat +
          this.state.officeRetunrData.outCarat
        this.setState({
          sumOfCarat: sum,
          sumOfSortingCarat: sum - this.state.officeRetunrData.makeableCarat,
          sumOfAmount:
            this.state.officeRetunrData.fivePrice *
            this.state.officeRetunrData.fiveCarat +
            this.state.officeRetunrData.chockiPrice *
            this.state.officeRetunrData.chockiCarat +
            this.state.officeRetunrData.singlePrice *
            this.state.officeRetunrData.singleCarat +
            this.state.officeRetunrData.nofourPrice *
            this.state.officeRetunrData.nofourCarat +
            this.state.officeRetunrData.laserPrice *
            this.state.officeRetunrData.laserCarat +
            this.state.officeRetunrData.ghatPrice *
            this.state.officeRetunrData.ghatCarat +
            this.state.officeRetunrData.makeablePrice *
            this.state.officeRetunrData.makeableCarat +
            this.state.officeRetunrData.outPrice *
            this.state.officeRetunrData.outCarat,
        });
      }
    );
  };

  handelChangeRough = (data) => {
    this.props
      .getRoughPrefrence({roughId: data === null ? 0 : data.id})
      .then((res) => {
        console.log("CreateOfficePacket -> handelChangeRough -> res", data.id, res);
        this.setState({
          officeIdList: res.commonGet.officeDetails,
        });
      })
      .catch((e) => console.log(e));
  };

  handelData = () => {};

  clearState = () => {
    this.setState({})
  }

  render() {
    const {preSelectedData} = this.props

    let items = [];
    //  console.log('this.props.caratList', this.props.caratList)
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
        copyCarat: value.copyCarat
      })
    );
    return (
      <div style={{marginBottom: "1%"}}>
        <Formik
          initialValues={{
            officeStartInputValue: "",
            officeEndInputValue: "",
            officeReturnCaratId: preSelectedData?.carat || "",
            officeReturnOfficeId: "",
            officePacketReturnDate: "",
            copyCarat: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            // console.log("AddRoughModal -> render -> values", values);
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
                <div className="bx--col-md-2">
                  <DropDownSelection
                    className={
                      touched.officeReturnCaratId && errors.officeReturnCaratId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnCaratId"
                    selectedItem={ preSelectedData?.carat ? { label: preSelectedData?.carat } : values.officeReturnCaratId}
                    value={values.officeReturnCaratId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="office-rough-list-issue"
                    items={items}
                    label="Select Rough"
                    disabled={preSelectedData?.carat ? true : false}
                    light
                    onChange={(select) => {
                      setFieldValue("officeReturnCaratId", select.selectedItem || "");
                      this.handelChangeRough(select.selectedItem);
                      setFieldValue("officeReturnOfficeId", "");
                      setFieldValue("copyCarat", "")
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
                  {console.log(values.officeReturnCaratId,"values.officeReturnCaratId ==> ReturnOfficeRough.js")}
                  {touched.officeReturnCaratId && errors.officeReturnCaratId ? (
                    <div className="error-message">
                      {errors.officeReturnCaratId}
                    </div>
                  ) : null}
                </div>

                <div className="bx--col-md-2">
                  <DropDownSelection
                    className={
                      touched.officeReturnOfficeId &&
                        errors.officeReturnOfficeId
                        ? "error"
                        : "bx--col dropdown-padding"
                    }
                    name="officeReturnOfficeId"
                    selectedItem={values.officeReturnOfficeId}
                    value={values.officeReturnOfficeId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="order-buyer-name"
                    items={officeItem}
                    label="Select Office Packet"
                    light
                    onChange={(select) => {
                      setFieldValue("officeReturnOfficeId", select.selectedItem || "");
                      setFieldValue("copyCarat", select.selectedItem?.copyCarat || "")
                      this.setState({availCarat: select.selectedItem?.copyCarat})
                      select.selectedItem?.id && this.props
                        .getOfficeSubList({officeID: select.selectedItem.id, checkStatus: true, })
                        .then((res) => {
                          setFieldValue("returned", res.returned)
                        })
                        .catch((e) => console.log(e));
                      // this.props.selectedId(select.selectedItem.id);
                      // this.handelSelectedId(
                      //   select.selectedItem ? select.selectedItem.id : 0
                      // );
                    }}
                    titleText="Office Packet"
                    type="default"
                  />
                  {console.log(values.officeReturnOfficeId,"values.officeReturnOfficeId ==> ReturnOfficeRough.js")}
                  {touched.officeReturnOfficeId &&
                    errors.officeReturnOfficeId ? (
                    <div className="error-message">
                      {errors.officeReturnOfficeId}
                    </div>
                  ) : null}
                </div>

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

                      setFieldValue("officePacketReturnDate", formateDate);
                    }}
                    id="office-packet-create-date"
                    placeholder="dd/mm/yyyy"
                    labelText="Create packet Date"
                    className={
                      touched.officePacketReturnDate &&
                        errors.officePacketReturnDate
                        ? "error"
                        : "bx--col"
                    }
                    dateid="office-packet-id"
                    name="officePacketReturnDate"
                    value={values.officePacketReturnDate}
                    onBlur={handleBlur}
                  />
                  {touched.officePacketReturnDate &&
                    errors.officePacketReturnDate ? (
                    <div className="error-message">
                      {errors.officePacketReturnDate}
                    </div>
                  ) : null}
                </div>

                <div className="bx--col-md-1">
                  <label className="bx--label" style={{ fontSize:"14px" }}> AvailableRough: </label>
                  <p>{`${toFixed4(values.copyCarat || 0)}`}</p>
                  <label className="bx--label $code-01" style={{color:"red"}} >{`${values.returned == false ? "All Rough Is Not Returned From Sawing/Chapka" : ""}`}</label>
                  {console.log(values.returned,"values.returned")}
                </div>

                <div style={{marginTop:"1%", marginBottom:"1%"}} className="bx--col-md-1">
                  {values.officeReturnOfficeId && values.returned == false &&
                    <Button
                      size="small"
                      style={{ marginTop: "10px" }}
                      onClick={() => {this.props.history.push({ pathname: `/office/subpacket/${values.officeReturnOfficeId?.id}` })}}
                    >
                      View Sub-Packet
                    </Button>
                  }
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
                    
                    <div className={this.props.modelSheet ? "bx--col-md-2" : "bx--col-md-3"}>
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
                    {console.log(typeof(values.officeEndInputValue),"values.officeEndInputValue")}
                    {console.log(typeof(values.officeStartInputValue),"values.officeStartInputValue")}

                    <div style={{marginTop:"1%", marginBottom:"1%"}} className="bx--col-md-2">
                      <Button
                        size="small"
                        style={{ marginTop: "10px" }}
                        // onClick={this.props.openSheet}
                        onClick={() => {this.props.openSheet(values.officeStartInputValue,values.officeEndInputValue)}}
                        disabled={ values.officeEndInputValue <= values.officeStartInputValue ? true : false}
                      >
                        Manage DataSheet
                      </Button>
                    </div>
                  </>
                } 
              </div>

              <div>
                <ReturnRoughTable
                  handelOnChange={this.handelOnChange}
                  value={this.state.officeRetunrData}
                />
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

              <div className={this.props.modelSheet ? "dataSheetStyle" : ""}>
                <div className='sheet-Container' style={{marginBottom:"5%"}}>
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
                  className={"bx--btn bx--btn--primary"}
                  type="submit"
                  disabled={(values.returned && values.officeReturnCaratId?.label && (values?.copyCarat == this.state.sumOfCarat)) ? isSubmitting : true}
                >
                  Save
                </button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps, {getRoughPrefrence, returnOfficePacket, getOfficeSubList})(
  withRouter(ReturnOfficeRough)
);