import React from "react";
import ReactDOM from "react-dom";

import AppContextProvider from "./context";

import App from "./App";
import "./assets/styles/global.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
