import React from "react";

import s from "./tabs.module.scss";
import { MdPhoto } from "react-icons/md";

const tabsList = [
  {
    title: "Photos",
    icon: <MdPhoto />,
  },
];

const Tabs = ({ children, style }) => {
  return (
    <div className={s.tabs_outer} style={style}>
      <div className={s.tabs_inner}>
        {tabsList.map((el, i) => {
          return (
            <div key={i} className={s.tab}>
              <div className={s.tab_icon}>{el.icon}</div>
              <div className={s.tab_title}>{el.title}</div>
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default Tabs;
