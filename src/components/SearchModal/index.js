import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClearRecent } from "../../store/actions";
import { useHistory } from "react-router-dom";

import s from "./searchModal.module.scss";

const SearchModal = () => {
  const dispatch = useDispatch();
  const { recentArr, isSearchModal } = useSelector((state) => state.appState);
  const history = useHistory();

  const newArr = [...new Set(recentArr)];

  const displayModalVariable =
    isSearchModal && newArr.length ? `${s.displayModal}` : "";

  const handleClearRecent = () => {
    localStorage.removeItem("search");
    dispatch(setClearRecent());
  };

  const handleClick = (value) => {
    history.push({
      pathname: `/photos/${value}`,
    });
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
              <button
                type="button"
                key={i}
                className={s.recent_item}
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

export default SearchModal;
