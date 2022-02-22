import React, { Component } from "react";
import { Form, FormGroup, TextInput, Button } from "carbon-components-react";
import { Help16, Password16 } from "@carbon/icons-react";
import { withRouter } from "react-router";

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handelSubmit = (e) => {
    e.preventDefault();
    console.log("e", this.state);
    this.props.history.push("/dashboard");
  };

  handelOnchange = (e) => {
    // console.log("RightSideForm -> handelOnchange -> e", e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // handelPlanSelect = (e) => {
  //   console.log("sdas", e);
  // };

  render() {
    return (
      <div className="sign_up_form_wrappper">
        <Form onSubmit={this.handelSubmit}>
          {/* <div className="sign_up_form_div"> */}
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
          {/* </div> */}
          <div className="sign_in_page_links_wrapper">
            <p className="contact_for_more_info">
              <Help16 className="for_more_info_icon" /> For more contact us
            </p>
            <p
              className="contact_for_more_info"
              onClick={this.props.onClickNotHavePassword}
            >
              <Help16 className="for_more_info_icon" /> Don't have account ??
            </p>
            <p className="contact_for_more_info">
              <Password16 className="for_more_info_icon" /> Forgot Password
            </p>
          </div>
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

export default withRouter(SignInPage);
