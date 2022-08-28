import React from "react";
import { Link, useHistory } from "react-router-dom";

import s from "./mobile.module.scss";
import { MdCheck, MdOutlineClose } from "react-icons/md";

import RenderIf from "../../../utils/renderIf";
import clsx from "clsx";

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

const Option = ({ name, orientationData, orientation }) => {
  return (
    <ul className={s.option_outer}>
      {orientationData.map((el, i) => {
        const selected = orientation === el.value;
        const url = `/photos/${name}${el.value ? `/${el.value}` : ""}`;
        const orientationIcon = `orientation orientation__${el.value}`;

        return (
          <li key={i} className={s.option_inner}>
            <Link
              to={url}
              className={clsx(s.option_link, { selected: selected })}
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
    </ul>
  );
};

const MobileFilters = ({ name, orientation, setIsOpenMobileFilters }) => {
  const history = useHistory();

  const handleClose = () => {
    setIsOpenMobileFilters(false);
  };

  const handleClear = () => {
    history.push({
      pathname: `/photos/${name}`,
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
          <div className={s.item}>
            <h3>Orientation</h3>
            <Option
              name={name}
              orientation={orientation}
              orientationData={orientationData}
            />
          </div>
        </div>
        <div className={s.modal_footer}>
          <button
            disabled={!orientation}
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
