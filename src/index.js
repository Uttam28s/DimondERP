import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./Store/Store";
// import "../scss/style.scss";
import "./Scss/index.scss";
import App from "./App";
// import * as serviceWorker from "../public/service-Worker";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.register();
