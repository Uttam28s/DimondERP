import React, { Component } from "react";
import SplashScreen from "./splashScreen";
import ZeonlabsLogo from "./zeonlabsLogo";
import RightSideForm from "./rightSideForm";
import SignInPage from "./signInPage";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true,
    };
  }

  onClickNotHavePassword = () => {
    this.setState({ login: !this.state.login });
  };

  render() {
    return (
      <div className="login_page_wrapper">
        <div className="left_side_wrapper">
          <div className="login_page_diamond_logo_wrapper">
            <SplashScreen />
          </div>
          <div className="message_text_wrapper">
            <h1 className="thankyou_text">Thank you for Sign Up!</h1>
            <p className="thanku_msg">
              Lorem ipsum dolor sit lorem a amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam.{" "}
            </p>
          </div>
          <div className="zeonlabs_logo_wrapper">
            <ZeonlabsLogo />
            <div className="all_right_reserve">
              <p>© All rights reserved Zeonlabs 2020</p>
            </div>
          </div>
        </div>
        <div className="right_side_wrapper">
          {this.state.login ? (
            <div className="right_side_inner_wrapper">
              <h2>Sign In</h2>{" "}
              <p>Please provide sufficient details to explore the system.</p>
              <SignInPage
                onClickNotHavePassword={this.onClickNotHavePassword}
              />
            </div>
          ) : (
            <div className="right_side_inner_wrapper">
              <h2>Sign Up</h2>{" "}
              <p>Please provide sufficient details to explore the system.</p>
              <RightSideForm
                onClickNotHavePassword={this.onClickNotHavePassword}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LoginPage;
