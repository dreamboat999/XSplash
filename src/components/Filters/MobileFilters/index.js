import React, { useRef } from "react";

import s from "./mobilFilters.module.scss";
import { MdCheck, MdOutlineClose } from "react-icons/md";
import { orientationButtons, sortButtons } from "../index";
import RenderIf from "../../../utils/renderIf";
import { useClickAway } from "../../../hooks/useClickAway";

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
  orientationValue,
  setOrientationValue,
  sortValue,
  setSortValue,
  setOpenModal,
}) => {
  const filters = useRef();
  useClickAway(filters, () => {
    setOpenModal(false);
  });

  const sortTitle = sortButtons.find((el) => sortValue === el.value);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClear = () => {
    setOrientationValue("");
    setSortValue("relevant");
    setOpenModal(false);
  };

  return (
    <div className={s.modal_outer}>
      <div className={s.modal_inner} ref={filters}>
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
              value={orientationValue}
              setValue={setOrientationValue}
            />
          </div>
          <div className={s.item}>
            <h3>Sort by {sortTitle.title}</h3>
            <Option
              data={sortButtons}
              value={sortValue}
              setValue={setSortValue}
            />
          </div>
        </div>
        <div className={s.footer}>
          <button
            disabled={!orientationValue && sortValue === "relevant"}
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
