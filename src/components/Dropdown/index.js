import React, { useRef, useState } from "react";

import s from "./dropdown.module.scss";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";

import RenderIf from "../../utils/renderIf";
import { useClickAway } from "../../hooks/useClickAway";

const Dropdown = ({ title, data, value, setValue, children, link }) => {
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

  const handleClick = (el) => {
    setValue(el);
    setIsOpen(false);
  };

  return (
    <div className={s.dropdown_outer} ref={dropdown}>
      <button className={s.dropdown_button} onClick={handleDropdown}>
        <div className={s.dropdown_title}>{title}</div>
        <MdKeyboardArrowDown />
      </button>
      <RenderIf isTrue={isOpen}>
        <div className={animation}>
          <div className={s.dropdown_inner}>
            <div className={s.content}>
              {link ? (
                children
              ) : (
                <>
                  {data?.map((el, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => handleClick(el.value)}
                        className={
                          value === el.value
                            ? `${s.content_button} ${s.selected}`
                            : s.content_button
                        }
                      >
                        <RenderIf isTrue={value === el.value}>
                          <MdCheck />
                        </RenderIf>
                        <div>{el.title}</div>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default Dropdown;
