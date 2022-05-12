import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import ImageModal from "./components/ImageModal";

const App = () => {
  const { imageModal } = useSelector((state) => state.appState);

  useEffect(() => {
    if (imageModal.isOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "unset";
    }
  }, [imageModal.isOpen]);

  return (
    <div className="main">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/photos/:name" children={<Search />} />
        </Switch>
      </Router>
      {imageModal.isOpen ? <ImageModal /> : null}
    </div>
  );
};

export default App;
