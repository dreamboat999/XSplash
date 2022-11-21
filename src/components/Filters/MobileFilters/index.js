import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import s from "./mobile.module.scss";
import { MdCheck, MdOutlineClose } from "react-icons/md";
import { orientationData, sortData } from "../FiltersData";

import RenderIf from "../../../utils/renderIf";

const Filter = ({ title, children }) => {
  return (
    <div className={s.filter}>
      <h3 className={s.filter_title}>{title}</h3>
      <ul className={s.filter_list}>{children}</ul>
    </div>
  );
};

const MobileFilters = ({ name, sort, orientation, setIsOpenMobileFilters }) => {
  const history = useHistory();

  const handleClose = () => {
    setIsOpenMobileFilters(false);
  };

  const handleClear = () => {
    history.push({
      pathname: `/photos/${name}/relevant`,
    });
    setIsOpenMobileFilters(false);
  };

  const handleClick = (url) => {
    history.push(url);
    setIsOpenMobileFilters(false);
  };

  return (
    <div className={s.modal_outer}>
      <div className={s.modal_inner}>
        <div className={s.modal_head}>
          <h2>Filters</h2>
          <button onClick={handleClose}>
            <MdOutlineClose />
          </button>
        </div>
        <div>
          <Filter title="Orientation">
            {orientationData.map((el, i) => {
              const selected = orientation === el.value;
              const url = `/photos/${name}/${sort}${
                el.value ? `/${el.value}` : ""
              }`;
              const orientationIcon = `orientation orientation__${el.value}`;

              return (
                <li key={i} className={s.filter_item}>
                  <button
                    className={clsx(s.filter_button, { selected: selected })}
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
                </li>
              );
            })}
          </Filter>
          <Filter title="Sort">
            {sortData.map((el, i) => {
              const selected = sort === el.value;
              const url = `/photos/${name}/${el.value}${
                orientation ? `/${orientation}` : ""
              }`;

              return (
                <li key={i} className={s.filter_item}>
                  <button
                    className={clsx(s.filter_button, { selected: selected })}
                    onClick={() => handleClick(url)}
                  >
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    {el.title}
                  </button>
                </li>
              );
            })}
          </Filter>
        </div>
        <div className={s.modal_footer}>
          <button
            disabled={!orientation && sort !== "latest"}
            className={s.clear_btn}
            onClick={handleClear}
          >
            Clear
          </button>
          <button className={s.close_btn} onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
