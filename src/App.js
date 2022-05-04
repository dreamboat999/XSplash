import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/photos/:name" children={<Search />} />
      </Switch>
    </Router>
  );
};

export default App;
