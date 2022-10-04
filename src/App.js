import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useAppContext } from "./context";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import User from "./pages/User";
import ImageModal from "./components/ImageModal";
import RenderIf from "./utils/renderIf";

const App = () => {
  const { isOpenModal } = useAppContext();

  return (
    <main>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/photos/:name/:sort/:orientation?"
            children={<Search />}
          />
          <Route path="/@:username" children={<User />} />
        </Switch>
        <RenderIf isTrue={isOpenModal}>
          <ImageModal />
        </RenderIf>
      </Router>
    </main>
  );
};

export default App;
