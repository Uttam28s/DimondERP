import React, { Component } from "react";
import { Form, FormGroup, TextInput, Button } from "carbon-components-react";
import { Help16 } from "@carbon/icons-react";

export default class RightSideForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plan: "",
    };
  }

  handelSubmit = (e) => {
    e.preventDefault();
    console.log("e", this.state);
    this.props.onClickNotHavePassword();
  };

  handelOnchange = (e) => {
    // console.log("RightSideForm -> handelOnchange -> e", e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handelRadio = (e) => {
    this.setState({
      plan: e,
    });
  };

  // handelPlanSelect = (e) => {
  //   console.log("sdas", e);
  // };

  render() {
    return (
      <div className="sign_up_form_wrappper">
        <Form onSubmit={this.handelSubmit}>
          <div className="sign_up_form_div">
            <FormGroup className="signup_form_single_element">
              <TextInput
                light
                name="admin"
                // className="some-class"
                id="name"
                invalidText="Enter Admin Name"
                labelText="Admin Name"
                placeholder="Placeholder text"
                onChange={this.handelOnchange}
              />
            </FormGroup>
            <FormGroup className="signup_form_single_element">
              <TextInput
                light
                name="company"
                id="company"
                invalidText="Enter Compoany name"
                labelText="Company Name"
                placeholder="Placeholder text"
                onChange={this.handelOnchange}
              />
            </FormGroup>
          </div>
          <div className="sign_up_form_div">
            <FormGroup className="signup_form_single_element">
              <TextInput
                light
                name="mobile"
                id="mobile"
                invalidText="Enter Mobile Number"
                labelText="Mobile Number"
                placeholder="Placeholder text"
                onChange={this.handelOnchange}
              />
            </FormGroup>
            <FormGroup className="signup_form_single_element">
              <TextInput
                light
                name="address"
                id="add"
                invalidText="Enter Company Address"
                labelText="Address"
                placeholder="Placeholder text"
                onChange={this.handelOnchange}
              />
            </FormGroup>
          </div>
          <div className="sign_up_form_div">
            <FormGroup className="signup_form_single_element">
              <TextInput
                light
                name="username"
                id="username"
                invalidText="Enter Username"
                labelText="User Name"
                placeholder="Placeholder text"
                onChange={this.handelOnchange}
              />
            </FormGroup>
            <FormGroup className="signup_form_single_element ">
              <TextInput.PasswordInput
                light
                name="password"
                id="pass"
                invalidText="Enter Password"
                labelText="Password"
                placeholder="Enter Password"
                onChange={this.handelOnchange}
              />
            </FormGroup>
          </div>
          <p className="contact_for_more_info">
            <Help16 className="for_more_info_icon" /> For more contact us
          </p>
          <div className="form_submit_button_wrapper">
            <Button kind="primary" type="submit">
              Submit
            </Button>
            <Button kind="secondary" type="submit">
              cancel
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
