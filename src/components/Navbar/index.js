import React from "react";

import s from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

const Navbar = () => {
  return (
    <div className={s.navbar_outer}>
      <div className={s.navbar_inner}>
        <a href="/" className={s.navbar_logo}>
          <Logo />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
