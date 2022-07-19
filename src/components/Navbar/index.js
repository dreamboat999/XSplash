import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import s from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import Form from "../Form";
import RenderIf from "../../utils/renderIf";
import { useMatch } from "../../hooks/useMatch";

const Navbar = () => {
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const url = window.location.pathname.split("/");
  const match = useMatch();

  useEffect(() => {
    if (url[1] === "photos") {
      setIsSearchPage(true);
    }
  }, [url, location]);

  return (
    <div className={`${s.navbar_outer} ${isSearchPage ? s.remove_shadow : ""}`}>
      <div className={s.navbar_inner}>
        <a href="/" className={s.navbar_logo}>
          <Logo />
        </a>
        <RenderIf isTrue={!match}>
          <Form />
        </RenderIf>
        <RenderIf isTrue={match && isSearchPage}>
          <Form isSearchPage />
        </RenderIf>
      </div>
    </div>
  );
};

export default Navbar;
