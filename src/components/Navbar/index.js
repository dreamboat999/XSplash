import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import s from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import Search from "../Form";
import Filters from "../Filters";
import RenderIf from "../../utils/renderIf";
import { useMatch } from "../../hooks/useMatch";

const Navbar = () => {
  const matches = useMatch();
  const [isPhotoUrl, setIsPhotoUrl] = useState(false);
  const url = window.location.pathname.split("/");
  const location = useLocation();

  useEffect(() => {
    if (url[1] === "photos") {
      setIsPhotoUrl(true);
    } else {
      setIsPhotoUrl(false);
    }
  }, [url, location]);

  return (
    <div className={s.navbar_outer}>
      <div className={s.navbar_inner}>
        <a href="/" className={s.navbar_logo}>
          <Logo />
        </a>
        <RenderIf isTrue={!matches}>
          <Search />
        </RenderIf>
        <RenderIf isTrue={matches && isPhotoUrl}>
          <Search changeStyles />
        </RenderIf>
      </div>
      <RenderIf isTrue={isPhotoUrl}>
        <Filters />
      </RenderIf>
    </div>
  );
};

export default Navbar;
