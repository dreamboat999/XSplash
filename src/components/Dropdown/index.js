import React, { useRef, useState } from "react";

import s from "./dropdown.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";

import RenderIf from "../../utils/renderIf";
import { useClickAway } from "../../hooks/useClickAway";

const Dropdown = ({ title, children }) => {
  const dropdown = useRef(null);
  const [isDropdown, setIsDropdown] = useState(false);

  useClickAway(dropdown, () => {
    setIsDropdown(false);
  });

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className={s.dropdown_wrapper} ref={dropdown}>
      <button className={s.btn_dropdown} onClick={handleDropdown}>
        <div className={s.title_dropdown}>{title}</div>
        <MdKeyboardArrowDown />
      </button>
      <div className={isDropdown ? s.active : ""}>
        <RenderIf isTrue={isDropdown}>
          <div className={s.dropdown}>{children}</div>
        </RenderIf>
      </div>
    </div>
  );
};

export default Dropdown;
