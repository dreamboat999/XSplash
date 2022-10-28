import React from "react";
import ReactDOM from "react-dom";

import AppContextProvider from "./context";

import App from "./App";
import "./assets/styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
