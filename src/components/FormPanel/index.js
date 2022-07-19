import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClearRecent, setValue } from "../../store/actions";
import { useHistory } from "react-router-dom";

import s from "./formPanel.module.scss";

const FormPanel = ({ isOpenFormPanel, setIsOpenFormPanel }) => {
  const dispatch = useDispatch();
  const { recentArr } = useSelector((state) => state.appState);
  const history = useHistory();

  const newArr = [...new Set(recentArr)];
  const showPanel = isOpenFormPanel && newArr.length ? `${s.show_panel}` : "";

  const handleClearRecent = () => {
    localStorage.removeItem("recent");
    dispatch(setClearRecent());
  };

  const handleClick = (value) => {
    history.push({
      pathname: `/photos/${value}`,
    });
    dispatch(setValue(value));
    setIsOpenFormPanel(false);
  };

  return (
    <div className={`${s.panel} ${showPanel}`}>
      <div className={s.panel_items}>
        <div className={s.panel_title}>
          <span>Recent Searches</span>
          <span>•</span>
          <button type="button" onClick={handleClearRecent}>
            Clear
          </button>
        </div>
        <div className={s.recent}>
          {newArr.slice(Math.max(newArr.length - 5, 0))?.map((el, i) => {
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

export default FormPanel;
