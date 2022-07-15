import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import ImageModal from "./components/ImageModal";
import RenderIf from "./utils/renderIf";

const App = () => {
  const { isImageModal } = useSelector((state) => state.appState);

  useEffect(() => {
    if (isImageModal) {
      document.querySelector("body").className = "disable_scroll";
    } else {
      document.querySelector("body").className = "";
    }
  }, [isImageModal]);

  return (
    <main>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/photos/:name" children={<Search />} />
        </Switch>
      </Router>
      <RenderIf isTrue={isImageModal}>
        <ImageModal />
      </RenderIf>
    </main>
  );
};

export default App;
