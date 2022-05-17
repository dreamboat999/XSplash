import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import s from "./search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import SearchModal from "../SearchModal";
import { useClickAway } from "../../utils/useClickAway";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  const [value, setValue] = useState("");

  useClickAway(input, () => {
    dispatch({ type: "DISPLAY_MODAL_SEARCH", payload: false });
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      dispatch({ type: "ADD_RECENT", payload: value });
      history.push(`/photos/${value}`);
    }
  };

  const handleModalSearchOpen = () => {
    dispatch({ type: "DISPLAY_MODAL_SEARCH", payload: true });
  };

  return (
    <form className={s.search_wrapper} onSubmit={handleSubmit} ref={input}>
      <div className={s.search}>
        <span>
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          onClick={handleModalSearchOpen}
        />
      </div>
      <SearchModal />
    </form>
  );
};

export default Search;