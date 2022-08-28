import React from "react";
import { Link } from "react-router-dom";

import s from "./desktop.module.scss";
import { MdCheck } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";

import Dropdown from "../../Dropdown";
import useMatch from "../../../hooks/useMatch";
import RenderIf from "../../../utils/renderIf";
import Tabs from "../../Tabs";

const orientationData = [
  {
    title: "Any Orientation",
  },
  {
    title: "Landscape",
    value: "landscape",
  },
  {
    title: "Portrait",
    value: "portrait",
  },
  {
    title: "Square",
    value: "squarish",
  },
];

const DesktopFilters = ({ name, orientation, handleOpenModal }) => {
  const match = useMatch();

  const orientationTitle = orientationData.find(
    (el) => orientation === el.value
  );

  return (
    <div className={s.desktop_filters}>
      <Tabs>
        <RenderIf isTrue={match}>
          <Dropdown title={orientationTitle?.title}>
            {orientationData.map((el, i) => {
              const selected = orientation === el.value;
              const url = `/photos/${name}${el.value ? `/${el.value}` : ""}`;
              const orientationIcon = `orientation orientation__${el.value}`;

              return (
                <Link key={i} to={url} className={selected ? "selected" : ""}>
                  <RenderIf isTrue={selected}>
                    <MdCheck />
                  </RenderIf>
                  <RenderIf isTrue={el.value}>
                    <div className={orientationIcon} />
                  </RenderIf>
                  {el.title}
                </Link>
              );
            })}
          </Dropdown>
        </RenderIf>

        <RenderIf isTrue={!match}>
          <button className={s.mobile_filters_button} onClick={handleOpenModal}>
            <IoMdOptions />
          </button>
        </RenderIf>
      </Tabs>
    </div>
  );
};

export default DesktopFilters;
