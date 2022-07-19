import React from "react";

import s from "./mobilFilters.module.scss";
import { MdCheck, MdOutlineClose } from "react-icons/md";
import { orientationButtons, sortButtons } from "../index";
import RenderIf from "../../../utils/renderIf";

const Option = ({ data, value, setValue }) => {
  const handleClick = (el) => {
    setValue(el);
  };

  return (
    <div className={s.option_outer}>
      {data?.map((el, i) => {
        return (
          <div key={i} className={s.option_inner}>
            <button
              onClick={() => handleClick(el.value)}
              className={
                value === el.value
                  ? `${s.option_btn} ${s.selected}`
                  : s.option_btn
              }
            >
              <RenderIf isTrue={value === el.value}>
                <div className={s.option_icon}>
                  <MdCheck />
                </div>
              </RenderIf>
              <div>{el.title}</div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

const MobileFilters = ({
  orientation,
  setOrientation,
  sort,
  setSort,
  setIsOpenMobileFilters,
}) => {
  const sortTitle = sortButtons.find((el) => sort === el.value);

  const handleClose = () => {
    setIsOpenMobileFilters(false);
  };

  const handleClear = () => {
    setOrientation("");
    setSort("relevant");
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
              data={orientationButtons}
              value={orientation}
              setValue={setOrientation}
            />
          </div>
          <div className={s.item}>
            <h3>Sort by {sortTitle.title}</h3>
            <Option data={sortButtons} value={sort} setValue={setSort} />
          </div>
        </div>
        <div className={s.footer}>
          <button
            disabled={!orientation && sort === "relevant"}
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
