import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAddRecent, setFormPanel } from "../../store/actions";
import { useHistory } from "react-router-dom";

import s from "./search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import SearchModal from "../FormPanel";
import { useClickAway } from "../../hooks/useClickAway";

const Form = ({ changeStyles }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  const [value, setValue] = useState("");

  useClickAway(input, () => {
    dispatch(setFormPanel(false));
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      dispatch(setAddRecent(value));
      history.push(`/photos/${value}`);
      dispatch(setFormPanel(false));
    }
  };

  const handleOpenModal = () => {
    dispatch(setFormPanel(true));
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

export default Form;
