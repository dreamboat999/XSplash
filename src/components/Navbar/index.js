import React from "react";
import styles from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

const { navbar_outer, navbar_inner, navbar_logo } = styles;

const Navbar = () => {
  return (
    <div className={navbar_outer}>
      <div className={navbar_inner}>
        <a href="/" className={navbar_logo}>
          <Logo />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
