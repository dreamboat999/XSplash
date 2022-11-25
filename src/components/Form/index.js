import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import s from "./form.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

import { useAppContext } from "../../context";
import useClickAway from "../../hooks/useClickAway";
import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/RenderIf";

const Form = ({ isNavbarForm }) => {
  const { recent, setRecent } = useAppContext();
  const history = useNavigate();
  const input = useRef(null);
  const [value, setValue] = useState("");
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const match = useMatch();

  const newArr = [...new Set(recent)];
  const fiveElementArray = newArr.slice(Math.max(newArr.length - 5, 0));

  useClickAway(input, () => {
    setIsOpenPanel(false);
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      setRecent([...recent, value]);
      history(`/photos/${value}/relevant`);
      setIsOpenPanel(false);
    }
  };

  const handleOpenPanel = () => {
    setIsOpenPanel(true);
  };

  const handleClear = () => {
    localStorage.removeItem("recent");
    setRecent([]);
  };

  const handleClick = (value) => {
    history({
      pathname: `/photos/${value}/relevant`,
    });
    setIsOpenPanel(false);
  };

  return (
    <form
      className={clsx(s.form, {
        [s.isNavbar_form]: isNavbarForm,
      })}
      onSubmit={handleSubmit}
      ref={input}
    >
      <div
        className={clsx(s.form_inner, {
          [s.isNavbar_form_inner]: isNavbarForm,
        })}
      >
        <span className={s.form_icon}>
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          placeholder="Search photos"
          onChange={handleChange}
          onClick={handleOpenPanel}
          className={s.form_input}
        />
      </div>
      <RenderIf isTrue={match}>
        <div
          className={clsx(s.panel, {
            [s.show_panel]: isOpenPanel && newArr.length,
          })}
        >
          <div className={s.panel_items}>
            <div className={s.panel_title}>
              <span>Recent Searches</span>
              <span>•</span>
              <button type="button" onClick={handleClear}>
                Clear
              </button>
            </div>
            <div className={s.recent}>
              {fiveElementArray?.map((el, i) => {
                return (
                  <button
                    type="button"
                    key={i}
                    className={s.recent_button}
                    onClick={() => {
                      handleClick(el);
                    }}
                  >
                    {el}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </RenderIf>
    </form>
  );
};

export default Form;
