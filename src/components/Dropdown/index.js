import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./dropdown.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";

import RenderIf from "../../utils/renderIf";
import { useClickAway } from "../../hooks/useClickAway";
import { setDropdown } from "../../store/actions";

const Dropdown = ({ title, children }) => {
  const dispatch = useDispatch();
  const { isDropdown } = useSelector((state) => state.appState);
  const dropdown = useRef(null);
  const [animation, setAnimation] = useState(s.hide);

  useClickAway(dropdown, () => {
    setAnimation(s.hide);

    setTimeout(() => {
      dispatch(setDropdown(false));
    }, 90);
  });

  const handleDropdown = async (ms) => {
    setAnimation(isDropdown ? s.hide : s.show);

    await new Promise((r) => setTimeout(r, ms));

    dispatch(setDropdown(!isDropdown));
  };

  return (
    <div className={s.dropdown_wrapper} ref={dropdown}>
      <button className={s.btn_dropdown} onClick={() => handleDropdown(90)}>
        <div className={s.title_dropdown}>{title}</div>
        <MdKeyboardArrowDown />
      </button>
      <RenderIf isTrue={isDropdown}>
        <div className={animation}>
          <div className={s.dropdown}>{children}</div>
        </div>
      </RenderIf>
    </div>
  );
};

export default Dropdown;
