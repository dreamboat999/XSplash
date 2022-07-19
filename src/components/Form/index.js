import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import s from "./form.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import FormPanel from "../FormPanel";
import { useClickAway } from "../../hooks/useClickAway";
import { setAddRecent } from "../../store/actions";
import { useMatch } from "../../hooks/useMatch";
import RenderIf from "../../utils/renderIf";

const Form = ({ isSearchPage }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  const [value, setValue] = useState("");
  const [isOpenFormPanel, setIsOpenFormPanel] = useState(false);
  const match = useMatch();

  useClickAway(input, () => {
    setIsOpenFormPanel(false);
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      dispatch(setAddRecent(value));
      history.push(`/photos/${value}`);
      setIsOpenFormPanel(false);
    }
  };

  const handleOpenModal = () => {
    setIsOpenFormPanel(true);
  };

  return (
    <form
      className={`${s.form} ${isSearchPage ? s.isSearchPage_form : ""}`}
      onSubmit={handleSubmit}
      ref={input}
    >
      <div
        className={`${s.form_inner} ${
          isSearchPage ? s.isSearchPage_form_inner : ""
        }`}
      >
        <span className={s.form_icon}>
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          onClick={handleOpenModal}
          className={s.form_input}
        />
      </div>
      <RenderIf isTrue={match}>
        <FormPanel
          isOpenFormPanel={isOpenFormPanel}
          setIsOpenFormPanel={setIsOpenFormPanel}
        />
      </RenderIf>
    </form>
  );
};

export default Form;
