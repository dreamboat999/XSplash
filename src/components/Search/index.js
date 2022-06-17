import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAddRecent, setSearchModal } from "../../store/actions";
import { useHistory } from "react-router-dom";

import s from "./search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import SearchModal from "../SearchModal";
import { useClickAway } from "../../hooks/useClickAway";

const Search = ({ changeStyles }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  const [value, setValue] = useState("");

  useClickAway(input, () => {
    dispatch(setSearchModal(false));
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      dispatch(setAddRecent(value));
      history.push(`/photos/${value}`);
      dispatch(setSearchModal(false));
    }
  };

  const handleOpenModal = () => {
    dispatch(setSearchModal(true));
  };

  return (
    <form
      className={`${s.search_wrapper} ${
        changeStyles ? s.changeStyles_search_wrapper : ""
      }`}
      onSubmit={handleSubmit}
      ref={input}
    >
      <div
        className={`${s.search} ${changeStyles ? s.changeStyles_search : ""}`}
      >
        <span>
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          onClick={handleOpenModal}
        />
      </div>
      <SearchModal />
    </form>
  );
};

export default Search;
