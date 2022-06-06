import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAddRecent, setSearchModal } from "../../store/actions";
import { useHistory } from "react-router-dom";

import s from "./search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import SearchModal from "../SearchModal";
import { useClickAway } from "../../utils/useClickAway";

const Search = ({ addClass }) => {
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
    }
  };

  const handleOpenModal = () => {
    dispatch(setSearchModal(true));
  };

  return (
    <form className={s.search_wrapper} onSubmit={handleSubmit} ref={input}>
      <div className={`${s.search} ${addClass}`}>
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
