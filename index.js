import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import setupStore from "./setupStore";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = setupStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
