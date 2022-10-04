import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import s from "./panel.module.scss";
import { useAppContext } from "../../../context";

const Panel = ({ isOpenFormPanel, setIsOpenFormPanel }) => {
  const { recent, setRecent } = useAppContext();
  const history = useHistory();

  const newArr = [...new Set(recent)];
  const fiveElementArray = newArr.slice(Math.max(newArr.length - 5, 0));

  const handleClearRecent = () => {
    localStorage.removeItem("recent");
    setRecent([]);
  };

  const handleClick = (value) => {
    history.push({
      pathname: `/photos/${value}/relevant`,
    });
    setIsOpenFormPanel(false);
  };

  return (
    <div
      className={clsx(s.panel, {
        [s.show_panel]: isOpenFormPanel && newArr.length,
      })}
    >
      <div className={s.panel_items}>
        <div className={s.panel_title}>
          <span>Recent Searches</span>
          <span>•</span>
          <button type="button" onClick={handleClearRecent}>
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
  );
};

export default Panel;
