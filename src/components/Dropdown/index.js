import React, { cloneElement, useRef, useState } from "react";

import s from "./dropdown.module.scss";
import { MdOutlineArrowDropDown } from "react-icons/md";

import useClickAway from "../../hooks/useClickAway";
import RenderIf from "../../utils/renderIf";

const Dropdown = ({ title, children }) => {
  const dropdown = useRef(null);
  const [animation, setAnimation] = useState(s.hide);
  const [isOpen, setIsOpen] = useState(false);

  useClickAway(dropdown, () => {
    setAnimation(s.hide);

    setTimeout(() => {
      setIsOpen(false);
    }, 90);
  });

  const handleDropdown = async () => {
    setAnimation(isOpen ? s.hide : s.show);
    await new Promise((resp) => setTimeout(resp, 90));
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.dropdown_outer} ref={dropdown}>
      <button className={s.dropdown_button} onClick={handleDropdown}>
        <div className={s.dropdown_title}>{title}</div>
        <MdOutlineArrowDropDown />
      </button>
      <RenderIf isTrue={isOpen}>
        <div className={animation}>
          <div className={s.dropdown_inner}>
            <div className={s.content}>
              {children.map((el, i) => {
                return (
                  <React.Fragment key={i}>
                    {cloneElement(el, {
                      onClick: async () => {
                        el.props.onClick();
                        await handleDropdown();
                      },
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default Dropdown;
