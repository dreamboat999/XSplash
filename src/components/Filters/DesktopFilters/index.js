import React from "react";
import { Link } from "react-router-dom";

import s from "./desktop.module.scss";
import { MdCheck } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { orientationData, sortData } from "../FiltersData";

import Dropdown from "../../Dropdown";
import useMatch from "../../../hooks/useMatch";
import RenderIf from "../../../utils/renderIf";
import Tabs from "../../Tabs";

const DesktopFilters = ({ name, orientation, sort, handleOpenModal }) => {
  const match = useMatch();

  const sortTitle = sortData.find((el) => sort === el.value);

  const orientationTitle = orientationData.find(
    (el) => orientation === el.value
  );

  return (
    <div className={s.desktop_filters}>
      <Tabs>
        <RenderIf isTrue={match}>
          <div className={s.filters}>
            <Dropdown title={orientationTitle?.title}>
              {orientationData.map((el, i) => {
                const selected = orientation === el.value;
                const url = `/photos/${name}/${sort}${
                  el.value ? `/${el.value}` : ""
                }`;
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
            <Dropdown title={`Sort by ${sortTitle.title}`}>
              {sortData.map((el, i) => {
                const selected = sort === el.value;
                const url = `/photos/${name}/${el.value}${
                  orientation ? `/${orientation}` : ""
                }`;

                return (
                  <Link key={i} to={url} className={selected ? "selected" : ""}>
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    {el.title}
                  </Link>
                );
              })}
            </Dropdown>
          </div>
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
