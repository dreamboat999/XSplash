import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import s from "./form.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

import Panel from "./Panel";

import { useAppContext } from "../../context";
import useClickAway from "../../hooks/useClickAway";
import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/renderIf";

const Form = ({ isNavbarForm }) => {
  const { recent, setRecent } = useAppContext();
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
      setRecent([...recent, value]);
      history.push(`/photos/${value}/relevant`);
      setIsOpenFormPanel(false);
    }
  };

  const handleOpenModal = () => {
    setIsOpenFormPanel(true);
  };

  return (
    <form
      className={clsx(s.form, {
        [s.isNavbar_form]: isNavbarForm,
      })}
      onSubmit={handleSubmit}
      ref={input}
    >
      <div
        className={clsx(s.form_inner, {
          [s.isNavbar_form_inner]: isNavbarForm,
        })}
      >
        <span className={s.form_icon}>
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          placeholder="Search photos"
          onChange={handleChange}
          onClick={handleOpenModal}
          className={s.form_input}
        />
      </div>
      <RenderIf isTrue={match}>
        <Panel
          isOpenFormPanel={isOpenFormPanel}
          setIsOpenFormPanel={setIsOpenFormPanel}
        />
      </RenderIf>
    </form>
  );
};

export default Form;
