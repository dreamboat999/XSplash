import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import API, { SECRET_KEY } from "../api";
import { useClickAway } from "../../utils/useClickAway";
import SearchModal from "../SearchModal";

import s from "./header.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  const [randomImage, setRandomImage] = useState("");
  const [value, setValue] = useState("");
  useClickAway(input, () => {
    dispatch({ type: "DISPLAY_MODAL_SEARCH", payload: false });
  });

  useEffect(() => {
    API.get(
      `photos/random?client_id=${SECRET_KEY}&orientation=landscape&count=1`
    ).then((response) => {
      setRandomImage(response.data[0].urls.regular);
    });
  }, []);

  const backgroundImage = {
    background: `#1d1d1f url(${randomImage}) no-repeat center center/cover`,
  };

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
    <div className={s.header_outer} style={backgroundImage}>
      <div className="container">
        <div className={s.header_inner}>
          <form
            className={s.search_wrapper}
            onSubmit={handleSubmit}
            ref={input}
          >
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
        </div>
      </div>
    </div>
  );
};

export default Header;
