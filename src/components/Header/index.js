import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { RANDOM_IMAGE } from "../../utils/Config";
import { useClickAway } from "../../utils/useClickAway";
import SearchModal from "../SearchModal";

import styles from "./header.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const { header_outer, header_inner, search_wrapper, search } = styles;

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  const [randomImage, setRandomImage] = useState("");
  const [value, setValue] = useState("");
  useClickAway(input);

  useEffect(() => {
    axios
      .get(`${RANDOM_IMAGE}&orientation=landscape&count=1`)
      .then((response) => {
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
    <div className={header_outer} style={backgroundImage}>
      <div className="container">
        <div className={header_inner}>
          <form className={search_wrapper} onSubmit={handleSubmit} ref={input}>
            <div className={search}>
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
