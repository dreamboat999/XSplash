import React from "react";
import { Link, useHistory } from "react-router-dom";

import s from "./mobile.module.scss";
import { MdCheck, MdOutlineClose } from "react-icons/md";
import { orientationData, sortData } from "../FiltersData";

import RenderIf from "../../../utils/renderIf";
import clsx from "clsx";

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
                  <Link
                    to={url}
                    className={clsx(s.filter_link, { selected: selected })}
                  >
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    <RenderIf isTrue={el.value}>
                      <div className={orientationIcon} />
                    </RenderIf>
                    {el.title}
                  </Link>
                </li>
              );
            })}
          </Filter>
          <Filter title="Sort">
            {sortData.map((el, i) => {
              const selected = sort === el.value;
              const url = `/photos/${name}/${el.value}`;

              return (
                <li key={i} className={s.filter_item}>
                  <Link
                    key={i}
                    to={url}
                    className={clsx(s.filter_link, { selected: selected })}
                  >
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    {el.title}
                  </Link>
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
