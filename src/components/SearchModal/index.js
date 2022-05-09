import React from "react";

import styles from "./searchModal.module.scss";
import { useDispatch, useSelector } from "react-redux";

const {
  modal,
  modal_items,
  modal_title,
  recent_items,
  recent_item,
  displayModal,
} = styles;

const SearchModal = () => {
  const dispatch = useDispatch();
  const { recentArr, isModalSearchOpen } = useSelector(
    (state) => state.appState
  );

  const displayModalVariable =
    isModalSearchOpen && recentArr.length ? `${displayModal}` : "";

  const handleClearRecent = () => {
    localStorage.removeItem("search");
    dispatch({ type: "CLEAR_RECENT" });
  };

  return (
    <div className={`${modal} ${displayModalVariable}`}>
      <div className={modal_items}>
        <div className={modal_title}>
          <span>Recent Searches</span>
          <span>•</span>
          <button type="button" onClick={handleClearRecent}>
            Clear
          </button>
        </div>
        <div className={recent_items}>
          {recentArr.slice(Math.max(recentArr.length - 5, 0))?.map((el, i) => {
            return (
              <div key={i} className={recent_item}>
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
