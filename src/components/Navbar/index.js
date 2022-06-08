import React from "react";

import s from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import Search from "../Search";
import RenderIf from "../../utils/renderIf";
import { useMatch } from "../../utils/useMatch";

const Navbar = () => {
  const matches = useMatch();

  return (
    <div className={s.navbar_outer}>
      <div className={s.navbar_inner}>
        <a href="/" className={s.navbar_logo}>
          <Logo />
        </a>
        <RenderIf isTrue={!matches}>
          <Search />
        </RenderIf>
      </div>
    </div>
  );
};

export default Navbar;
