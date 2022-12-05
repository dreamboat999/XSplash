import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAppContext } from "./context";
import Home from "./pages/Home";
import Images from "./pages/Images";
import Collections from "./pages/Collections";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Modal from "./UI/Modal";
import SingleCollection from "./pages/SingleCollection";

const App = () => {
  const { modalProps } = useAppContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/photos/:name/:sort" element={<Images />} />
        <Route path="/photos/:name/:sort/:orientation" element={<Images />} />
        <Route path="/collections/:name" element={<Collections />} />
        <Route path="/collections/:id/:name" element={<SingleCollection />} />

        <Route path="/@:username" element={<User />} />
      </Routes>
      <Modal isFilterModal={modalProps.type === "filterModal"} />
    </Router>
  );
};

export default App;
