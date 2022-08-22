import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import s from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import Form from "../Form";
import clsx from "clsx";

const Navbar = () => {
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const url = location.pathname.split("/")[1];

  useEffect(() => {
    if (url === "photos") {
      setIsSearchPage(true);
    }
  }, [url, location]);

  return (
    <div className={clsx(s.navbar_outer, { [s.remove_shadow]: isSearchPage })}>
      <div className={s.navbar_inner}>
        <a href="/" className={s.navbar_logo}>
          <Logo />
        </a>
        <Form isNavbarForm />
      </div>
    </div>
  );
};

export default Navbar;
