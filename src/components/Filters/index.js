import React from "react";

import s from "./filters.module.scss";
import Dropdown from "../Dropdown";
import { setDropdown, setOrientation } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const buttons = [
  { title: "Landscape", value: "landscape" },
  { title: "Portrait", value: "portrait" },
  { title: "Square", value: "squarish" },
];

const Filters = () => {
  const dispatch = useDispatch();
  const { orientation } = useSelector((state) => state.appState);

  const handleClick = (value) => {
    dispatch(setOrientation(value));
    dispatch(setDropdown(false));
  };

  const orientationTitle = buttons.find((el) => orientation === el.value);

  return (
    <div className={s.filters}>
      <Dropdown
        title={orientation ? orientationTitle?.title : "Any orientation"}
      >
        <div className={s.items}>
          {buttons.map((el, i) => {
            return (
              <button
                key={i}
                onClick={() => handleClick(el.value)}
                className={orientation === el.value ? s.btn_color : ""}
              >
                {el.title}
              </button>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
};

export default Filters;
