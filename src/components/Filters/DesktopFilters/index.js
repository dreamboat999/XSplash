import React from "react";
import { useHistory } from "react-router-dom";

import s from "./desktop.module.scss";
import { MdCheck, MdPhoto } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { orientationData, sortData } from "../FiltersData";

import Dropdown from "../../Dropdown";
import useMatch from "../../../hooks/useMatch";
import RenderIf from "../../../utils/renderIf";

const DesktopFilters = ({ name, orientation, sort, handleOpenModal }) => {
  const match = useMatch();
  const history = useHistory();

  const sortTitle = sortData.find((el) => sort === el.value);

  const orientationTitle = orientationData.find(
    (el) => orientation === el.value
  );

  const handleClick = (url) => {
    history.push(url);
  };

  return (
    <div className={s.desktop_filters}>
      <div className="photos_outer">
        <div className="photos_inner">
          <div className="photos">
            <MdPhoto />
            <div>Photos</div>
          </div>
        </div>
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
                  <button
                    key={i}
                    className={selected ? "selected" : ""}
                    onClick={() => handleClick(url)}
                  >
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    <RenderIf isTrue={el.value}>
                      <div className={orientationIcon} />
                    </RenderIf>
                    {el.title}
                  </button>
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
                  <button
                    key={i}
                    className={selected ? "selected" : ""}
                    onClick={() => handleClick(url)}
                  >
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    {el.title}
                  </button>
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
      </div>
    </div>
  );
};

export default DesktopFilters;
