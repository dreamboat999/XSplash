import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { RANDOM_IMAGE } from "../../utils/Config";
import styles from "./header.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const {
  header_outer,
  header_inner,
  search_wrapper,
  search_logo,
  search,
  search_modal,
} = styles;

const Header = () => {
  const history = useHistory();
  const input = useRef(null);
  const [randomImage, setRandomImage] = useState("");
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

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

  const handleFocus = () => {
    input.current.focus();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      history.push(`/photos/${value}`);
    }
  };

  return (
    <div className={header_outer} style={backgroundImage}>
      <div className="container">
        <div className={header_inner}>
          <form className={search_wrapper} onSubmit={handleSubmit}>
            <div className={search_logo}>
              <AiOutlineSearch />
            </div>
            <div className={search}>
              <input
                type="text"
                placeholder="Search"
                ref={input}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={handleChange}
                required
              />
              {/*<div*/}
              {/*  className={search_modal}*/}
              {/*  style={{ display: focus ? "block" : "none" }}*/}
              {/*>*/}
              {/*  asd*/}
              {/*</div>*/}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
