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
// import { Tab } from "carbon-components-react";
// import TabView from "../Common/Tabs";

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
    };
  }

  handelSubmit = (value) => {
    console.log('Returnvalue', value, this.state)
    this.props.close();
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


    this.props.returnOfficePacket(data).then((data) => {
    }).catch((e) => {
      console.log('e', e)
    })
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
      <div style={{marginBottom: "5%"}}>
        <Formik
          initialValues={{
            officeReturnCaratId: "",
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
                    selectedItem={values.officeReturnCaratId}
                    value={values.officeReturnCaratId}
                    // itemToString={(item) => (item ? item.text : "")}
                    id="office-rough-list-issue"
                    items={items}
                    label="Select Rough"
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
                <div className="bx--col-md-2">
                  <label className="bx--label"> AvailableRough: </label>
                  <p>{`${(values.copyCarat || 0).toFixed(4)}`}</p>
                  <label className="bx--label $code-01">{`${values.returned == false ? "All Rough Is Not Returned From Sawing/Chapka" : ""}`}</label>
                </div>
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
          )}
        </Formik>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps, {getRoughPrefrence, returnOfficePacket, getOfficeSubList})(
  ReturnOfficeRough
);
