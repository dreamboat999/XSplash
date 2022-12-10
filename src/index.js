import React from "react";
import ReactDOM from "react-dom/client";

import AppContextProvider from "./context";

import App from "./App";
import "./assets/styles/global.scss";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
