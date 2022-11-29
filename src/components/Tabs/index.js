import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import s from "./tabs.module.scss";
import { MdPhoto, MdPhotoLibrary } from "react-icons/md";

const tabs = [
  {
    icon: <MdPhoto />,
    title: "Photos",
    value: "photos",
  },
  {
    icon: <MdPhotoLibrary />,
    title: "Collections",
    value: "collections",
  },
];

const Tabs = ({ name, tab, children }) => {
  const link = (value) => {
    const isPhotos = `/photos/${name}/relevant`;
    const isCollections = `/${value}/${name}`;

    if (value === "photos") {
      return isPhotos;
    } else if (value === "collections") {
      return isCollections;
    }
  };

  return (
    <div className={s.tabs_outer}>
      <div className={s.tabs_inner}>
        {tabs.map((el, i) => {
          return (
            <Link
              key={i}
              to={link(el.value)}
              className={clsx(s.tab, { [s.active]: el.value === tab })}
            >
              {el.icon}
              <div>{el.title}</div>
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default Tabs;
