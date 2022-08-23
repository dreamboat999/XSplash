import React from "react";

import s from "./mobilFilters.module.scss";
import { MdCheck, MdOutlineClose } from "react-icons/md";
import RenderIf from "../../../utils/renderIf";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";

const Option = ({ orientationData, orientation }) => {
  return (
    <ul className={s.option_outer}>
      {orientationData.map((el, i) => {
        const selected = orientation === el.value;

        return (
          <li key={i} className={s.option_inner}>
            <Link
              to={el.url}
              className={clsx(s.option_link, { ["selected"]: selected })}
            >
              <RenderIf isTrue={selected}>
                <MdCheck />
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

  const orientationData = [
    {
      title: "Any Orientation",
      url: `/photos/${name}`,
    },
    {
      title: "Landscape",
      value: "landscape",
      url: `/photos/${name}/landscape`,
    },
    {
      title: "Portrait",
      value: "portrait",
      url: `/photos/${name}/portrait`,
    },
    {
      title: "Square",
      value: "squarish",
      url: `/photos/${name}/squarish`,
    },
  ];

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
              orientation={orientation}
              orientationData={orientationData}
            />
          </div>
          {/*<div className={s.item}>*/}
          {/*  <h3>Sort by {sortTitle.title}</h3>*/}
          {/*  <Option data={sortButtons} value={sort} setValue={setSort} />*/}
          {/*</div>*/}
        </div>
        <div className={s.footer}>
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
