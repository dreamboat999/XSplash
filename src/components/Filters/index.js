import React from "react";

import s from "./filters.module.scss";
import Dropdown from "../Dropdown";

const Filters = () => {
  return (
    <div className={s.filters}>
      <Dropdown title="Any orientation">
        <div className={s.items}>
          <a href="#">Landscape</a>
          <a href="#">Portrait</a>
          <a href="#">Square</a>
        </div>
      </Dropdown>
      <Dropdown title="Sort">
        <div className={s.items}>
          <a href="#">Relevance</a>
          <a href="#">Newest</a>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filters;
