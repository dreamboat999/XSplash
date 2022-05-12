import React from "react";

import s from "./searchModal.module.scss";
import { useDispatch, useSelector } from "react-redux";

const SearchModal = () => {
  const dispatch = useDispatch();
  const { recentArr, isModalSearchOpen } = useSelector(
    (state) => state.appState
  );

  const newArr = [...new Set(recentArr)];

  const displayModalVariable =
    isModalSearchOpen && newArr.length ? `${s.displayModal}` : "";

  const handleClearRecent = () => {
    localStorage.removeItem("search");
    dispatch({ type: "CLEAR_RECENT" });
  };

  return (
    <div className={`${s.modal} ${displayModalVariable}`}>
      <div className={s.modal_items}>
        <div className={s.modal_title}>
          <span>Recent Searches</span>
          <span>•</span>
          <button type="button" onClick={handleClearRecent}>
            Clear
          </button>
        </div>
        <div className={s.recent_items}>
          {newArr.slice(Math.max(newArr.length - 5, 0))?.map((el, i) => {
            return (
              <div key={i} className={s.recent_item}>
                {el}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
