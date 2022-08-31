import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClearRecent } from "../../../redux/actions";

import s from "./panel.module.scss";
import clsx from "clsx";

const Panel = ({ isOpenFormPanel, setIsOpenFormPanel }) => {
  const dispatch = useDispatch();
  const { recentArr } = useSelector((state) => state.appState);
  const history = useHistory();

  const newArr = [...new Set(recentArr)];
  const fiveElementArray = newArr.slice(Math.max(newArr.length - 5, 0));

  const handleClearRecent = () => {
    localStorage.removeItem("recent");
    dispatch(setClearRecent());
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
