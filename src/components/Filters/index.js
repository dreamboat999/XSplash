import React from "react";

import s from "./filters.module.scss";
import Dropdown from "../Dropdown";

const Filters = () => {
  return (
    <div className={s.filters}>
      <Dropdown title="Any orientation">
        <div className={s.items}>
          <button>Landscape</button>
          <button>Portrait</button>
          <button>Square</button>
        </div>
      </Dropdown>
      <Dropdown title="Sort">
        <div className={s.items}>
          <button>Relevance</button>
          <button>Newest</button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filters;
